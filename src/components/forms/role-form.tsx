'use client'

import {useForm} from "react-hook-form";
import {Permission, Role, RoleSchemaType} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {RoleSchema} from "@/lib/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {ChangeEvent} from "react";
import {Button} from "@/components/ui/button";
import {addRole, updateRole} from "@/actions/users";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function RoleForm({permissions, role}: { permissions: Permission[], role?: Role }) {
  const form = useForm<RoleSchemaType>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      title: role?.title ?? '',
      codename: role?.codename ?? '',
      permissions: role?.permissions ?? []
    }
  });

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const prev= form.getValues('permissions');
    if (e.target.checked) {
      const curr = [...prev, parseInt(e.target.value)];
      form.setValue('permissions', curr);
    } else {
      const curr = prev.filter((val) => val !== parseInt(e.target.value));
      form.setValue('permissions', curr);
    }
    // console.log(form.getValues('permissions'))
  }

  const router = useRouter();

  const onSubmit = async (data: RoleSchemaType) => {
    let response: { data: object, error: boolean };
    if (!role) {
      response = await addRole(data);
    } else {
      response = await updateRole(role!.id!.toString(), data);
    }
    if (response.error) {
      // console.log(response.data);
      // TODO: Show error in the form
      toast.error(JSON.stringify(response.data));
    } else {
      toast.success(
        !role ? 'Role added successfully' : 'Role updated successfully'
      );
      form.reset();
      router.push('/dashboard/roles');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'title'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Code Name</FormLabel>
            <FormControl>
              <Input {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'codename'}/>
        <FormLabel>Permissions</FormLabel>
        <div className={'grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6'}>
          {(permissions).map((permission, index) => (
            <FormField key={index} render={() => (
            <FormItem className={'flex items-center'}>
              <FormLabel className={'capitalize'}>{permission.title}</FormLabel>
              <FormControl>
                <Input
                  className={'h-[18px] border-0 ring-0 outline-0 shadow-none drop-shadow-none'}
                  defaultValue={permission.id}
                  type={'checkbox'}
                  defaultChecked={role?.permissions.includes(parseInt(permission.id)) ?? false}
                  onChange={handleCheck}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'permissions'}/>
          ))}
        </div>
        <Button type={'submit'} className={'w-full cursor-pointer'}>Submit</Button>
      </form>
    </Form>
  )
}