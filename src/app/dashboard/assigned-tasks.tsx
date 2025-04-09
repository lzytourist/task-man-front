'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {getAssignedTasks} from "@/actions/tasks";
import {Task} from "@/types";
import TasksTable from "@/components/tables/tasks-table";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/use-auth";

export default function AssignedTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const {user} = useAuth();

  useEffect(() => {
    (async () => {
      if (user?.id) {
        const tasks = await getAssignedTasks(user.id) as Task[];
        setTasks(tasks);
      }
    })()
  }, [user]);

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