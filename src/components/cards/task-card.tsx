import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FolderArchiveIcon} from "lucide-react";
import {getTasks} from "@/actions/tasks";
import {Task} from "@/types";

export default async function TaskCard() {
  const tasks = await getTasks() as Task[];

  return (
    <Card>
      <CardHeader className="flex flex-col justify-center items-center">
        <FolderArchiveIcon className={'text-orange-500'} size={60}/>
        <CardDescription>Total Task</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {tasks.length}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}