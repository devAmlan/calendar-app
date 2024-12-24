"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppContext } from "../../context/AppContext";
import Link from "next/link";
function Navbar() {
  const { handleSuccessGoogleLogin } = useAppContext();

  const googleLoginHandler = useGoogleLogin({
    onSuccess: handleSuccessGoogleLogin,
  });
  return (
    <div className="w-full border-b border-gray-200 flex justify-between items-center px-4 py-2">
      <Link href={"/"}>
        <div className="flex justify-center items-center font-bold text-2xl">
          Tymar
        </div>
      </Link>
      <Button className="font-medium" onClick={googleLoginHandler}>
        Start Free Trial
        <ArrowRight />
      </Button>
    </div>
  );
}

export default Navbar;
