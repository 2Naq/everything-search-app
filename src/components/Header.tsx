import { AlignLeft } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <AlignLeft className="h-8 w-8 text-primary" />
        <span className="text-3xl font-bold tracking-tight bg-linear-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
          Everything
        </span>
        <span className="text-3xl font-bold bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          .
        </span>
      </div>
    </header>
  );
}

export default Header;
