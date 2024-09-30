// pages/about.js
import React from "react";
import { Container } from "./ui/container";
import { Heading } from "./ui/heading";

export default function Disclaimer() {
  return (
    <Container id="disclaimer">

        <div className="">
        <Heading
              size={"md"}
              tracking={"tighter"}
              fontWeight={"bold"}
              className="mt-6"
            >
             Disclaimer
            </Heading>
          <p className="text-lg  mb-4">
            Welcome to my project! This is a redesign of the popular ecommerce
            store,
            <strong> Takealot</strong>. The goal of this project is to practice
            and showcase modern web design principles and frontend development
            techniques using tools like Next.js and Tailwind CSS.
          </p>
          <p className="text-lg  mb-4">
            Please note that this is{" "}
            <strong> not an official Takealot website</strong>. This project is
            for educational and demonstration purposes only and is{" "}
            <strong> not intended to infringe upon any copyrights</strong> or to
            represent Takealot in any way.
          </p>
          <p className="text-lg  mb-4">
            We respect the intellectual property rights of Takealot and all its
            affiliated entities. If there are any concerns regarding this
            project, please feel free to reach out, and i will address them
            promptly.
          </p>
          <p className="text-lg  mb-4">
            Thank you for visiting! i hope this design inspires your own
            creativity and love for web development.
          </p>
          <div className="text-center mt-8">
            <a
              href="https://www.takealot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visit Takealot's official site
            </a>
          </div>
        </div>

    </Container>
  );
}
