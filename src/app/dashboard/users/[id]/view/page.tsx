import {getUser} from "@/actions/users";
import {UserType} from "@/types";

export default async function Page({params: {id}}: {params: {id: string}}) {
  const user = await getUser(id) as UserType;

  return (
    <pre>{JSON.stringify(user, null, 2)}</pre>
  )
}