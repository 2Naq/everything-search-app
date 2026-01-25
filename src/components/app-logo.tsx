import { cn } from "@/lib/utils";

interface AppLogoProps {
    className?: string;
    isShowSubTitle?: boolean;
}

export default function AppLogo({
    className,
    isShowSubTitle = false
}: AppLogoProps) {
    return (
        <div className="flex flex-col">
            <>
                <h2
                    className={cn(
                        "from-primary w-fit bg-linear-to-r to-yellow-500 bg-clip-text text-2xl font-bold text-transparent",
                        className
                    )}>
                    Extention Pro+
                </h2>
                {isShowSubTitle && (
                    <p className="text-muted-foreground text-xs">
                        Manage system extention
                    </p>
                )}
            </>
        </div>
    );
}
