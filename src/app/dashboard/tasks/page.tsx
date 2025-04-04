import {getTasks} from "@/actions/tasks";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Task} from "@/types";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon} from "lucide-react";
import TasksTable from "@/components/tables/tasks-table";

export default async function Page() {
  const tasks = await getTasks() as Task[];

  return (
    <Card>
      <CardHeader className={'flex items-center justify-between'}>
        <CardTitle>Tasks</CardTitle>
        <Button asChild={true} size={'sm'}>
          <Link href={'/dashboard/tasks/create'}>
            <PlusIcon/>
            Add Task
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <TasksTable tasks={tasks}/>
      </CardContent>
    </Card>
  )
}