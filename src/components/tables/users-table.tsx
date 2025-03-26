'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {EditIcon, TrashIcon, ViewIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {Role, UserType} from "@/types";
import {getRoles, getUsers} from "@/actions/users";
import Link from "next/link";
import {useAuth} from "@/hooks/use-auth";
import {hasPermission} from "@/lib/utils";
import AssignRoleForm from "@/components/forms/assign-role-form";

interface Result {
  next: string | null;
  previous: string | null;
  count: number;
  results: UserType[]
}

export default function UsersTable() {
  const [data, setData] = useState<UserType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const pageSize = 15;
  const [roles, setRoles] = useState<Role[]>([]);

  const {user} = useAuth();

  useEffect(() => {
    (async () => {
      const users = await getUsers() as UserType[];
      setData(users);

      if (user && hasPermission(['update_user', 'assign_role'], user)) {
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
        {(data || []).map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell className={'text-center'}>
              {!!user && (hasPermission(['update_user', 'assign_role'], user) ? <div>
                <AssignRoleForm roles={roles} user={item}/>
              </div> : item.role_title)}
            </TableCell>
            <TableCell className="text-right">
              {
                !!user && hasPermission(['update_user'], user) &&
                  <Button asChild={true} className={'cursor-pointer'} variant={'ghost'} size={'sm'}>
                      <Link href={`/dashboard/users/${item.id}/edit`}>
                          <EditIcon/>
                      </Link>
                  </Button>
              }
              {
                !!user && hasPermission(['view_user'], user) &&
                  <Button asChild={true} className={'cursor-pointer'} variant={'ghost'} size={'sm'}>
                      <Link href={`/dashboard/users/${item.id}/view`}>
                          <ViewIcon/>
                      </Link>
                  </Button>
              }
              {
                !!user && hasPermission(['delete_user'], user) &&
                  <Button asChild={true} className={'cursor-pointer'} variant={'ghost'} size={'sm'}>
                      <Link href={`/dashboard/users/${item.id}/delete`}>
                          <TrashIcon/>
                      </Link>
                  </Button>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {(total > 0) && <TableFooter>
          <TableRow>
              <TableCell colSpan={4}>
                  <div className="flex items-center justify-end space-x-2 py-4">
                      <Button variant={'outline'} onClick={() => setPage((p) => Math.max(p - 1, 1))}
                              disabled={page === 1}>
                          Previous
                      </Button>
                      <span>Page {page} of {Math.ceil(total / pageSize)}</span>
                      <Button variant={'outline'}
                              onClick={() => setPage((p) => (p < Math.ceil(total / pageSize) ? p + 1 : p))}
                              disabled={page * pageSize >= total}>
                          Next
                      </Button>
                  </div>
              </TableCell>
          </TableRow>
      </TableFooter>}
    </Table>
  );
}