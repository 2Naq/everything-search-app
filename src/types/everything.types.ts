// Everything API Type Definitions

export interface SearchOptions {
  offset?: number;
  count?: number;
  sort?: string;
  ascending?: number;
  pathColumn?: number;
  sizeColumn?: number;
  dateModifiedColumn?: number;
}

export interface BrowseOptions {
  offset?: number;
  count?: number;
  sort?: string;
  ascending?: number;
}

export interface FileItem {
  name: string;
  type?: "folder" | "file";
  path?: string;
  size?: number | string;
  date_modified?: number | string;
}

export interface SearchResult {
  results: FileItem[];
  totalResults: number;
}

export type FileType =
  | "folder"
  | "pdf"
  | "document"
  | "text"
  | "spreadsheet"
  | "presentation"
  | "image"
  | "video"
  | "audio"
  | "archive"
  | "code"
  | "executable"
  | "system"
  | "settings"
  | "log"
  | "file";
