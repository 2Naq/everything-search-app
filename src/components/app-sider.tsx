import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Search } from "lucide-react";
import { SiderUser } from "./nav-user";
import AppLogo from "./app-logo";

const mainMenuItems = [
  { title: "Dashboard", icon: LayoutDashboard, to: "/" as const },
  { title: "Tìm kiếm", icon: Search, to: "/everything-search" as const },
];

export default function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <AppLogo isShowSubTitle />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tìm kiếm</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.to}
                      search={(item as any).search}
                      activeProps={{
                        className:
                          "bg-sidebar-accent text-sidebar-accent-foreground",
                      }}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SiderUser />
      </SidebarFooter>
    </Sidebar>
  );
}
