import TaskCard from "@/components/cards/task-card";
import UserCard from "@/components/cards/user-card";
import AssignedTasks from "@/app/dashboard/assigned-tasks";

export default function Page() {
  return (
    <div className={'space-y-4'}>
      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
        <TaskCard/>
        <UserCard/>
      </div>

      <AssignedTasks/>
    </div>
  )
}