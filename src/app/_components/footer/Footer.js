"use client";
import React from "react";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
const CONTACTS = [
  {
    icon: Mail,
    href: "",
  },
  {
    icon: Phone,
    href: "",
  },
];
function Footer() {
  return (
    <div className="w-full bg-primary md:p-10 p-5 text-white">
      <div className="flex justify-between items-end flex-col md:flex-row md:gap-0 gap-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold">Tymar</h3>
          <p className="text-base text-white/70 w-[30ch]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quod
            iusto alias.
          </p>
        </div>
        <div className="w-full flex md:justify-end justify-start items-center gap-5">
          {CONTACTS?.map((item, index) => (
            <Link
              href={item?.href}
              key={index}
              className="border-0 rounded-full transition duration-300 ease-in-out hover:scale-110"
            >
              <item.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
