import {z} from "zod";
import {AssignRoleSchema, LoginSchema, RoleSchema, TaskSchema, UserSchema} from "@/lib/schemas";

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type UserSchemaType = z.infer<typeof UserSchema>;
export type RoleSchemaType = z.infer<typeof RoleSchema>;
export type AssignRoleType = z.infer<typeof AssignRoleSchema>;
export type TaskSchemaType = z.infer<typeof TaskSchema>;

export interface AuthContextType {
  user: AuthUserType | undefined,
  setUser: (user: AuthUserType) => void;
}

export interface Permission {
  id: string;
  title: string;
  codename: string;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string | null;
  title: string;
  codename: string;
  permissions_list: Permission[];
  permissions: number[];
  created_at: string;
  updated_at: string;
}

export interface AuthUserType {
  id: string,
  name: string;
  email: string;
  role: Role
}

export interface UserType {
  id: number,
  name: string;
  email: string;
  role: number;
  role_title: string;
}

export type ValidationErrors = {
  [key: string]: string[]
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: UserType | null;
  created_by: UserType;
  created_at: string;
  updated_at: string;
  deadline: string;
  priority: string;
  status: string;
}