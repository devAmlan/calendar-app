import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Building } from "lucide-react";

function page() {
  return (
    <div className="flex justify-center items-start mt-20">
      <div className="md:w-1/4 w-3/4 flex flex-col gap-2">
        <Input placeholder={"Enter your organization code"} />
        <Button className="flex justify-center items-center gap-2">
          <span>Join Organization</span>
          <Building />
        </Button>
      </div>
    </div>
  );
}

export default page;
