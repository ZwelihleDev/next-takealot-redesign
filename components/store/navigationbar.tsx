import Link from "next/link";
import React from "react";
import TakealotLogo from "@/public/logo/takealot.svg";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/interface";
import { navigationbarLinks } from "@/lib";
import UserDropdown from "./user-dropdown";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode";

export default async function Navigationbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <header>
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 "
      >
        {/* logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt="takealot logo"
              src={TakealotLogo}
              width={160}
              height={160}
            />
          </Link>
        </div>
        {/* navigationbar contents */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigationbarLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-xl">
              {link.name}
            </Link>
          ))}

         
        </div>
        <div className="flex items-center">
          {/* check if theres a valid ession */}

          {user ? (
            <>
              <Link
                href={"/bag"}
                className="group p-2 flex items-center mr-4 ml-4"
              >
                {/* <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm ">  {total}</span> */}
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    fill="none"
                  >
                    <path
                      d="M3.06164 15.1933L3.42688 13.1219C3.85856 10.6736 4.0744 9.44952 4.92914 8.72476C5.78389 8 7.01171 8 9.46734 8H14.5327C16.9883 8 18.2161 8 19.0709 8.72476C19.9256 9.44952 20.1414 10.6736 20.5731 13.1219L20.9384 15.1933C21.5357 18.5811 21.8344 20.275 20.9147 21.3875C19.995 22.5 18.2959 22.5 14.8979 22.5H9.1021C5.70406 22.5 4.00504 22.5 3.08533 21.3875C2.16562 20.275 2.4643 18.5811 3.06164 15.1933Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7.5 8L7.66782 5.98618C7.85558 3.73306 9.73907 2 12 2C14.2609 2 16.1444 3.73306 16.3322 5.98618L16.5 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 11C14.87 12.4131 13.5657 13.5 12 13.5C10.4343 13.5 9.13002 12.4131 9 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span className="bg-rose-600 rounded-full absolute top-0 right-0 w-[20px] h-[20px] grid justify-center  items-center translate-x-1 -translate-y-1 text-white text-sm">
                    {total}
                  </span>
                </div>
              </Link>

              <UserDropdown
                email={user.email as string}
                name={user.given_name as string}
                userImage={
                  user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                }
              />
            </>
          ) : (
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2 ml-10">
              <Button asChild size={"sm"}>
                <LoginLink>Sign in</LoginLink>
              </Button>
              <span className="h-6 w-px"></span>
              <Button asChild size={"sm"}>
                <RegisterLink>Register</RegisterLink>
              </Button>
            </div>
          )}
        </div>
      <div className="ml-5">
      <ModeToggle/>
      </div>
      </nav>
    </header>
  );
}
