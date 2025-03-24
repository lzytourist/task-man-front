import {AuthContext} from "@/components/AuthContext";
import {useContext} from "react";
import {AuthContextType} from "@/types";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be used within AuthContextProvider!");
  }
  return context;
};