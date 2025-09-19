import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  AlertTriangle, 
  BarChart3, 
  Shield,
  LogOut,
  Settings
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Tourist Management", url: "/tourists", icon: Users },
  { title: "Live Map", url: "/map", icon: Map },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const userRole = localStorage.getItem('userRole') as 'police' | 'tourism' | null;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-glow" 
      : "hover:bg-secondary text-foreground";

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of SafeTrip Admin",
    });
    navigate('/login');
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-gradient-card border-r border-border transition-all duration-300`}
      collapsible="icon"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-primary rounded-lg p-2 shadow-glow flex-shrink-0">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-foreground">SafeTrip</h2>
              <p className="text-xs text-muted-foreground capitalize">
                {userRole} Department
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                        ${getNavCls({ isActive })}
                      `}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border p-2">
        <div className="space-y-2">
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 hover:bg-secondary"
              onClick={() => {}}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={`${collapsed ? 'w-full justify-center' : 'w-full justify-start gap-3'} hover:bg-destructive/10 hover:text-destructive`}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}