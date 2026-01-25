import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "@/components/theme-provider";
import {
    useColorTheme,
    colorThemes,
    radiusOptions,
    fontSizeOptions,
    type ColorTheme,
    type RadiusSize,
    type FontSize
} from "@/components/theme-color-provider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sun, Moon, Monitor, Check } from "lucide-react";

export const Route = createFileRoute("/settings/appearance")({
    component: AppearancePage
});

// CSS color preview classes for each theme
const colorPreviewClasses: Record<ColorTheme, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    amber: "bg-amber-500",
    yellow: "bg-yellow-500",
    lime: "bg-lime-500",
    green: "bg-green-500",
    emerald: "bg-emerald-500",
    teal: "bg-teal-500",
    cyan: "bg-cyan-500",
    sky: "bg-sky-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    violet: "bg-violet-500",
    purple: "bg-purple-500",
    fuchsia: "bg-fuchsia-500",
    pink: "bg-pink-500",
    rose: "bg-rose-500"
};

function AppearancePage() {
    const { theme, setTheme } = useTheme();
    const {
        colorTheme,
        setColorTheme,
        radius,
        setRadius,
        fontSize,
        setFontSize,
        compactMode,
        setCompactMode
    } = useColorTheme();

    const themes = [
        {
            value: "light",
            label: "Light",
            description: "Giao diện sáng",
            icon: Sun
        },
        {
            value: "dark",
            label: "Dark",
            description: "Giao diện tối",
            icon: Moon
        },
        {
            value: "system",
            label: "System",
            description: "Theo cài đặt hệ thống",
            icon: Monitor
        }
    ];

    return (
        <div className="space-y-8">
            {/* Theme Mode Section */}
            <div>
                <h3 className="text-lg font-medium">Chế độ giao diện</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                    Chọn chế độ sáng hoặc tối cho ứng dụng
                </p>

                <RadioGroup
                    value={theme}
                    onValueChange={(value) =>
                        setTheme(value as "light" | "dark" | "system")
                    }
                    className="grid gap-3">
                    {themes.map((t) => (
                        <Label
                            key={t.value}
                            htmlFor={t.value}
                            className={`hover:bg-accent flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                                theme === t.value
                                    ? "border-primary bg-accent"
                                    : "border-border"
                            }`}>
                            <RadioGroupItem
                                value={t.value}
                                id={t.value}
                            />
                            <t.icon className="h-5 w-5" />
                            <div className="flex-1">
                                <p className="font-medium">{t.label}</p>
                                <p className="text-muted-foreground text-sm">
                                    {t.description}
                                </p>
                            </div>
                        </Label>
                    ))}
                </RadioGroup>
            </div>

            {/* Color Theme Section */}
            <div>
                <h3 className="text-lg font-medium">Màu chủ đạo</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                    Chọn màu chủ đạo cho giao diện ứng dụng
                </p>

                <div className="grid grid-cols-6 gap-3 sm:grid-cols-9">
                    {(Object.keys(colorThemes) as ColorTheme[]).map((key) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setColorTheme(key)}
                            className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110 ${colorPreviewClasses[key]} ${
                                colorTheme === key
                                    ? "ring-offset-background ring-2 ring-offset-2"
                                    : ""
                            }`}
                            title={colorThemes[key].name}>
                            {colorTheme === key && (
                                <Check className="h-5 w-5 text-white drop-shadow-md" />
                            )}
                        </button>
                    ))}
                </div>

                <p className="text-muted-foreground mt-3 text-sm">
                    Màu hiện tại:{" "}
                    <span className="text-foreground font-medium">
                        {colorThemes[colorTheme].name}
                    </span>
                </p>
            </div>

            {/* Border Radius Section */}
            <div>
                <h3 className="text-lg font-medium">Bo góc</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                    Điều chỉnh độ bo góc của các thành phần
                </p>

                <div className="flex flex-wrap gap-2">
                    {(Object.keys(radiusOptions) as RadiusSize[]).map((key) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setRadius(key)}
                            className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
                                radius === key
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border hover:bg-accent"
                            }`}>
                            <div
                                className={`h-4 w-4 border-2 border-current ${
                                    key === "none"
                                        ? "rounded-none"
                                        : key === "sm"
                                          ? "rounded-sm"
                                          : key === "md"
                                            ? "rounded-md"
                                            : key === "lg"
                                              ? "rounded-lg"
                                              : "rounded-full"
                                }`}
                            />
                            <span className="text-sm font-medium">
                                {radiusOptions[key].name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Font Size Section */}
            <div>
                <h3 className="text-lg font-medium">Cỡ chữ</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                    Điều chỉnh kích thước chữ hiển thị
                </p>

                <div className="flex flex-wrap gap-2">
                    {(Object.keys(fontSizeOptions) as FontSize[]).map((key) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setFontSize(key)}
                            className={`rounded-lg border px-4 py-2 transition-colors ${
                                fontSize === key
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border hover:bg-accent"
                            }`}>
                            <span
                                className={`font-medium ${
                                    key === "sm"
                                        ? "text-xs"
                                        : key === "md"
                                          ? "text-sm"
                                          : "text-base"
                                }`}>
                                {fontSizeOptions[key].name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Compact Mode Section */}
            <div>
                <h3 className="text-lg font-medium">Chế độ gọn</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                    Giảm khoảng cách để hiển thị nhiều nội dung hơn
                </p>

                <button
                    type="button"
                    onClick={() => setCompactMode(!compactMode)}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                        compactMode
                            ? "border-primary bg-primary/10"
                            : "border-border hover:bg-accent"
                    }`}>
                    <div
                        className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
                            compactMode ? "bg-primary" : "bg-muted"
                        }`}>
                        <div
                            className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${
                                compactMode ? "translate-x-4" : "translate-x-0"
                            }`}
                        />
                    </div>
                    <span className="text-sm font-medium">
                        {compactMode ? "Bật" : "Tắt"}
                    </span>
                </button>
            </div>
        </div>
    );
}
