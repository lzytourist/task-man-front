import {getUsers} from "@/actions/users";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import TaskForm from "@/components/forms/task-form";

export default async function Page() {
  const users = await getUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create task</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm users={users}/>
      </CardContent>
    </Card>
  )
}