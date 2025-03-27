import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import jwt from "jsonwebtoken";
import {AuthUserType} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTokenExpiry = (token: string) => {
  const {exp} = jwt.decode(token) as { exp: number }
  return exp;
};

export const hasPermission = (required: string[], user: AuthUserType) => {
  const userPermissions = user.role.permissions_list.map(perm => perm.codename);
  return required.every(perm => userPermissions.includes(perm));
}

export const formatDate = (date: string | null, dateOnly: boolean = false) => {
  if (!date) return '';

  const options: { [key: string]: string } = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  if (dateOnly) {
    options['weekday'] = 'short';
    options['hour'] = '2-digit';
    options['minute'] = '2-digit';
  }

  return Intl.DateTimeFormat("en-BD", options).format(new Date(date));
}