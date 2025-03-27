import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FolderArchiveIcon, PersonStandingIcon} from "lucide-react";
import {UserType} from "@/types";
import {getUsers} from "@/actions/users";

export default async function UserCard() {
  const users = await getUsers() as UserType[];

  return (
    <Card>
      <CardHeader className="flex flex-col justify-center items-center">
        <PersonStandingIcon className={'text-orange-500'} size={60}/>
        <CardDescription>Total User</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {users.length}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}