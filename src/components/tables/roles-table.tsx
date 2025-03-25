'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {hasPermission} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {EditIcon, TrashIcon, ViewIcon} from "lucide-react";
import {useAuth} from "@/hooks/use-auth";
import {useEffect, useState} from "react";
import {Role} from "@/types";
import {getRoles} from "@/actions/users";

export default function RolesTable() {
  const {user} = useAuth();
  const [roles, setRoles] = useState<Role[]>();

  useEffect(() => {
    (async () => {
      const data = await getRoles() as Role[];
      setRoles(data);
    })()
  }, []);

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
                      <Link href={`/dashboard/users/${role.id}/edit`}>
                          <EditIcon/>
                      </Link>
                  </Button>
              }
              {
                !!user && hasPermission(['view_role'], user) &&
                  <Button asChild={true} className={'cursor-pointer'} variant={'ghost'} size={'sm'}>
                      <Link href={`/dashboard/users/${role.id}/view`}>
                          <ViewIcon/>
                      </Link>
                  </Button>
              }
              {
                !!user && hasPermission(['delete_role'], user) &&
                  <Button asChild={true} className={'cursor-pointer'} variant={'ghost'} size={'sm'}>
                      <Link href={`/dashboard/users/${role.id}/delete`}>
                          <TrashIcon/>
                      </Link>
                  </Button>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}