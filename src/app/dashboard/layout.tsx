import {ReactNode} from "react";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/dashboard/app-sidebar";
import {Separator} from "@radix-ui/react-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function Layout({children}: {
  children: ReactNode,
}) {
  return (
    <SidebarProvider>
      <AppSidebar variant={'inset'}/>
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b rounded-t-xl px-4">
          <SidebarTrigger className="-ml-1"/>
          <Separator className="mr-2 h-4"/>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block"/>
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          

        </header>
        <div className="p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}