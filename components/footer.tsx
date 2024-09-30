import React from 'react'
import TakealotLogo from "@/public/logo/takealot.svg";
import Image from 'next/image';
export default function Footer() {
  return (
  

<footer className=" m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://www.takealot.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <Image src={TakealotLogo} alt="Takealot Logo" width={50} height={50} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Next Takealot</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Home</a>
                </li>
                <li>
                    <a href="#disclaimer" className="hover:underline me-4 md:me-6">Disclaimer</a>
                </li>
                <li>
                    <a href="#products" className="hover:underline me-4 md:me-6">Products</a>
                </li>
  
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://www.takealot.com/" className="hover:underline">Takealot™</a>. All Rights Reserved.</span>
    </div>
</footer>


  )
}
