import {z} from "zod";
import {LoginSchema} from "@/lib/schemas";

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export interface AuthContextType {
  user: UserType | undefined,
  setUser: (user: UserType) => void;
  updateUser: (user: UserType) => void;
}

export interface UserType {
  id: number,
  first_name: string;
  last_name: string;
  get_full_name: string;
  email: string;
}

export type ValidationErrors = {
  [key: string]: string[]
}