import React from "react";
import { Heading } from "@/components/ui/heading";
import prisma from "@/lib/db";
import ProductCard from "./product-card";

async function getProducts() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      rating: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function Products() {
  const data = await getProducts();
  return (
    <div id="products">
 
      <Heading size={"md"} tracking={"tighter"} fontWeight={"bold"}>
         Products
      </Heading>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
