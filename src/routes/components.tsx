import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectionStatus from "@/components/ConnectionStatus";
import {
  Component,
  Type,
  MousePointer2,
  RadioReceiver,
  Palette,
  LayoutTemplate,
} from "lucide-react";
import { useState } from "react";
import LoginDialog from "@/components/LoginDialog";
import ServerSettingsDialog from "@/components/ServerSettingsDialog";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/components")({
  component: ComponentShowcase,
});

function ComponentShowcase() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">UI Components</h1>
        <p className="text-muted-foreground">
          Design system and component library showcase for Everything Search
          App.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="primitives">Primitives</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Structure</CardTitle>
                <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Layouts</div>
                <p className="text-xs text-muted-foreground">
                  Responsive sidebar navigation & header system
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Typography
                </CardTitle>
                <Type className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Inter</div>
                <p className="text-xs text-muted-foreground">
                  Modern sans-serif font family
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Theming</CardTitle>
                <Palette className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Dark Mode</div>
                <p className="text-xs text-muted-foreground">
                  Built-in dark/light theme support
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Status Indicator</CardTitle>
              <CardDescription>
                Widget displaying connection state and proxy status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                <Label>Live Component:</Label>
                <ConnectionStatus />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="primitives" className="space-y-8">
          {/* Typography Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Type className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Typography</h2>
            </div>
            <div className="grid gap-4 p-4 border rounded-lg">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Heading 1
                </h1>
                <span className="text-xs text-muted-foreground">
                  4xl/Extrabold
                </span>
              </div>
              <Separator />
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Heading 2
                </h2>
                <span className="text-xs text-muted-foreground">
                  3xl/Semibold
                </span>
              </div>
              <Separator />
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Heading 3
                </h3>
                <span className="text-xs text-muted-foreground">
                  2xl/Semibold
                </span>
              </div>
              <Separator />
              <div>
                <p className="leading-7 not-first:mt-6">
                  The quick brown fox jumps over the lazy dog. Styling text is
                  essential for readability and hierarchy. This is component
                  body text with comfortable line height.
                </p>
                <span className="text-xs text-muted-foreground">
                  Body/Leading-7
                </span>
              </div>
            </div>
          </section>

          {/* Buttons Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <MousePointer2 className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Buttons</h2>
            </div>
            <div className="flex flex-wrap gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Button>Default Button</Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Primary
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="secondary">Secondary</Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Secondary
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="destructive">Destructive</Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Destructive
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline">Outline</Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Outline
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="ghost">Ghost</Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Ghost
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="link">Link Button</Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Link
                </p>
              </div>
            </div>
          </section>

          {/* Inputs Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <RadioReceiver className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Inputs & Forms</h2>
            </div>
            <div className="grid gap-6 p-4 border rounded-lg max-w-xl">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="search">Search Input</Label>
                <Input
                  type="search"
                  id="search"
                  placeholder="Type to search..."
                />
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="modules" className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Component className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Interactive Modules</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Login Dialog</CardTitle>
                  <CardDescription>Authentication modal prompt</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setIsLoginOpen(true)}
                    className="w-full"
                  >
                    Trigger Login Modal
                  </Button>
                  <LoginDialog
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                    onLogin={async () => {
                      await new Promise((r) => setTimeout(r, 1000));
                      setIsLoginOpen(false);
                      return true;
                    }}
                    error={null}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Server Settings</CardTitle>
                  <CardDescription>
                    Configuration dialog for API endpoint
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    onClick={() => setIsSettingsOpen(true)}
                    className="w-full"
                  >
                    Open Settings
                  </Button>
                  <ServerSettingsDialog
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    onSaved={() => {}}
                  />
                </CardContent>
              </Card>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
