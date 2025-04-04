'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {hasPermission} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {EditIcon, ViewIcon} from "lucide-react";
import {useAuth} from "@/hooks/use-auth";
import {Role} from "@/types";
import {deleteRole} from "@/actions/users";
import DeleteButton from "@/components/buttons/delete-button";

export default function RolesTable({roles}: {roles: Role[]}) {
  const {user} = useAuth();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Code Name</TableHead>
          <TableHead className={'text-center'}>Total Permissions</TableHead>
          <TableHead className={'text-right'}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(roles || []).map((role, index) => (
          <TableRow key={index}>
            <TableCell>{role.title}</TableCell>
            <TableCell>{role.codename}</TableCell>
            <TableCell className={'text-center'}>{role.permissions.length}</TableCell>
            <TableCell>
              {
                !!user && hasPermission(['update_role'], user) &&
                  <Button asChild={true} className={'cursor-pointer'} variant={'ghost'} size={'sm'}>
                      <Link href={`/dashboard/roles/${role.id}/edit`}>
                          <EditIcon/>
                      </Link>
                  </Button>
              }
              {
                !!user && hasPermission(['view_role'], user) &&
                  <Button asChild={true} className={'cursor-pointer'} variant={'ghost'} size={'sm'}>
                      <Link href={`/dashboard/roles/${role.id}/view`}>
                          <ViewIcon/>
                      </Link>
                  </Button>
              }
              {
                !!user && hasPermission(['delete_role'], user) &&
                <DeleteButton id={role.id!} action={deleteRole}/>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}