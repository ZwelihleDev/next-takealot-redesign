import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import prisma from "@/lib/db";
import Image from "next/image";
import React from "react";

async function getData() {
  const data = await prisma.billboard.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function Billboard() {
  const data = await getData();
  return (
    <Container>
     <Carousel>
      <CarouselContent>
        {data.map((Item) => (
          <CarouselItem key={Item.id}>
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                src={Item.imageString}
                alt="billboard image"
                quality={100}
                fill
                className="object-cover w-full h-full rounded-xl"
              />

              <div className="absolute top-6 left-6 bg-opacity-75 bg-black text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
                <Heading size={"sm"} fontWeight={"bold"}>
                  {Item.title}
                </Heading>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16"/>
      <CarouselNext className="mr-16"/>
    </Carousel>
 </Container>
  )
}
