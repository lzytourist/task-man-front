import UserForm from "@/components/forms/user-form";
import {getRoles} from "@/actions/users";
import {Role} from "@/types";

export default async function Page() {
    const roles = await getRoles() as Role[];

    return (
        <div>
            <UserForm roles={roles}/>
        </div>
    )
}