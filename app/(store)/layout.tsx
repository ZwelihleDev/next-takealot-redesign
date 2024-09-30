import React from "react";
import localFont from "next/font/local";
import "../globals.css";
import { Container } from "@/components/ui/container";
import Navigationbar from "@/components/store/navigationbar";
import Footer from "@/components/footer";

const telegraph = localFont({
  src: "../fonts/Telegraf.otf",
  variable: "--font-telegraf",
  weight: "100 900",
});
const telegrafLight = localFont({
  src: "../fonts/TelegrafLight.otf",
  variable: "--font-telegrafLight",
  weight: "100 900",
});
export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main
        className={`${telegraph.variable} ${telegrafLight.variable} antialiased`}
      >
        <Container
          size={"twoxl"}
          className="font-[family-name:var(--font-telegraf)]"
        >
          <Navigationbar />

          {children}
          <Footer/>
        </Container>
      </main>
    </>
  );
}
