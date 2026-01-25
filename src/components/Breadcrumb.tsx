import { Home, ChevronRight } from "lucide-react";
import {
    Breadcrumb as BreadcrumbRoot,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
    currentPath: string | null;
    onNavigate: (path: string | null) => void;
}

interface BreadcrumbCompProps {
    segments: string[];
    handleClick: (index: number) => void;
    handleHomeClick: () => void;
    classes?: string;
}

function BreadcrumbComp({
    segments,
    handleClick,
    handleHomeClick,
    classes
}: BreadcrumbCompProps) {
    return (
        <BreadcrumbRoot className={cn("mb-4 px-1", classes)}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        onClick={handleHomeClick}
                        className="hover:text-foreground flex cursor-pointer items-center gap-1">
                        <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                        </BreadcrumbSeparator>
                        {index === segments.length - 1 ? (
                            <BreadcrumbPage className="text-foreground font-medium">
                                {segment}
                            </BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink
                                onClick={() => handleClick(index)}
                                className="hover:text-foreground cursor-pointer">
                                {segment}
                            </BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </BreadcrumbRoot>
    );
}

function Breadcrumb({ currentPath, onNavigate }: BreadcrumbProps) {
    if (!currentPath) return null;

    const segments = currentPath.split("\\").filter(Boolean);

    const handleClick = (index: number) => {
        const newPath = segments.slice(0, index + 1).join("\\");
        onNavigate(newPath);
    };

    const handleHomeClick = () => {
        onNavigate(null);
    };

    return (
        <BreadcrumbComp
            segments={segments}
            handleClick={handleClick}
            handleHomeClick={handleHomeClick}
        />
    );
}

export function BreadcrumbBrowser({
    currentPath,
    onNavigate
}: BreadcrumbProps) {
    if (!currentPath) return null;

    const segments = currentPath.split("/").filter(Boolean);

    const handleClick = (index: number) => {
        const newPath = "/" + segments.slice(0, index + 1).join("/");
        onNavigate(newPath);
    };

    const handleHomeClick = () => {
        onNavigate(null);
    };

    return (
        <BreadcrumbComp
            segments={segments}
            handleClick={handleClick}
            handleHomeClick={handleHomeClick}
            classes={"m-0 px-1"}
        />
    );
}

export default Breadcrumb;
