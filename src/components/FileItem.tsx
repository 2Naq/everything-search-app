import {
    Folder,
    FileText,
    Image,
    Video,
    Music,
    Archive,
    Code,
    Play,
    Settings,
    File
} from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import type {
    FileItem as FileItemType,
    FileType
} from "@/types/everything.types";
import {
    getFileExtension,
    getFileType,
    formatFileSize,
    formatDate
} from "@/utils/file.utils";

interface FileItemProps {
    item: FileItemType;
    onOpen?: (item: FileItemType) => void;
}

const iconMap: Record<FileType, React.ReactNode> = {
    folder: <Folder className="h-5 w-5 text-amber-500" />,
    pdf: <FileText className="h-5 w-5 text-red-500" />,
    document: <FileText className="h-5 w-5 text-blue-500" />,
    text: <FileText className="text-muted-foreground h-5 w-5" />,
    spreadsheet: <FileText className="h-5 w-5 text-green-500" />,
    presentation: <FileText className="h-5 w-5 text-orange-500" />,
    image: <Image className="h-5 w-5 text-purple-500" />,
    video: <Video className="h-5 w-5 text-pink-500" />,
    audio: <Music className="h-5 w-5 text-cyan-500" />,
    archive: <Archive className="h-5 w-5 text-yellow-600" />,
    code: <Code className="h-5 w-5 text-emerald-500" />,
    executable: <Play className="h-5 w-5 text-blue-600" />,
    system: <Settings className="h-5 w-5 text-gray-500" />,
    settings: <Settings className="h-5 w-5 text-teal-500" />,
    log: <FileText className="h-5 w-5 text-gray-400" />,
    file: <File className="text-muted-foreground h-5 w-5" />
};

function FileItem({ item, onOpen }: FileItemProps) {
    const isFolder = item.type === "folder" || !item.size;
    const extension = isFolder ? "" : getFileExtension(item.name);
    const fileType: FileType = isFolder ? "folder" : getFileType(extension);

    const handleClick = () => {
        if (onOpen) {
            onOpen(item);
        }
    };

    return (
        <TableRow
            onClick={handleClick}
            className="hover:bg-muted/50 cursor-pointer transition-colors">
            <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                    {iconMap[fileType]}
                    <span className="truncate">{item.name}</span>
                </div>
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                <span
                    className="block max-w-[300px] truncate"
                    title={item.path || ""}>
                    {item.path || "--"}
                </span>
            </TableCell>
            <TableCell className="text-muted-foreground text-right">
                {formatFileSize(item.size)}
            </TableCell>
            <TableCell className="text-muted-foreground hidden text-right lg:table-cell">
                {formatDate(item.date_modified)}
            </TableCell>
        </TableRow>
    );
}

export default FileItem;
