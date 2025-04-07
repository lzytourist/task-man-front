"use client"

import {PlusCircleIcon, type LucideIcon} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {useAuth} from "@/hooks/use-auth";
import {hasPermission} from "@/lib/utils";
import Notifications from "@/components/notifications";

export function NavMain({items,}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon,
    permissions: string[]
  }[]
}) {
  const {user} = useAuth();

  return !!user && (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild={true}
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <Link href={'/dashboard/tasks/create'}>
                <PlusCircleIcon/>
                <span>Quick Create</span>
              </Link>
            </SidebarMenuButton>

            <Notifications/>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => hasPermission(item.permissions ?? [], user) && (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  {item.icon && <item.icon/>}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
