import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function Navbar() {
  return (
    <div className="w-full border-b border-gray-200 flex justify-between items-center px-4 py-2">
      <div className="flex justify-center items-center font-bold text-2xl">
        Tymar
      </div>
      <Button className="font-medium">
        Start Free Trial
        <ArrowRight />
      </Button>
    </div>
  );
}

export default Navbar;
