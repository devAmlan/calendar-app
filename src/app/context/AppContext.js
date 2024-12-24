"use client";
import { createContext, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/api/user";
import { getAuthToken } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { postLoginGoogle } from "@/api/auth";
import axios from "axios";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [] = useState(null);
  const router = useRouter();

  const handleSuccessGoogleLogin = async (payload, role) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${payload?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${payload?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      const { email, picture, name } = response.data;

      // const authResponse = await postLoginGoogle({
      //   email,
      //   picture,
      //   name,
      //   role,
      // });

      const authResponse = await axios
        .create({
          baseURL: "http://localhost:5000",
        })
        .post("auth/login/google", {
          email,
          picture,
          name,
          role,
        });

      localStorage.setItem("authToken", authResponse.data.data.token);
      if (authResponse.data.data.isNew) {
        router.push("/register");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: userProfile, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    enabled: !!getAuthToken(),
  });

  const value = {
    loading,
    handleSuccessGoogleLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
