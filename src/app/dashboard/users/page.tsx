import UsersTable from "@/components/tables/users-table";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import CreateButton from "@/components/buttons/create-button";

export default function Page() {
  return (
    <Card>
      <CardContent>
        <CardTitle>
          <CreateButton permissions={['create_user']} href={'/dashboard/users/create'}/>
        </CardTitle>
        <UsersTable/>
      </CardContent>
    </Card>
  )
}