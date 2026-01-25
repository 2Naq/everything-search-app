import {
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    resultsPerPage: number;
    onResultsPerPageChange: (perPage: number) => void;
}

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    resultsPerPage,
    onResultsPerPageChange
}: PaginationProps) {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <span>Results per page:</span>
                <Select
                    value={resultsPerPage.toString()}
                    onValueChange={(value) =>
                        onResultsPerPageChange(Number(value))
                    }>
                    <SelectTrigger className="w-[70px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8">
                    <ChevronFirst className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {startPage > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onPageChange(1)}
                            className="h-8 w-8">
                            1
                        </Button>
                        {startPage > 2 && (
                            <span className="text-muted-foreground px-1">
                                ...
                            </span>
                        )}
                    </>
                )}

                {pages.map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? "default" : "ghost"}
                        size="icon"
                        onClick={() => onPageChange(page)}
                        className="h-8 w-8">
                        {page}
                    </Button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && (
                            <span className="text-muted-foreground px-1">
                                ...
                            </span>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onPageChange(totalPages)}
                            className="h-8 w-8">
                            {totalPages}
                        </Button>
                    </>
                )}

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8">
                    <ChevronLast className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default Pagination;
