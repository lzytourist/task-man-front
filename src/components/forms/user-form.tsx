'use client'

import {useForm} from "react-hook-form";
import {Role, UserSchemaType, UserType} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserSchema} from "@/lib/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useAuth} from "@/hooks/use-auth";
import {hasPermission} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {createUser} from "@/actions/users";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function UserForm({user, roles}: { user?: UserType, roles: Role[] }) {
  const {user: authUser} = useAuth();

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
      role: user?.role.toString()
    }
  });

  const router = useRouter();

  const onSubmit = async (data: UserSchemaType) => {
    const response = await createUser(data);
    if (response.error) {
      toast.error('User could not be created');
      Object.keys(response.data).forEach((key) => {
        form.setError(key as 'name' | 'email' | 'role' | 'password', {message: response.data[key].join('. ')})
      })
    } else {
      toast.success('User create successfully');
      form.reset();
      router.push('/dashboard/users');
    }
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
        {!!authUser && hasPermission(['assign_role'], authUser) && <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={'w-full'}>
                  <SelectValue placeholder="Select a role"/>
                </SelectTrigger>
                <SelectContent>
                  {!!roles && roles.map((role, index) => (
                    <SelectItem value={role.id!.toString()} key={index}>{role.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'role'}/>}
        <Button type={'submit'} className={'w-full cursor-pointer'}>Submit</Button>
      </form>
    </Form>
  )
}