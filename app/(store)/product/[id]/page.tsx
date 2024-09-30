import ImageSlider from "@/components/image-slider";
import Products from "@/components/products";
import StarRating from "@/components/rating";
import { Separator } from "@/components/ui/separator";
import { ShoppingBagButton } from "@/components/ui/submit-button";
import { addItem } from "@/lib/actions";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
async function getProductData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      brand: true,
      rating: true,
      name: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function ProductIdPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  noStore();
  const data = await getProductData(params.id);
  const addProducttoShoppingCart = addItem.bind(null, data.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />

        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            {data.name}
          </h1>
          <p className="mb-3">Brand: {data.brand}</p>
          <p className="text-xl font-[family-name:var(--font-telegrafBold)] mb-3">
            R {data.price}
          </p>

          <div className="mt-3 flex items-center">
            <StarRating rating={data.rating} />
          </div>
          <Separator className="my-6" />
          <p className="mt-6">{data.description}</p>
          <Separator className="my-6" />

          {/* <Button size={"lg"}>
            <ShoppingBagIcon className="mr-4 w-4 h-4" />
            Add to cart
          </Button> */}
          <form action={addProducttoShoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      <div className="mt-16">
        <Products />
      </div>
    </>
  );
}
