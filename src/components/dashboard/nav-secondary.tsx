"use client"

import * as React from "react"
import {LucideIcon} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {hasPermission} from "@/lib/utils";
import {useAuth} from "@/hooks/use-auth";

export function NavSecondary({
                               items,
                               ...props
                             }: {
  items: {
    title: string
    url: string
    icon: LucideIcon,
    permissions: string[]
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const {user} = useAuth();

  return !!user && (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => hasPermission(item.permissions ?? [], user) && (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon/>
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
