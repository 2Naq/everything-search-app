// Everything HTTP Server API Service
// Using Vite proxy to bypass CORS
const API_BASE_URL = "/api";

/**
 * Search files using Everything HTTP Server API
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Object>} Search results
 */
export async function searchFiles(query, options = {}) {
  const {
    offset = 0,
    count = 50,
    sort = "name",
    ascending = 1,
    pathColumn = 1,
    sizeColumn = 1,
    dateModifiedColumn = 1,
  } = options;

  const params = new URLSearchParams({
    search: query,
    j: "1", // JSON response
    o: offset.toString(),
    c: count.toString(),
    path_column: pathColumn.toString(),
    size_column: sizeColumn.toString(),
    date_modified_column: dateModifiedColumn.toString(),
    sort: sort,
    ascending: ascending.toString(),
  });

  try {
    const response = await fetch(`${API_BASE_URL}/?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size
 */
export function formatFileSize(bytes) {
  if (bytes === undefined || bytes === null || bytes === "") return "--";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = parseInt(bytes, 10);
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
}

/**
 * Format date to readable format
 * @param {number|string} dateValue - Date value from Everything API
 * @returns {string} Formatted date
 */
export function formatDate(dateValue) {
  if (!dateValue) return "--";

  try {
    let date;

    // Everything HTTP returns date as Windows FILETIME (100-nanosecond intervals since Jan 1, 1601)
    // or as a large integer. We need to convert it properly.
    const numValue =
      typeof dateValue === "string" ? parseInt(dateValue, 10) : dateValue;

    if (isNaN(numValue)) return "--";

    // Check if it's a Windows FILETIME (very large number > year 3000 as unix timestamp)
    if (numValue > 32503680000) {
      // Convert Windows FILETIME to JavaScript Date
      // FILETIME is 100-nanosecond intervals since January 1, 1601
      // JavaScript Date uses milliseconds since January 1, 1970
      // Difference between 1601 and 1970 is 11644473600 seconds
      const FILETIME_TO_UNIX_EPOCH = 11644473600000n;
      const ticksPerMs = 10000n;
      const jsTimestamp = Number(
        BigInt(numValue) / ticksPerMs - FILETIME_TO_UNIX_EPOCH,
      );
      date = new Date(jsTimestamp);
    } else {
      // Assume Unix timestamp (seconds since 1970)
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
  } catch (e) {
    return "--";
  }
}

/**
 * Get file extension from filename
 * @param {string} filename - File name
 * @returns {string} File extension
 */
export function getFileExtension(filename) {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

/**
 * Get file type category from extension
 * @param {string} extension - File extension
 * @returns {string} File type category
 */
export function getFileType(extension) {
  const types = {
    // Documents
    pdf: "pdf",
    doc: "document",
    docx: "document",
    txt: "text",
    rtf: "document",
    xls: "spreadsheet",
    xlsx: "spreadsheet",
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
    ini: "settings",
    cfg: "settings",
    log: "log",
  };

  return types[extension] || "file";
}
