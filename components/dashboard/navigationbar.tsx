"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TakealotLogo from "@/public/logo/takealot.svg";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "../ui/theme-switcher";


const navigationLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Products",
    href: "/dashboard/products",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    name: "Billboards",
    href: "/dashboard/billboards",
  },
  {
    name: "Categories",
    href: "/dashboard/Categories",
  },
];
const Navigationbar = () => {
  const pathname = usePathname();
  return (
    <header>
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6"
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
        {/* Sheet component */}
        <div className="flex lg:hidden ">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <MenuIcon aria-hidden="true" className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={"right"}>
              <nav className="grid gap-6 text-lg mt-5">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-md font-semibold leading-6 "
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-5">
                <ThemeSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* navigationbar contents */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                link.href === pathname
                  ? "text-foreground text-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}

          <LogoutLink>Logout</LogoutLink>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Navigationbar;
