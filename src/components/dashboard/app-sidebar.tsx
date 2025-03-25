"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon, BoltIcon,
  CameraIcon,
  ClipboardListIcon,
  FileCodeIcon,
  FileTextIcon,
  FolderIcon, GroupIcon,
  HelpCircleIcon,
  LayoutDashboardIcon, LucideMail,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/dashboard/nav-documents"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useAuth} from "@/hooks/use-auth";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      permissions: [],
      icon: LayoutDashboardIcon
    },
    {
      title: "Analytics",
      url: "#",
      permissions: [],
      icon: BarChartIcon
    },
    {
      title: "Task",
      url: "/tasks",
      permissions: ['view_task'],
      icon: FolderIcon
    },
    {
      title: "Team",
      url: "#",
      permissions: ['view_team'],
      icon: GroupIcon
    },
    {
      title: "Email",
      url: "#",
      permissions: ['send_email'],
      icon: LucideMail
    },
    {
      title: "Users",
      url: "/dashboard/users",
      permissions: ['view_user'],
      icon: UsersIcon
    }
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      permissions: ['view_settings'],
      icon: SettingsIcon
    },
    {
      title: "Roles",
      url: "/dashboard/roles",
      permissions: ['view_role'],
      icon: BoltIcon
    },
    {
      title: "Get Help",
      url: "#",
      permissions: [],
      icon: HelpCircleIcon
    },
  ],
  documents: [
    {
      name: "Reports",
      url: "#",
      permissions: ['generate_report'],
      icon: ClipboardListIcon
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user} = useAuth();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">TaskMan Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
