import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {getAssignedTasks} from "@/actions/tasks";
import {Task} from "@/types";
import TasksTable from "@/components/tables/tasks-table";

export default async function AssignedTasks() {
  const tasks = await getAssignedTasks() as Task[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <TasksTable tasks={tasks}/>
      </CardContent>
    </Card>
  )
}