import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "./rating";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface productCardProps {
  item: {
    id: string;
    name: string;
    description: string;

    price: number;
    images: string[];
    rating: number;
  };
}

export default function ProductCard({ item }: productCardProps) {
  return (


    <div
  className="max-w-xs bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 shadow-sm"
  id="shop"
>
  <div className="h-[200px] w-full flex items-center justify-center p-1.5">
    <Link href={`/product/${item.id}`}>
      <Image
        src={item.images[0]}
        width={200}
        height={300}
        quality={100}
        priority
        alt={"product image"}
        className="object-cover" // Ensure the image scales to fit within its container
      />
    </Link>
  </div>

  <div className="flex flex-col items-center justify-center p-4">
    <p className="text-base mb-2">{item.name}</p> 
    <p className="mb-2 font-[family-name:var(--font-telegrafBold)]">R {item.price}</p>
    <div className="mb-2">
      <StarRating rating={item.rating} />
    </div>
    <Button className="w-full mt-3" asChild>
      <Link href={`/product/${item.id}`}>View</Link>
    </Button>
  </div>
</div>

  );
}


export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}