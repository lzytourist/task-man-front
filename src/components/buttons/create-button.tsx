'use client'

import Link from "next/link";
import {PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/use-auth";
import {hasPermission} from "@/lib/utils";

export default function CreateButton({permissions = [], href}: { permissions?: string[], href?: string }) {
  const {user} = useAuth();

  return !!user && hasPermission(permissions, user) && (
    <Button asChild={true} size={'sm'}>
      <Link href={href ?? '#'}>
        <PlusIcon/>
        Add User
      </Link>
    </Button>
  )
}