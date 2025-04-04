'use client'

import {createContext, ReactNode, useState} from "react";
import {AuthContextType, AuthUserType} from "@/types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({children}: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUserType | undefined>(undefined);

  const context = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
