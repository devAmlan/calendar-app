"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { motion } from "framer-motion";

const initialState = {
  companyName: "",
  name: "",
  employes: [],
};

const getStepContent = (setState) => {
  return {
    step_one: (
      <motion.div
        className="w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p>Step 1 of 3</p>
        <div className="flex flex-col gap-4 my-8">
          <h2 className="text-4xl font-extrabold">
            What's the name of your company or team?
          </h2>
          <p className="text-lg">This will be the name of your workspace</p>
        </div>
        <Input
          type="email"
          placeholder="Ex. Tymar co. or Tymar"
          className="w-1/2 text-base mb-8"
        />
        <Button
          className="px-8 font-semibold bg-primary text-white"
          onClick={() => setState("step_two")}
        >
          Next
        </Button>
      </motion.div>
    ),
    step_two: (
      <motion.div
        className="w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p>Step 2 of 3</p>
        <div className="flex flex-col gap-4 my-8">
          <h2 className="text-4xl font-extrabold">What's your name?</h2>
        </div>
        <Input
          type="email"
          placeholder="Ex. John Doe"
          className="w-1/2 text-base mb-8"
        />
        <Button
          className="px-8 font-semibold bg-primary text-white"
          onClick={() => setState("step_three")}
        >
          Next
        </Button>
      </motion.div>
    ),
    step_three: (
      <motion.div
        className="w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p>Step 3 of 3</p>
        <div className="flex flex-col gap-2 my-8">
          <h2 className="text-4xl font-extrabold">Who else is on your team</h2>
        </div>
        <div className="mb-8 flex flex-col gap-1">
          <p className="text-sm">Add your coworkers by email</p>
          <Textarea
            placeholder="Ex. amlan@gmail.com, ankit@gmail.com"
            className="w-1/2 h-40"
          />
        </div>
        <div className="flex gap-4">
          <Button className="px-8 bg-primary text-white font-semibold">
            Next
          </Button>

          <Button variant="outline" className="px-8 font-semibold">
            Copy Invite Link
          </Button>
        </div>
      </motion.div>
    ),
  };
};
export function OnBoardingModal() {
  const [stepData, setStepData] = useState(initialState);
  const [stepName, setStepName] = useState("step_one");
  return (
    <div className="md:w-3/4 w-full flex justify-center items-center py-20">
      {getStepContent(setStepName)[stepName]}
    </div>
  );
}
