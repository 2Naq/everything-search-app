import { Home, ChevronRight } from "lucide-react";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps {
  currentPath: string | null;
  onNavigate: (path: string | null) => void;
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
    <BreadcrumbRoot className="mb-4 px-1">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={handleHomeClick}
            className="flex cursor-pointer items-center gap-1 hover:text-foreground"
          >
            <Home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            {index === segments.length - 1 ? (
              <BreadcrumbPage className="font-medium text-primary">
                {segment}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink
                onClick={() => handleClick(index)}
                className="cursor-pointer hover:text-foreground"
              >
                {segment}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}

export default Breadcrumb;
