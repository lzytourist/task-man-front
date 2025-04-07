'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {EditIcon, ViewIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {Role, UserType} from "@/types";
import {deleteUser, getRoles} from "@/actions/users";
import Link from "next/link";
import {useAuth} from "@/hooks/use-auth";
import {hasPermission} from "@/lib/utils";
import AssignRoleForm from "@/components/forms/assign-role-form";
import DeleteButton from "@/components/buttons/delete-button";
import {PERMISSIONS} from "@/lib/constants";


export default function UsersTable({users}: {users: UserType[]}) {
  const [roles, setRoles] = useState<Role[]>([]);

  const {user} = useAuth();

  useEffect(() => {
    (async () => {
      if (user && hasPermission([PERMISSIONS.UPDATE_USER, PERMISSIONS.ASSIGN_ROLE], user)) {
        const data = await getRoles() as Role[];
        setRoles(data);
      }
    })()
  }, [user])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(users || []).map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell className={'text-center'}>
              {!!user && (hasPermission([PERMISSIONS.UPDATE_ROLE, PERMISSIONS.ASSIGN_ROLE], user) ? <div>
                <AssignRoleForm roles={roles} user={item}/>
              </div> : item.role_title)}
            </TableCell>
            <TableCell className="text-right">
              {
                !!user && hasPermission([PERMISSIONS.UPDATE_USER], user) &&
                  <Button asChild={true} className={'cursor-pointer'} variant={'ghost'} size={'sm'}>
                      <Link href={`/dashboard/users/${item.id}/edit`}>
                          <EditIcon/>
                      </Link>
                  </Button>
              }
              {
                !!user && hasPermission([PERMISSIONS.VIEW_USER], user) &&
                  <Button asChild={true} className={'cursor-pointer'} variant={'ghost'} size={'sm'}>
                      <Link href={`/dashboard/users/${item.id}/view`}>
                          <ViewIcon/>
                      </Link>
                  </Button>
              }
              {
                !!user && hasPermission([PERMISSIONS.DELETE_USER], user) &&
                <DeleteButton id={item.id.toString()} action={deleteUser}/>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}