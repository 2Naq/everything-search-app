import { useState, useEffect, useRef } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

function SearchBar({ onSearch, isLoading }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, onSearch]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full` relative">
            <div className="relative flex w-full items-center">
                <Search className="text-muted-foreground absolute left-4 h-5 w-5" />
                <Input
                    ref={inputRef}
                    type="text"
                    className="border-input bg-card h-10 w-full rounded-lg pr-12 pl-10 text-sm md:h-12 md:pr-24 md:pl-12 md:text-base"
                    placeholder="Tìm kiếm file, tài liệu..."
                    value={query}
                    onChange={handleChange}
                />
                <div className="absolute right-3 flex items-center gap-1">
                    {isLoading && (
                        <Loader2 className="text-muted-foreground mr-2 h-4 w-4 animate-spin" />
                    )}
                    <div className="hidden md:block">
                        <Kbd>CTRL</Kbd>
                        <Kbd>K</Kbd>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SearchBar;
