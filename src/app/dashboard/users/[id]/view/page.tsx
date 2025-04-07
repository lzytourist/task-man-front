import {getUser} from "@/actions/users";
import {UserType} from "@/types";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const user = await getUser(id) as UserType;

  return (
    <pre>{JSON.stringify(user, null, 2)}</pre>
  )
}