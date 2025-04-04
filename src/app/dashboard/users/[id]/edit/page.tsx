import UserForm from "@/components/forms/user-form";
import {getRoles, getUser} from "@/actions/users";
import {Role} from "@/types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function Page({params: {id}}: {params: {id: string}}) {
  const roles = await getRoles() as Role[];
  const user = await getUser(id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update user</CardTitle>
      </CardHeader>
      <CardContent>
        <UserForm roles={roles} user={user}/>
      </CardContent>
    </Card>
  )
}