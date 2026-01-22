import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { User, Palette } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPages,
});

const sidebarItems = [
  {
    title: "Profile",
    icon: User,
    to: "/settings/profile",
  },

  {
    title: "Appearance",
    icon: Palette,
    to: "/settings/appearance",
  },
];

function SettingsPages() {
  return (
    <div className="block space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your profile and account settings
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="bg-border my-6 h-px w-full shrink-0"
      />
      <div className="flex flex-col gap-8 space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-y-1 lg:space-x-0">
            {sidebarItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-primary flex items-center justify-start gap-2 rounded-md p-2 text-sm font-medium transition-colors"
                activeProps={{
                  className: "bg-muted hover:bg-muted",
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
