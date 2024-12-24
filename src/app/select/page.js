"use client";
import React, { useState } from "react";
import _ from "lodash";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { useGoogleLogin } from "@react-oauth/google";
const OPTIONS = [
  {
    title: "Join as a employee",
    url: "join",
    role: "employee",
  },
  {
    title: "Create organization",
    url: "",
    role: "employer",
  },
];

function page() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  const { handleSuccessGoogleLogin } = useAppContext();
  const googleLogin = useGoogleLogin({
    onSuccess: (payload) => handleSuccessGoogleLogin(payload, role),
  });
  const googleLoginHandler = (userRole) => {
    setRole(userRole);
    googleLogin();
  };

  return (
    <div className="flex items-start justify-center mt-10">
      <div className="md:w-3/4 w-full h-20 flex md:flex-row flex-col justify-between items-center gap-8">
        {_.map(OPTIONS, (option, index) => (
          <div
            className="w-1/2 border h-full border-gray-200 p-4 flex justify-center items-center"
            key={index}
          >
            <Button onClick={() => googleLoginHandler(option?.role)}>
              {option?.title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
