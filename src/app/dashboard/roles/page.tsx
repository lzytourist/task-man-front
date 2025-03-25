import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon} from "lucide-react";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import RolesTable from "@/components/tables/roles-table";

export default async function Page() {
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

          <RolesTable/>
        </CardContent>
      </Card>
    </div>
  )
}