import {getTask} from "@/actions/tasks";
import TaskForm from "@/components/forms/task-form";
import {getUsers} from "@/actions/users";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function Page({params: {id}}: {params: {id: string}}) {
  const task = await getTask(id);
  const users = await getUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update task</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm users={users} task={task}/>
      </CardContent>
    </Card>
  )
}