import EmailForm from "@/components/forms/email-form";
import {getUsers} from "@/actions/users";
import {UserType} from "@/types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function Page() {
  const users = await getUsers() as UserType[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Email</CardTitle>
      </CardHeader>
      <CardContent>
        <EmailForm users={users}/>
      </CardContent>
    </Card>
  )
}