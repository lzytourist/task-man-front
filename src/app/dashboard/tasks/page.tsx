import {getTasks} from "@/actions/tasks";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Task} from "@/types";
import {formatDate} from "@/lib/utils";
import ActionButtons from "@/app/dashboard/tasks/action-buttons";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";

const statusColor = {
  'pending': 'text-purple-500',
  'accepted': 'text-orange-500',
  'in_progress': 'text-yellow-400',
  'completed': 'text-green-500'
};

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.created_by.name}</TableCell>
                <TableCell>{task.assigned_to?.name ?? 'N/A'}</TableCell>
                <TableCell>{formatDate(task.deadline, true)}</TableCell>
                <TableCell>
                  <Badge variant={['high', 'critical'].includes(task.priority) ? 'destructive' : 'default'}>{task.priority}</Badge>
                </TableCell>
                <TableCell
                  className={statusColor[task.status as 'pending' | 'completed' | 'in_progress' | 'accepted']}>{task.status}</TableCell>
                <TableCell>
                  <ActionButtons id={task.id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}