import { AlignLeft } from "lucide-react";

function Header() {
  return (
    <header className="flex flex-col items-center justify-center pt-8 pb-6">
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
