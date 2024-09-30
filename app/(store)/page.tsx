
import Billboard from "@/components/billboard";
import Category from "@/components/category";
import Disclaimer from "@/components/discliamer";
import Hero from "@/components/hero";
import Products from "@/components/products";
import React from "react";

export default function HomePage() {
  return (
    <div className="font-[family-name:var(--font-telegraf)]">
      <main className="space-y-40 mb-40">
        <Hero />
        <Billboard/>
        <Category/>
        <Products/>
        <Disclaimer/>

      </main>
    </div>
  );
}
