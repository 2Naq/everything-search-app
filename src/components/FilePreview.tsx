import { useState } from "react";
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
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FileItem } from "@/types/everything.types";
import {
  getFileExtension,
  getFileType,
  formatFileSize,
  formatDate,
} from "@/utils/file.utils";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

interface FilePreviewProps {
  file: FileItem | null;
  isOpen: boolean;
  onClose: () => void;
}

type PreviewType = "image" | "video" | "audio" | "pdf" | "text" | "unsupported";

function getPreviewType(extension: string): PreviewType {
  const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "ico"];
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

function FilePreview({ file, isOpen, onClose }: FilePreviewProps) {
  const [zoom, setZoom] = useState(1);
  const [imageError, setImageError] = useState(false);

  if (!file) return null;

  const filePath = file.path ? `${file.path}\\${file.name}` : file.name;
  const fileUrl = `${API_BASE_URL}/${encodeURIComponent(filePath)}`;
  const extension = getFileExtension(file.name);
  const fileType = getFileType(extension);
  const previewType = getPreviewType(extension);

  const handleDownload = () => {
    window.open(fileUrl, "_blank");
  };

  const handleOpenExternal = () => {
    window.open(fileUrl, "_blank");
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  const renderPreview = () => {
    switch (previewType) {
      case "image":
        return (
          <div className="relative flex h-full items-center justify-center overflow-auto bg-black/5 dark:bg-white/5">
            {imageError ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Image className="h-16 w-16" />
                <p>Unable to load image</p>
              </div>
            ) : (
              <img
                src={fileUrl}
                alt={file.name}
                className="max-h-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoom})` }}
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            )}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-background/90 p-2 shadow-lg backdrop-blur">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="h-8 w-8"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="min-w-[4rem] text-center text-sm">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="h-8 w-8"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetZoom}
                className="h-8 w-8"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case "video":
        return (
          <div className="flex h-full items-center justify-center bg-black">
            <video
              src={fileUrl}
              controls
              autoPlay={false}
              className="max-h-full max-w-full"
            >
              Your browser does not support video playback.
            </video>
          </div>
        );

      case "audio":
        return (
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <Music className="h-24 w-24 text-muted-foreground" />
            <audio src={fileUrl} controls className="w-full max-w-md">
              Your browser does not support audio playback.
            </audio>
          </div>
        );

      case "pdf":
        return (
          <iframe
            src={fileUrl}
            className="h-full w-full border-0"
            title={file.name}
          />
        );

      case "text":
        return (
          <ScrollArea className="h-full w-full">
            <iframe
              src={fileUrl}
              className="h-full min-h-[500px] w-full border-0 bg-card p-4 font-mono text-sm"
              title={file.name}
            />
          </ScrollArea>
        );

      default:
        return (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <File className="h-24 w-24 text-muted-foreground" />
            <p className="text-lg font-medium">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              Preview not available for this file type
            </p>
            <Button onClick={handleDownload} className="mt-4">
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-[85vh] max-w-5xl flex-col gap-0 p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-3">
            {getFileIcon()}
            <div>
              <DialogTitle className="text-left text-base font-medium">
                {file.name}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)} • {formatDate(file.date_modified)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleOpenExternal}
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              title="Download"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">{renderPreview()}</div>
      </DialogContent>
    </Dialog>
  );
}

export default FilePreview;
