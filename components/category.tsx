import React from "react";
import Image from "next/image";
import Link from "next/link";
import GamingBillboard from "@/public/billboards/gaming.png";
import CellPhones from "@/public/billboards/apple products.png";
import AsusProducts from "@/public/billboards/asus-rog-billboard.png";
import { Heading } from "./ui/heading";

const Category = () => {
  return <div className="py-24 sm:py-32">
  <div className="flex justify-between items-center">
    <Heading
      size={"md"}
      tracking={"tighter"}
      fontWeight={"bold"}
      
    >
      Shop by category
    </Heading>
    <Link href={"/products/all"}>Browse all products &rarr;</Link>
  </div>

  <div
    className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6
  lg:gap-8"
  >
    <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-xl sm:aspect-w-1 sm:row-span-2">
      <Image
        src={GamingBillboard}
        alt="billboard image"
        className="object-cover object-center"
      />

      <div className="bg-gradient-to-b from-transparent to-black opacity-50" />

      <div className="p-6 flex items-end">
        <Link href={"/products/all"}>
          <h3 className="font-medium text-white">All products</h3>
          <p>Shop now</p>
        </Link>
      </div>
    </div>

    <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-xl sm:relative sm:aspect-none sm:h-full">
      <Image
        src={CellPhones}
        alt="billboard image"
        className="object-center object-cover  sm:absolute sm:inset-0 sm:w-full sm:h-full"
      />

      <div className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0" />

      <div className="p-6 flex items-end sm:absolute sm:inset-0">
        <Link href={"/products/all"}>
          <h3 className="font-medium text-white">All products</h3>
          <p>Shop now</p>
        </Link>
      </div>
    </div>

    <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-xl sm:relative sm:aspect-none sm:h-full">
      <Image
        src={AsusProducts}
        alt="billboard image"
        className="object-center object-cover  sm:absolute sm:inset-0 sm:w-full sm:h-full"
      />

      <div className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0" />

      <div className="p-6 flex items-end sm:absolute sm:inset-0">
        <Link href={"/products/all"}>
          <h3 className="font-medium text-white">All products</h3>
          <p>Shop now</p>
        </Link>
      </div>
    </div>
  </div>
</div>
};

export default Category;
