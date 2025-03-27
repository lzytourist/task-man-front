import RoleForm from "@/components/forms/role-form";
import {getPermissions} from "@/actions/users";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function Page() {
  const permissions = await getPermissions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Role</CardTitle>
      </CardHeader>
      <CardContent>
        <RoleForm permissions={permissions}/>
      </CardContent>
    </Card>
  )
}