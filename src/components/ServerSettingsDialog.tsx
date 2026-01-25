import { useState, useEffect } from "react";
import { Check, AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import {
    settingsService,
    DEFAULT_SERVER_URL
} from "@/services/settings.service";
import { everythingService } from "@/services/everything.service";

interface ServerSettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
}

export default function ServerSettingsDialog({
    isOpen,
    onClose,
    onSaved
}: ServerSettingsDialogProps) {
    const [url, setUrl] = useState("");
    const [isTestLoading, setIsTestLoading] = useState(false);
    const [testStatus, setTestStatus] = useState<"success" | "error" | null>(
        null
    );

    useEffect(() => {
        if (isOpen) {
            setUrl(settingsService.getServerUrl());
            setTestStatus(null);
        }
    }, [isOpen]);

    const handleTest = async () => {
        if (!url) return;
        setIsTestLoading(true);
        setTestStatus(null);

        // We can't easily test without credentials if auth is required,
        // but everythingService.testConnection handles auth headers if logged in.
        // If not logged in, it might fail (401), but for CORS check (which is what we care about mostly for URL validity),
        // 401 proves the server is reachable.

        // We pass the CUSTOM url to testConnection to override the currently saved one
        const success = await everythingService.testConnection(
            undefined,
            undefined,
            url
        );
        // Note: testConnection returns true for 200-299. If 401, it returns false (catch block).
        // We might want to know if it's reachable at all.
        // For now, let's assume 'success' means valid everything server.

        setTestStatus(success ? "success" : "error");
        setIsTestLoading(false);
    };

    const handleSave = () => {
        settingsService.setServerUrl(url);
        onSaved();
        onClose();
    };

    const handleReset = () => {
        setUrl(DEFAULT_SERVER_URL);
        setTestStatus(null);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Server Settings</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="server-url">
                            Everything Server URL
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="server-url"
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value);
                                    setTestStatus(null);
                                }}
                                placeholder="http://192.168.1.100:80"
                                className="flex-1"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleReset}
                                title="Reset to default">
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-muted-foreground text-xs">
                            Enter the IP address and port of your Everything
                            HTTP Server.
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleTest}
                            disabled={!url || isTestLoading}
                            className="w-full sm:w-auto">
                            {isTestLoading ? "Testing..." : "Test Connection"}
                        </Button>

                        {testStatus === "success" && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                                <Check className="h-4 w-4" />
                                <span>Connected</span>
                            </div>
                        )}
                        {testStatus === "error" && (
                            <div className="flex items-center gap-2 text-sm text-red-600">
                                <AlertTriangle className="h-4 w-4" />
                                <span>Connection Failed</span>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!url}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
