import { useState, useEffect } from "react";
import {
    X,
    Download,
    ExternalLink,
    Image,
    Video,
    Music,
    FileText,
    File,
    Maximize2,
    ZoomIn,
    ZoomOut,
    Loader2
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FileItem } from "@/types/everything.types";
import {
    getFileExtension,
    formatFileSize,
    formatDate
} from "@/utils/file.utils";
import { everythingService } from "@/services/everything.service";
import { authService } from "@/services/auth.service";
import { settingsService } from "@/services/settings.service";

interface FilePreviewProps {
    file: FileItem | null;
    isOpen: boolean;
    onClose: () => void;
}

type PreviewType = "image" | "video" | "audio" | "pdf" | "text" | "unsupported";

function getPreviewType(extension: string): PreviewType {
    const imageExts = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
        "svg",
        "ico"
    ];
    const videoExts = ["mp4", "webm", "ogg", "mov"];
    const audioExts = ["mp3", "wav", "ogg", "aac", "flac"];
    const textExts = ["txt", "md", "json", "xml", "csv", "log", "ini", "cfg"];

    if (imageExts.includes(extension)) return "image";
    if (videoExts.includes(extension)) return "video";
    if (audioExts.includes(extension)) return "audio";
    if (extension === "pdf") return "pdf";
    if (textExts.includes(extension)) return "text";
    return "unsupported";
}

function getMimeType(extension: string): string {
    const map: Record<string, string> = {
        pdf: "application/pdf",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        bmp: "image/bmp",
        webp: "image/webp",
        svg: "image/svg+xml",
        mp4: "video/mp4",
        webm: "video/webm",
        ogg: "video/ogg",
        mov: "video/quicktime",
        mp3: "audio/mpeg",
        wav: "audio/wav",
        aac: "audio/aac",
        flac: "audio/flac",
        txt: "text/plain",
        md: "text/markdown",
        json: "application/json",
        xml: "application/xml",
        csv: "text/csv"
    };
    return map[extension.toLowerCase()] || "application/octet-stream";
}

