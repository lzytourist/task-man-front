import {getTask} from "@/actions/tasks";
import {Task} from "@/types";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {formatDate} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {Badge} from "@/components/ui/badge";

export default async function Page({params: {id}}: { params: { id: string } }) {
  const task = await getTask(id) as Task;

  return (
    <Card>
      <CardHeader className={'flex justify-between items-center'}>
        <div>
          <h2 className={'text-xl uppercase'}>Assigned to</h2>
          <p className={'font-bold'}>Name: {task.assigned_to?.name}</p>
          <p>Role: {task.assigned_to?.role_title}</p>
        </div>
        <div className={'text-center'}>
          <p className={'font-bold text-orange-400 animate-pulse'}>Deadline: {formatDate(task.deadline, true)}</p>
          <p>Status: <span className={'uppercase'}>{task.status}</span></p>
          <p>Priority: <span className={'uppercase'}><Badge>{task.priority}</Badge></span></p>
        </div>
        <div className={'flex flex-col items-end'}>
          <h2 className={'text-xl uppercase'}>Created by</h2>
          <p className={'font-bold'}>Name: {task.created_by?.name}</p>
          <p>Role: {task.created_by?.role_title}</p>
        </div>
      </CardHeader>
      <CardContent className={'border-y-2 py-4'}>
        <p className={'font-bold'}>Title: {task.title}</p>
        <p>Description: {task.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild={true}>
          <Link href={'/dashboard/tasks'}>
            <ArrowLeft/>
            Go back
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}