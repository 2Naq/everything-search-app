import { AlignLeft } from "lucide-react";

function Header() {
    return (
        <header className="flex items-center justify-center">
            <div className="flex items-center gap-2">
                <AlignLeft className="text-primary h-8 w-8" />
                <span className="from-primary bg-linear-to-r to-yellow-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                    Everything
                </span>
                <span className="bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
                    .
                </span>
            </div>
        </header>
    );
}

export default Header;
