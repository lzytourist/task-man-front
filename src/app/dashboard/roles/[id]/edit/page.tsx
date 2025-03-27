import {getPermissions, getRole} from "@/actions/users";
import RoleForm from "@/components/forms/role-form";

export default async function Page({params: {id}}: {params: {id: string}}) {
  const role = await getRole(id);
  const permissions = await getPermissions();

  return (
    <div>
      <RoleForm permissions={permissions} role={role}/>
    </div>
  )
}