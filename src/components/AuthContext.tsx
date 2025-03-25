'use client'

import {createContext, ReactNode, useEffect, useState} from "react";
import {AuthContextType, UserType} from "@/types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({children}: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  const updateUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/`, {
      credentials: "include"
    });

    console.log(response);
  };

  useEffect(() => {
    // updateUser().finally();
  }, []);

  const context = {
    user,
    setUser,
    updateUser,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
