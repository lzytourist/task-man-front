import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon} from "lucide-react";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import RolesTable from "@/components/tables/roles-table";
import {getRoles} from "@/actions/users";
import {Role} from "@/types";

export default async function Page() {
  const roles = await getRoles() as Role[];

  return (
    <div>
      <Card>
        <CardContent>
          <CardTitle>
            <Button asChild={true} size={'sm'}>
              <Link href={'/dashboard/roles/create'}>
                <PlusIcon/>
                Add Role
              </Link>
            </Button>
          </CardTitle>

          <RolesTable roles={roles}/>
        </CardContent>
      </Card>
    </div>
  )
}