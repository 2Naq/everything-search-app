import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

const themes = ['light', 'dark'] as const;

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const cycleTheme = () => {
        const currentIndex = themes.indexOf(theme as (typeof themes)[number]);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={cycleTheme}
            title={`Current: ${theme}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4.5">
                <path
                    d="M0 0h24v24H0z"
                    stroke="none"
                />
                <path d="M3 12a9 9 0 1018 0 9 9 0 10-18 0M12 3v18M12 9l4.65-4.65M12 14.3l7.37-7.37M12 19.6l8.85-8.85" />
            </svg>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
