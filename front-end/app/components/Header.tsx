import Image from "next/image";
import React from "react";

const Header = () => {
  const text = "Cậu Chủ Shop";
  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <a className="flex items-center space-x-6">
          <Image
            src="/image/logo3-cropped.png"
            alt="logo"
            width={80}
            height={80}
            className="object-cover rounded"
          />
          <div className="p-4 text-2xl text-black">
            {text.split("").map((char, index) => (
              <span
                key={index}
                className="slide-in-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </a>

        <div className="hidden w-full md:block md:w-auto ml-8">
          <ul className="font-medium flex  p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 md:mt-0">
            <li>
              <a className="block py-2 px-3 rounded">Home</a>
            </li>
            <li>
              <a href="/about" className="block py-2 px-3 rounded">
                About
              </a>
            </li>
            <li>
              <a className="block py-2 px-3 rounded">Pricing</a>
            </li>
            <li>
              <a href="/login" className="block py-2 px-3 rounded">
                Login
              </a>
            </li>
            <li>
              <a href="/signup" className="block py-2 px-3 rounded">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
