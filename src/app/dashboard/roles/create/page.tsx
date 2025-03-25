import RoleForm from "@/components/forms/role-form";
import {getPermissions} from "@/actions/users";

export default async function Page() {
  const perms = await getPermissions();

  return (
    <div>
      <RoleForm permissions={perms}/>
    </div>
  )
}