

import Navigationbar from "@/components/dashboard/navigationbar";
import { Container } from "@/components/ui/container";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // check if the user is authenticated
  if (!user || user.email !== "zwelihle408@gmail.com") {
    return redirect("/");
  }
  return (
    <Container
      size={"twoxl"}
      className="flex flex-col font-[family-name:var(--font-telegraf)]"
    >
      <Navigationbar />
      <main className="my-5 ">{children}</main>
    </Container>
  );
}