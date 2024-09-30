"use client";

import React, { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import Bluecloud from "@/public/assets/blue-cloud.png";
import Gadgets from "@/public/assets/gadgets-stack.png";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useTransform,

} from "framer-motion";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const translateYTwo = useTransform(scrollYProgress, [0, 1], [150, -200]);


  return (
    <Container id="hero" className="pt-8 pb-20md:pb-10">
      <div

      // container div
      >
        <div className="md:flex items-center">
          {/* Text section */}
          <div className="md:[478px]">
            <div className="text-sm inline-flex  px-3 py-1 rounded-lg text-gray-600 ">
              Takealot 2.0
            </div>
            <Heading
              size={"lg"}
              tracking={"tighter"}
              fontWeight={"bold"}
              className="mt-6"
            >
              Next Takalot <br />
              Redesign
            </Heading>
            <p className="text-xl tracking-tighter mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
              quam.
            </p>

            <div className="flex gap-1 items-center mt-[30px] md:hidden">
              <Button asChild size={"sm"}>
                <LoginLink>Sign in</LoginLink>
              </Button>
              <span className="h-6 w-px"></span>
              <Button asChild size={"sm"}>
                <RegisterLink>Register</RegisterLink>
              </Button>
            </div>

            <div className="hidden md:flex gap-1 items-center mt-[30px]">
              <Button>Get Started</Button>
              <Button variant={"ghost"}>Learn More</Button>
            </div>
          </div>
          {/* Image section */}
          {/* <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={Bluecloud.src}
              alt="Blue cloud"
              width={600}
              height={600}
              quality={100}
              className="hidden md:flex md:absolute h-full md:w-auto md:max-w-none md:-left-10"
              style={{
                translateY: translateY,
              }}
            />
            <motion.img
              src={Gadgets.src}
              alt="Blue cloud"
              width={600}
              height={600}
              quality={100}
              className="md:absolute md:max-w-none top-[200px]"
              style={{
                translateYTwo: translateYTwo,
              }}
            />
          </div> */}<div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
  <motion.img
    src={Bluecloud.src}
    alt="Blue cloud"
    width={600}
    height={600}
    quality={100}
    className="hidden md:flex md:absolute h-full md:w-auto md:max-w-none md:right-0"
    style={{
      translateY: translateY,
    }}
  />
  <motion.img
    src={Gadgets.src}
    alt="Blue cloud"
    width={600}
    height={600}
    quality={100}
    className="md:absolute md:max-w-none top-[200px] md:right-0"
    style={{
      translateYTwo: translateYTwo,
    }}
  />
</div>

        </div>
      </div>
    </Container>
  );
};

export default Hero;
