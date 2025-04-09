'use client'

import {EmailSchemaType, UserType} from "@/types";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {EmailSchema} from "@/lib/schemas";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {SendIcon} from "lucide-react";
import {sendEmail} from "@/actions/auth";
import {toast} from "sonner";

export default function EmailForm({users}: { users?: UserType[] }) {
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      to: '',
      subject: '',
      message: '',
    }
  });

  const selectUser = (value: string) => {
    form.resetField('to');
    form.setValue('to', value);
  }

  const onSubmit = async (data: EmailSchemaType) => {
    const res = await sendEmail(data);
    if (!res.error) {
      toast.success("Email sent successfully.");
      form.reset();
    } else {
      toast.error("Email could not be sent.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>To <span className={'text-gray-400 text-sm'}>Use the selection menu for user emails</span></FormLabel>
            <div className={'grid gap-4 grid-cols-3'}>
              <FormControl className={'col-span-2'}>
                <Input {...field}/>
              </FormControl>
              <Select onValueChange={selectUser}>
                <SelectTrigger className={'w-full'}>
                  <SelectValue placeholder={'Select an user'}/>
                </SelectTrigger>
                <SelectContent>
                  {(users ?? []).map((user, index) => (
                    <SelectItem value={user.email} key={index}>{user.name}({user.email})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage/>
          </FormItem>
        )} name={'to'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <FormControl>
              <Input {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'subject'}/>
        <FormField render={({field}) => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'message'}/>
        <Button type={'submit'} className={'w-full cursor-pointer'}>Send <SendIcon/></Button>
      </form>
    </Form>
  )
}