function FilePreview({ file, isOpen, onClose }: FilePreviewProps) {
    const [zoom, setZoom] = useState(1);
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!file || !isOpen) {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                setObjectUrl(null);
            }
            return;
        }

        const loadFile = async () => {
            setLoading(true);
            setError(null);
            try {
                const filePath = file.path
                    ? `${file.path}\\${file.name}`
                    : file.name;

                if (!authService.isAuthenticated()) {
                    setError("Authentication required");
                    return;
                }

                const encodedPath = encodeURIComponent(filePath);
                // Use /api proxy to avoid CORS issues in production
                // The Express server proxies /api/* to Everything HTTP server
                const urlForFetch = `/api/${encodedPath}`;

                // Prepare headers with auth and dynamic server URL
                const headers = { ...authService.getHeaders() } as Record<
                    string,
                    string
                >;
                const targetUrl = settingsService.getServerUrl();
                if (targetUrl) {
                    headers["X-Everything-Server-Url"] = targetUrl;
                }

                const response = await fetch(urlForFetch, {
                    headers
                });

                if (!response.ok) {
                    throw new Error("Failed to load file");
                }

                const blob = await response.blob();
                const extension = getFileExtension(file.name);
                const mimeType = getMimeType(extension);
                const newBlob = new Blob([blob], { type: mimeType });
                const url = URL.createObjectURL(newBlob);
                setObjectUrl(url);
            } catch (err) {
                console.error("Preview loading error:", err);
                setError("Unable to load preview");
            } finally {
                setLoading(false);
            }
        };

        loadFile();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [file, isOpen]);

    if (!file) return null;

    const extension = getFileExtension(file.name);
    const previewType = getPreviewType(extension);

    // Fallback direct URL (for download/external open) - keeps credentials logic or uses proxy relative path
    const filePath = file.path ? `${file.path}\\${file.name}` : file.name;
    const externalUrl = everythingService.getFileUrl(filePath);

    const handleDownload = () => {
        if (objectUrl) {
            const a = document.createElement("a");
            a.href = objectUrl;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            window.open(externalUrl, "_blank");
        }
    };

    const handleOpenExternal = () => {
        // Use objectUrl (blob with correct MIME type) so browser can view the file
        // instead of downloading it
        if (objectUrl) {
            window.open(objectUrl, "_blank");
        } else {
            window.open(externalUrl, "_blank");
        }
    };

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
    const handleResetZoom = () => setZoom(1);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Loading preview...</p>
                </div>
            );
        }

        if (error || !objectUrl) {
            return (
                <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
                    <X className="h-8 w-8" />
                    <p>{error || "Preview unavailable"}</p>
                </div>
            );
        }

        switch (previewType) {
            case "image":
                return (
                    <div className="relative flex h-full items-center justify-center overflow-auto bg-black/5 dark:bg-white/5">
                        <img
                            src={objectUrl}
                            alt={file.name}
                            className="max-h-full object-contain transition-transform duration-200"
                            style={{ transform: `scale(${zoom})` }}
                        />
                        {/* Zoom Controls */}
                        <div className="bg-background/90 absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg p-2 shadow-lg backdrop-blur">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleZoomOut}
                                className="h-8 w-8">
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <span className="min-w-16 text-center text-sm">
                                {Math.round(zoom * 100)}%
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleZoomIn}
                                className="h-8 w-8">
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleResetZoom}
                                className="h-8 w-8">
                                <Maximize2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                );

            case "video":
                return (
                    <div className="flex h-full items-center justify-center bg-black">
                        <video
                            src={objectUrl}
                            controls
                            className="max-h-full max-w-full">
                            Your browser does not support video playback.
                        </video>
                    </div>
                );

            case "audio":
                return (
                    <div className="flex h-full flex-col items-center justify-center gap-6">
                        <Music className="text-muted-foreground h-24 w-24" />
                        <audio
                            src={objectUrl}
                            controls
                            className="w-full max-w-md">
                            Your browser does not support audio playback.
                        </audio>
                    </div>
                );

            case "pdf":
                return (
                    <iframe
                        src={objectUrl}
                        className="h-full w-full border-0"
                        title={file.name}
                    />
                );

            case "text":
                return (
                    <ScrollArea className="h-full w-full">
                        <iframe
                            src={objectUrl}
                            className="bg-card h-full min-h-[500px] w-full border-0 p-4 font-mono text-sm"
                            title={file.name}
                        />
                    </ScrollArea>
                );

            default:
                return (
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                        <File className="text-muted-foreground h-24 w-24" />
                        <p className="text-lg font-medium">{file.name}</p>
                        <p className="text-muted-foreground text-sm">
                            Preview not available for this file type
                        </p>
                        <Button
                            onClick={handleDownload}
                            className="mt-4">
                            <Download className="mr-2 h-4 w-4" />
                            Download File
                        </Button>
                    </div>
                );
        }
    };

    const getFileIcon = () => {
        switch (previewType) {
            case "image":
                return <Image className="h-5 w-5" />;
            case "video":
                return <Video className="h-5 w-5" />;
            case "audio":
                return <Music className="h-5 w-5" />;
            case "pdf":
            case "text":
                return <FileText className="h-5 w-5" />;
            default:
                return <File className="h-5 w-5" />;
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                className="flex h-[85vh] min-w-[90vw] flex-col gap-0 p-0"
                showCloseButton={false}>
                <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
                    <div className="flex items-center gap-3">
                        {getFileIcon()}
                        <div>
                            <DialogTitle className="text-left text-base font-medium">
                                {file.name}
                            </DialogTitle>
                            <p className="text-muted-foreground text-xs">
                                {formatFileSize(file.size)} •{" "}
                                {formatDate(file.date_modified)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleOpenExternal}
                            title="Open in new tab">
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDownload}
                            title="Download">
                            <Download className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">{renderContent()}</div>
            </DialogContent>
        </Dialog>
    );
}

export default FilePreview;
