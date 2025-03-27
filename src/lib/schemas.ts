import {z} from "zod";

export const LoginSchema = z.object({
  email: z.string().email({message: "Please enter a valid email"}),
  password: z.string().min(1, {message: "Please enter your password"})
});

export const RoleSchema = z.object({
  title: z.string().min(1, {message: "Please give a title"}),
  codename: z.string().min(1, {message: "Please give a codename"}),
  permissions: z.array(z.number()),
});

export const UserSchema = z.object({
  name: z.string().min(1, {message: "Please enter name"}),
  email: z.string().email({message: "Please enter a valid email"}),
  password: z.string().min(6, {message: "Password must be at least of 6 characters"}),
  role: z.string().nullish(),
});

export const AssignRoleSchema = z.object({
  role: z.string().nullable(),
});

export const TaskSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  priority: z.string(),
  deadline: z.string(),
  assigned_to_id: z.string(),
});