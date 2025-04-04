import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatDate} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import ActionButtons from "@/app/dashboard/tasks/action-buttons";
import {Task} from "@/types";
import {SpaceIcon} from "lucide-react";

const statusColor = {
  'pending': 'text-purple-500',
  'accepted': 'text-orange-500',
  'in_progress': 'text-yellow-400',
  'completed': 'text-green-500'
};

export default function TasksTable({tasks}: { tasks: Task[] }) {
  return (
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
              <Badge
                variant={['high', 'critical'].includes(task.priority) ? 'destructive' : 'default'}>{task.priority}</Badge>
            </TableCell>
            <TableCell
              className={statusColor[task.status as 'pending' | 'completed' | 'in_progress' | 'accepted']}>{task.status}</TableCell>
            <TableCell>
              <ActionButtons id={task.id}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {
        tasks.length == 0 &&
        <TableFooter>
            <TableRow>
                <TableCell className={'text-center'} colSpan={8}>
                    No tasks
                </TableCell>
            </TableRow>
        </TableFooter>
      }
    </Table>
  )
}