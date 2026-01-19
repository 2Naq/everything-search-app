// File Utility Functions
import type { FileType } from "@/types/everything.types";

/**
 * Format file size to human readable format
 */
export function formatFileSize(
  bytes: number | string | undefined | null,
): string {
  if (bytes === undefined || bytes === null || bytes === "") return "--";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
  let unitIndex = 0;

  if (isNaN(size)) return "--";

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
}

/**
 * Format date to readable format
 */
export function formatDate(
  dateValue: number | string | undefined | null,
): string {
  if (!dateValue) return "--";

  try {
    let date: Date;

    const numValue =
      typeof dateValue === "string" ? parseInt(dateValue, 10) : dateValue;

    if (isNaN(numValue)) return "--";

    if (numValue > 32503680000) {
      // Windows FILETIME format
      const FILETIME_TO_UNIX_EPOCH = 11644473600000n;
      const ticksPerMs = 10000n;
      const jsTimestamp = Number(
        BigInt(numValue) / ticksPerMs - FILETIME_TO_UNIX_EPOCH,
      );
      date = new Date(jsTimestamp);
    } else {
      date = new Date(numValue * 1000);
    }

    if (isNaN(date.getTime())) return "--";

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "--";
  }
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? (parts.pop()?.toLowerCase() ?? "") : "";
}

/**
 * Get file type category from extension
 */
export function getFileType(extension: string): FileType {
  const types: Record<string, FileType> = {
    // Documents
    pdf: "pdf",
    doc: "document",
    docx: "document",
    txt: "text",
    rtf: "document",
    // Spreadsheets
    xls: "spreadsheet",
    xlsx: "spreadsheet",
    // Presentations
    ppt: "presentation",
    pptx: "presentation",
    // Images
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    bmp: "image",
    svg: "image",
    webp: "image",
    ico: "image",
    // Videos
    mp4: "video",
    avi: "video",
    mkv: "video",
    mov: "video",
    wmv: "video",
    flv: "video",
    webm: "video",
    // Audio
    mp3: "audio",
    wav: "audio",
    flac: "audio",
    aac: "audio",
    ogg: "audio",
    wma: "audio",
    // Archives
    zip: "archive",
    rar: "archive",
    "7z": "archive",
    tar: "archive",
    gz: "archive",
    // Code
    js: "code",
    jsx: "code",
    ts: "code",
    tsx: "code",
    html: "code",
    css: "code",
    json: "code",
    py: "code",
    java: "code",
    cpp: "code",
    c: "code",
    cs: "code",
    php: "code",
    rb: "code",
    go: "code",
    rs: "code",
    sql: "code",
    // Executables
    exe: "executable",
    msi: "executable",
    bat: "executable",
    cmd: "executable",
    ps1: "executable",
    // System
    dll: "system",
    sys: "system",
    // Settings
    ini: "settings",
    cfg: "settings",
    // Logs
    log: "log",
  };

  return types[extension] || "file";
}
