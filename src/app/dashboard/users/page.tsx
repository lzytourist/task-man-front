import UsersTable from "@/components/tables/users-table";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import CreateButton from "@/components/buttons/create-button";
import {getUsers} from "@/actions/users";
import {UserType} from "@/types";
import {PERMISSIONS} from "@/lib/constants";

export default async function Page() {
  const users = await getUsers() as UserType[];

  return (
    <Card>
      <CardContent>
        <CardTitle>
          <CreateButton permissions={[PERMISSIONS.CREATE_USER]} href={'/dashboard/users/create'}/>
        </CardTitle>
        <UsersTable users={users}/>
      </CardContent>
    </Card>
  )
}