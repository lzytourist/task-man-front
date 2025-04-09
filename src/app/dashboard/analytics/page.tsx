import {Task} from "@/types";
import {getTasks} from "@/actions/tasks";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import TasksTable from "@/components/tables/tasks-table";

export default async function Page() {
  const tasks = await getTasks() as Task[];

  const countStatus = {
    pending: 0,
    completed: 0,
    accepted: 0,
    in_progress: 0,
  };

  for (const task of tasks) {
    if (task.status === "pending") {
      countStatus.pending++;
    } else if (task.status === "completed") {
      countStatus.completed++;
    } else if (task.status === "accepted") {
      countStatus.accepted++;
    } else if (task.status === "in-progress") {
      countStatus.in_progress++;
    }
  }

  const getPercentage = (value: number) => {
    return value * 100 / tasks.length;
  }

  const overdueTasks = tasks.filter((task) => new Date(task.deadline) < new Date());

  const upcomingDeadlineTasks = tasks.filter((task) => {
    const today = new Date();
    const targetDate = new Date(task.deadline);

    const timeDifference = targetDate.getTime() - today.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    return dayDifference >= 0 && dayDifference <= 7;
  });

  return (
    <div className={'space-y-4'}>
      <Card>
        <CardHeader>
          <CardTitle>Task Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(countStatus).map((key, index) => (
            <div key={index} className={'flex gap-x-2 items-center'}>
              <p className={'uppercase'}>{key}: </p>
              <Progress value={getPercentage(countStatus[key as keyof typeof countStatus])}/>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Overdue</CardTitle>
        </CardHeader>
        <CardContent>
          <TasksTable tasks={overdueTasks}/>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadline Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TasksTable tasks={upcomingDeadlineTasks}/>
        </CardContent>
      </Card>
    </div>
  )
}