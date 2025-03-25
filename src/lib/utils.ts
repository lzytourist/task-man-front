import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken";
import {AuthUserType, UserType} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTokenExpiry = (token: string) => {
  const {exp} = jwt.decode(token) as {exp: number}
  return exp;
};

export const hasPermission = (required: string[], user: AuthUserType)=> {
  const userPermissions = user.role.permissions_list.map(perm => perm.codename);
  return required.every(perm => userPermissions.includes(perm));
}

export const formatDate = (date: string) => {
  return Intl.DateTimeFormat("en-BD", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}