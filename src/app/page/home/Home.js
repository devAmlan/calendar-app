"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Dashboard from "../../../../public/images/dashboard.svg";
function Home() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center flex-col md:gap-20 gap-10 md:my-20 my-10">
        <motion.div
          className="md:w-2/3 w-full px-3 flex justify-center items-center flex-col gap-8 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="md:text-5xl text-3xl font-bold md:leading-[54px] leading-tight">
            Effortlessly manage shifts and eliminate stress with{" "}
            <span className="font-extrabold text-primary">Tymer</span>
          </h1>
          <p className="md:text-lg text-base font-normal leading-[1.6rem] text-[#666666]">
            Take control of your team’s schedule with our intuitive software.
            Minimize scheduling conflicts, reduce confusion, and effortlessly
            manage shifts. Boost your team’s productivity and ensure smooth
            operations.
          </p>
          <Button className="flex justify-center items-center gap-3 font-bold">
            Try Tymer For Free
            <ArrowRight />
          </Button>
        </motion.div>
        <div className="w-full md:px-20 px-3 flex justify-center items-center border-0 rounded-md">
          <Image
            src={Dashboard}
            alt="dashboard"
            layout="responsive"
            objectFit="contain"
            className="border-0 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
