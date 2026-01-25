import {
    Outlet,
    createRootRoute,
    useRouterState,
    useNavigate
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Page404 from "@/components/page-404";
import AppSidebar from "@/components/app-sider";
// import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { BreadcrumbBrowser } from "@/components/Breadcrumb";

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: () => <Page404 />
});

function RootComponent() {
    return (
        <ThemeProvider
            defaultTheme="dark"
            storageKey="wms-theme">
            {/* <AuthProvider> */}
            <AppLayout />
            <Toaster />
            <TanStackRouterDevtools position="bottom-right" />
            {/* </AuthProvider> */}
        </ThemeProvider>
    );
}

function AppLayout() {
    //   const { isAuthenticated, isLoading } = useAuth();
    const routerState = useRouterState();
    const navigate = useNavigate();
    const isLoginPage = routerState.location.pathname === "/login";
    const isRegisterPage = routerState.location.pathname === "/register";

    // Show loading while checking auth
    //   if (isLoading) {
    //     return (
    //       <div className="flex min-h-screen items-center justify-center bg-slate-900">
    //         <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-purple-500" />
    //       </div>
    //     );
    //   }

    // If on login page, render without sidebar
    if (isLoginPage || isRegisterPage) {
        return <Outlet />;
    }

    // If not authenticated and not on login, redirect handled by protected routes
    //   if (!isAuthenticated && !isLoginPage && !isRegisterPage) {
    //     window.location.href = "/login";
    //     return null;
    //   }

    // Authenticated layout with sidebar
    return (
        <SidebarProvider className="h-screen w-full overflow-hidden">
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 h-4"
                    />
                    <BreadcrumbBrowser
                        currentPath={routerState.location.pathname}
                        onNavigate={(path: string | null) =>
                            navigate({ to: path || "/" })
                        }
                    />
                </header>
                <main className="bg-dashboard-background flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
