import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTokenExpiry = (token: string) => {
  const {exp} = jwt.decode(token) as {exp: number}
  return exp;
};