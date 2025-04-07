import {getPermissions, getRole} from "@/actions/users";
import RoleForm from "@/components/forms/role-form";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const role = await getRole(id);
  const permissions = await getPermissions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Role</CardTitle>
      </CardHeader>
      <CardContent>
        <RoleForm permissions={permissions} role={role}/>
      </CardContent>
    </Card>
  )
}