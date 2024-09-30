"use server";

// create new product
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { billboardSchema, productSchema } from "./zodSchemas";
import prisma from "./db";
import { redis } from "./redis";
import { Cart } from "./interface";
import { revalidatePath } from "next/cache";

export async function createProduct(prevState: unknown, formData: FormData) {
  // first check the user

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "zwelihle408@gmail.com") {
    redirect("/");
  }

  // server validation with conform
  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
// chnage image array output
  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  // create new product in db
  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      brand: submission.value.brand,
      category: submission.value.category,
      rating: submission.value.rating,
      images: flattenUrls,
      isFeatured: submission.value.isFeatured,
      status: submission.value.status,
    },
  });

  // redirect user once product is created

  redirect("/dashboard/products");
}


// edit prodUCT
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "zwelihle408@gmail.com") {
    redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      rating: submission.value.rating,
      price: submission.value.price,
      brand: submission.value.brand,
      isFeatured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");

  
}

// delete product
export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "zwelihle408@gmail.com") {
    redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

// create billboard
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBillboard(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "zwelihle408@gmail.com") {
    redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: billboardSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.billboard.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/billboards");
}


// delete billboard
export async function deleteBillboard(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "zwelihle408@gmail.com") {
    redirect("/");
  }

  await prisma.billboard.delete({
    where: {
      id: formData.get("billboardId") as string,
    },
  });

  redirect("/dashboard/billboards");
}

// add to cart
export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  // eslint-disable-next-line prefer-const
  let cart: Cart | null = await redis.get(`cart-${user.id}`);


  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product with this id");
  }
  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }

      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

   revalidatePath("/", "layout");
}


// DELETE item in cart
export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");

  // eslint-disable-next-line prefer-const
  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/bag");
}