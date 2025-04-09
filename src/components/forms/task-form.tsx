'use client'

import {Task, TaskSchemaType, UserType} from "@/types";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TaskSchema} from "@/lib/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {createTask, updateTask} from "@/actions/tasks";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const STATUS = [
  {value: 'pending', label: 'Pending'},
  {value: 'accepted', label: 'Accepted'},
  {value: 'in-progress', label: 'In progress'},
  {value: 'completed', label: 'Completed'}
];

const PRIORITY = [
  {value: 'low', label: 'Low'},
  {value: 'medium', label: 'Medium'},
  {value: 'high', label: 'High'},
  {value: 'critical', label: 'Critical'}
];

export default function TaskForm({users, task}: { users: UserType[], task?: Task }) {
  const form = useForm<TaskSchemaType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: task?.title ?? '',
      deadline: task?.deadline ?? '',
      description: task?.description ?? '',
      priority: task?.priority ?? '',
      status: task?.status ?? '',
      assigned_to_id: task?.assigned_to?.id.toString() ?? ''
    }
  });

  const router = useRouter();

  const onSubmit = async (data: TaskSchemaType) => {
    let response: { error: boolean, data: object };
    console.log(data);
    if (!task) {
      response = await createTask(data);
    } else {
      response = await updateTask(task.id, data);
    }
    if (response.error) {
      toast.error(
        !task ? 'Task could not be created.'
          : 'Task could not be updated.'
      );
      const errors = response.data as { [key: string]: string[] }
      Object.keys(errors).forEach((key) => {
        form.setError(key as 'title' | 'description' | 'assigned_to_id' | 'priority' | 'status' | 'deadline', {message: errors[key].join('. ')})
      });
    } else {
      toast.success(
        !task ? 'Task created successfully.'
          : 'Task updated successfully.'
      );
      form.reset();
      router.push('/dashboard/tasks');
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} name={'description'}/>
        <div className={'grid grid-cols-2 gap-4'}>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input type={'date'} {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} name={'deadline'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>Assign to</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className={'w-full'}>
                    <SelectValue placeholder={'Select a user'}/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user, index) => (
                    <SelectItem key={index} value={user.id.toString()}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )} name={'assigned_to_id'}/>
        </div>
        <div className={'grid grid-cols-2 gap-4'}>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className={'w-full'}>
                    <SelectValue placeholder={'Select task priority'}/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PRIORITY.map((priority, index) => (
                    <SelectItem key={index} value={priority.value}>{priority.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )} name={'priority'}/>
          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className={'w-full'}>
                    <SelectValue placeholder={'Select task status'}/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {STATUS.map((status, index) => (
                    <SelectItem key={index} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )} name={'status'}/>
        </div>
        <Button type={'submit'} className={'w-full cursor-pointer'}>Submit</Button>
      </form>
    </Form>
  )
}