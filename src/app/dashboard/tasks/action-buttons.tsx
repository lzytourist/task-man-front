'use client'

import {useAuth} from "@/hooks/use-auth";
import {hasPermission} from "@/lib/utils";
import Link from "next/link";
import {PencilIcon, TrashIcon, ViewIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function ActionButtons({id}: { id: string }) {
  const {user} = useAuth();

  return !!user && (
    <>
      {hasPermission(['view_task'], user) && <Button asChild={true} variant={'ghost'} size={'sm'}>
          <Link href={`/dashboard/tasks/${id}/view`}>
              <ViewIcon/>
          </Link>
      </Button>}
      {hasPermission(['update_task'], user) && <Button asChild={true} variant={'ghost'} size={'sm'}>
          <Link href={`/dashboard/tasks/${id}/edit`}>
              <PencilIcon/>
          </Link>
      </Button>}
      {hasPermission(['delete_task'], user) && <Button asChild={true} variant={'ghost'} size={'sm'}>
          <Link href={`/dashboard/tasks/${id}/delete`}>
              <TrashIcon/>
          </Link>
      </Button>}
    </>
  )
}