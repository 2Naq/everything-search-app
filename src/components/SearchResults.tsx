import { AlertCircle, Search, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import FileItem from "./FileItem";
import type { FileItem as FileItemType } from "@/types/everything.types";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow
} from "@/components/ui/table";

interface SortConfig {
    column: string;
    ascending: boolean;
}

interface SearchResultsProps {
    results: FileItemType[];
    totalResults: number;
    isLoading: boolean;
    error: string | null;
    sortConfig: SortConfig;
    onSort: (column: string) => void;
    onOpen?: (item: FileItemType) => void;
    viewMode?: "search" | "browse";
}

function SearchResults({
    results,
    totalResults,
    isLoading,
    error,
    sortConfig,
    onSort,
    onOpen
}: SearchResultsProps) {
    if (error) {
        return (
            <Alert
                variant="destructive"
                className="mx-auto max-w-2xl">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Connection Error</AlertTitle>
                <AlertDescription>
                    Could not connect to Everything HTTP Server. Make sure
                    Everything is running and HTTP server is enabled on port{" "}
                    {import.meta.env.VITE_APP_API_URL}.
                </AlertDescription>
            </Alert>
        );
    }

    if (isLoading && (!results || results.length === 0)) {
        return (
            <div className="text-muted-foreground flex flex-col items-center justify-center py-16">
                <Loader2 className="mb-4 h-10 w-10 animate-spin" />
                <p className="text-lg">Searching...</p>
            </div>
        );
    }

    if (!results || results.length === 0) {
        return (
            <div className="text-muted-foreground flex flex-col items-center justify-center py-16">
                <Search className="mb-4 h-12 w-12" />
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-sm">Try a different search term</p>
            </div>
        );
    }

    const getSortIcon = (column: string) => {
        if (sortConfig.column !== column) return null;
        return sortConfig.ascending ? (
            <ArrowUp className="ml-1 inline h-4 w-4" />
        ) : (
            <ArrowDown className="ml-1 inline h-4 w-4" />
        );
    };

    const HeaderButton = ({
        column,
        children,
        className = ""
    }: {
        column: string;
        children: React.ReactNode;
        className?: string;
    }) => (
        <TableHead
            onClick={() => onSort(column)}
            className={`hover:bg-muted/50 cursor-pointer transition-colors select-none ${className}`}>
            <span className="flex items-center">
                {children}
                {getSortIcon(column)}
            </span>
        </TableHead>
    );

    return (
        <div className="w-full">
            <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-muted-foreground text-sm">
                    {totalResults.toLocaleString()} results
                </span>
            </div>

            <div className="bg-card overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <HeaderButton column="name">NAME</HeaderButton>
                            <HeaderButton
                                column="path"
                                className="hidden md:table-cell">
                                PATH
                            </HeaderButton>
                            <HeaderButton
                                column="size"
                                className="text-right">
                                SIZE
                            </HeaderButton>
                            <HeaderButton
                                column="date_modified"
                                className="hidden text-right lg:table-cell">
                                DATE MODIFIED
                            </HeaderButton>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((item, index) => (
                            <FileItem
                                key={`${item.path}-${item.name}-${index}`}
                                item={item}
                                onOpen={onOpen}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default SearchResults;
