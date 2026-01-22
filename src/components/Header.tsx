import { AlignLeft } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <AlignLeft className="h-8 w-8 text-primary" />
        <span className="text-3xl font-bold tracking-tight text-primary">
          Everything
        </span>
        <span className="text-3xl font-bold text-blue-500">.</span>
      </div>
    </header>
  );
}

export default Header;
