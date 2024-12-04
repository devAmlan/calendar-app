"use client";
import { createContext, useState, useContext } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const handleSuccessGoogleLogin = async (payload) => {
    console.log(payload);
    // setLoading(true);
    // try {
    //   // api call
    //   const response = await postLoginGoogle({ token: payload.credential });
    //   localStorage.setItem("authToken", response.data.data.token);
    //   localStorage.setItem("refershToken", response.data.data.refershToken);
    //   setLoading(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const value = {
    loading,
    handleSuccessGoogleLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
