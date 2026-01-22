import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import { ThemeToggle } from "./mode-button-theme";
import { Link } from "@tanstack/react-router";

const VITE_STATIC_URL =
  import.meta.env?.VITE_STATIC_URL || "http://localhost:5147";

export function SiderUser() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarSrc = user?.avatarUrl ? user.avatarUrl : undefined;

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="hover:bg-sidebar-accent flex h-auto flex-1 items-center justify-start gap-3 p-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={avatarSrc}
                alt={user?.fullName || user?.username}
              />
              <AvatarFallback className="bg-linear-to-br from-purple-500 to-pink-500 text-xs text-white">
                {getInitials(user?.fullName || user?.username)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium">{user?.username}</span>
              <span className="text-muted-foreground text-xs">
                {user?.userGroupName || "User"}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={avatarSrc}
                  alt={user?.fullName || user?.username}
                />
                <AvatarFallback className="bg-linear-to-br from-purple-500 to-pink-500 text-xs text-white">
                  {getInitials(user?.fullName || user?.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium">{user?.username}</span>
                <span className="text-muted-foreground text-xs">
                  {user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/settings/appearance" className="w-full cursor-pointer">
                <BadgeCheck className="mr-2 h-4 w-4" />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeToggle />
    </div>
  );
}
