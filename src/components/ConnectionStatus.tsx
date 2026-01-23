import { useState, useEffect } from "react";
import { Wifi, WifiOff, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { settingsService } from "@/services/settings.service";
import { authService } from "@/services/auth.service";
import ServerSettingsDialog from "./ServerSettingsDialog";

interface ConnectionStatusProps {
  className?: string;
}

function ConnectionStatus({ className }: ConnectionStatusProps) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [displayUrl, setDisplayUrl] = useState<string>("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [serverUrl, setServerUrl] = useState(settingsService.getServerUrl());

  const updateStatus = () => {
    // Get current URL from settings
    const currentUrl = settingsService.getServerUrl();
    setServerUrl(currentUrl);

    // For display
    const cleanUrl = currentUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    setDisplayUrl(cleanUrl);
  };

  useEffect(() => {
    updateStatus();

    const checkConnection = async () => {
      try {
        const currentUrl = settingsService.getServerUrl();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(authService.getHeaders() as Record<string, string>),
        };

        if (currentUrl) {
          headers["X-Everything-Server-Url"] = currentUrl;
        }

        // Ping the API with a minimal request
        const response = await fetch("/api/?search=&j=1&c=1", {
          method: "GET",
          headers,
        });

        // Consider connected if we get any response (even 401)
        setIsConnected(response.ok || response.status === 401);
      } catch {
        setIsConnected(false);
      }
    };

    // Check immediately
    checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, [serverUrl]); // Re-run when serverUrl changes

  const handleSaved = () => {
    updateStatus();
    // Trigger re-check implicitly by updating serverUrl state above via updateStatus -> but state update is async/effect dependent
    // actually updateStatus updates 'serverUrl' state which triggers effect.
  };

  return (
    <>
      <div
        onClick={() => setIsSettingsOpen(true)}
        className={cn(
          "flex items-center gap-2 text-sm cursor-pointer hover:opacity-80 transition-opacity",
          isConnected === null
            ? "text-yellow-600 dark:text-yellow-500"
            : isConnected
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400",
          className,
        )}
        title="Click to configure server"
      >
        {isConnected === null ? (
          <>
            <div className="h-2 w-2 animate-pulse rounded-full bg-current" />
            <span>Connecting...</span>
          </>
        ) : isConnected ? (
          <>
            <Wifi className="h-4 w-4" />
            <span className="hidden sm:inline">{displayUrl}</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span className="hidden sm:inline">Disconnected</span>
          </>
        )}
        <Settings className="h-3 w-3 ml-1 opacity-50" />
      </div>

      <ServerSettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaved={handleSaved}
      />
    </>
  );
}

export default ConnectionStatus;
