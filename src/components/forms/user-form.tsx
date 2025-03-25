'use client'

import {useForm} from "react-hook-form";
import {Role, UserSchemaType, UserType} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserSchema} from "@/lib/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect} from "react";

export default function UserForm({user, roles}: { user: UserType | null, roles: Role[] }) {
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: null
    }
  });

  useEffect(() => {
    if (user) {
      form.setValue('name', user.name);
      form.setValue('email', user.email);
      form.setValue('role', user.role);
    }
  }, [form, user]);

  const onSubmit = async (data: UserSchemaType) => {

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'name'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'email'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type={'password'} {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'password'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={'w-full'}>
                  <SelectValue placeholder="Select a role"/>
                </SelectTrigger>
                <SelectContent>
                  {!!roles && roles.map((role, index) => (
                    <SelectItem value={role.id ?? ''} key={index}>{role.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'role'}/>
      </form>
    </Form>
  )
}