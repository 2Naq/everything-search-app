import { createContext, useContext, useEffect, useState } from "react";

// Color themes with OKLCH values - matching Shadcn color format
export const colorThemes = {
  red: {
    name: "Red",
    primary: "oklch(0.586 0.253 17.585)",
    ring: "oklch(0.712 0.194 13.428)",
    sidebarPrimary: "oklch(0.586 0.253 17.585)",
  },
  orange: {
    name: "Orange",
    primary: "oklch(0.705 0.191 47.604)",
    ring: "oklch(0.705 0.191 47.604)",
    sidebarPrimary: "oklch(0.705 0.191 47.604)",
  },
  amber: {
    name: "Amber",
    primary: "oklch(0.769 0.188 70.08)",
    ring: "oklch(0.769 0.188 70.08)",
    sidebarPrimary: "oklch(0.769 0.188 70.08)",
  },
  yellow: {
    name: "Yellow",
    primary: "oklch(0.852 0.199 91.936)",
    ring: "oklch(0.852 0.199 91.936)",
    sidebarPrimary: "oklch(0.852 0.199 91.936)",
  },
  lime: {
    name: "Lime",
    primary: "oklch(0.768 0.233 130.85)",
    ring: "oklch(0.768 0.233 130.85)",
    sidebarPrimary: "oklch(0.768 0.233 130.85)",
  },
  green: {
    name: "Green",
    primary: "oklch(0.627 0.194 149.214)",
    ring: "oklch(0.627 0.194 149.214)",
    sidebarPrimary: "oklch(0.627 0.194 149.214)",
  },
  emerald: {
    name: "Emerald",
    primary: "oklch(0.648 0.15 163.255)",
    ring: "oklch(0.648 0.15 163.255)",
    sidebarPrimary: "oklch(0.648 0.15 163.255)",
  },
  teal: {
    name: "Teal",
    primary: "oklch(0.627 0.129 184.704)",
    ring: "oklch(0.627 0.129 184.704)",
    sidebarPrimary: "oklch(0.627 0.129 184.704)",
  },
  cyan: {
    name: "Cyan",
    primary: "oklch(0.715 0.143 215.221)",
    ring: "oklch(0.715 0.143 215.221)",
    sidebarPrimary: "oklch(0.715 0.143 215.221)",
  },
  sky: {
    name: "Sky",
    primary: "oklch(0.685 0.169 237.323)",
    ring: "oklch(0.685 0.169 237.323)",
    sidebarPrimary: "oklch(0.685 0.169 237.323)",
  },
  blue: {
    name: "Blue",
    primary: "oklch(0.623 0.214 259.815)",
    ring: "oklch(0.623 0.214 259.815)",
    sidebarPrimary: "oklch(0.623 0.214 259.815)",
  },
  indigo: {
    name: "Indigo",
    primary: "oklch(0.585 0.233 277.117)",
    ring: "oklch(0.585 0.233 277.117)",
    sidebarPrimary: "oklch(0.585 0.233 277.117)",
  },
  violet: {
    name: "Violet",
    primary: "oklch(0.606 0.25 292.717)",
    ring: "oklch(0.606 0.25 292.717)",
    sidebarPrimary: "oklch(0.606 0.25 292.717)",
  },
  purple: {
    name: "Purple",
    primary: "oklch(0.627 0.265 303.9)",
    ring: "oklch(0.627 0.265 303.9)",
    sidebarPrimary: "oklch(0.627 0.265 303.9)",
  },
  fuchsia: {
    name: "Fuchsia",
    primary: "oklch(0.667 0.295 328.363)",
    ring: "oklch(0.667 0.295 328.363)",
    sidebarPrimary: "oklch(0.667 0.295 328.363)",
  },
  pink: {
    name: "Pink",
    primary: "oklch(0.718 0.202 349.761)",
    ring: "oklch(0.718 0.202 349.761)",
    sidebarPrimary: "oklch(0.718 0.202 349.761)",
  },
  rose: {
    name: "Rose",
    primary: "oklch(0.645 0.246 16.439)",
    ring: "oklch(0.645 0.246 16.439)",
    sidebarPrimary: "oklch(0.645 0.246 16.439)",
  },
};

export type ColorTheme = keyof typeof colorThemes;
export type RadiusSize = "none" | "sm" | "md" | "lg" | "xl";
export type FontSize = "sm" | "md" | "lg";

export const radiusOptions: Record<
  RadiusSize,
  { name: string; value: string }
> = {
  none: { name: "Sharp", value: "0rem" },
  sm: { name: "Small", value: "0.3rem" },
  md: { name: "Medium", value: "0.5rem" },
  lg: { name: "Large", value: "0.75rem" },
  xl: { name: "Full", value: "1rem" },
};

export const fontSizeOptions: Record<
  FontSize,
  { name: string; scale: number }
> = {
  sm: { name: "Small", scale: 0.875 },
  md: { name: "Medium", scale: 1 },
  lg: { name: "Large", scale: 1.125 },
};

type AppearanceState = {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  radius: RadiusSize;
  setRadius: (radius: RadiusSize) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  compactMode: boolean;
  setCompactMode: (compact: boolean) => void;
};

const ColorThemeContext = createContext<AppearanceState>({
  colorTheme: "red",
  setColorTheme: () => null,
  radius: "md",
  setRadius: () => null,
  fontSize: "md",
  setFontSize: () => null,
  compactMode: false,
  setCompactMode: () => null,
});

export function ColorThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const stored = localStorage.getItem("color-theme");
    return (stored as ColorTheme) || "red";
  });

  const [radius, setRadiusState] = useState<RadiusSize>(() => {
    const stored = localStorage.getItem("radius-size");
    return (stored as RadiusSize) || "md";
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const stored = localStorage.getItem("font-size");
    return (stored as FontSize) || "md";
  });

  const [compactMode, setCompactModeState] = useState<boolean>(() => {
    const stored = localStorage.getItem("compact-mode");
    return stored === "true";
  });

  useEffect(() => {
    const theme = colorThemes[colorTheme];
    const root = document.documentElement;

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--ring", theme.ring);
    root.style.setProperty("--sidebar-primary", theme.sidebarPrimary);
  }, [colorTheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--radius", radiusOptions[radius].value);
  }, [radius]);

  useEffect(() => {
    const root = document.documentElement;
    const scale = fontSizeOptions[fontSize].scale;
    root.style.fontSize = `${scale * 16}px`;
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (compactMode) {
      root.classList.add("compact");
    } else {
      root.classList.remove("compact");
    }
  }, [compactMode]);

  const setColorTheme = (theme: ColorTheme) => {
    localStorage.setItem("color-theme", theme);
    setColorThemeState(theme);
  };

  const setRadius = (size: RadiusSize) => {
    localStorage.setItem("radius-size", size);
    setRadiusState(size);
  };

  const setFontSize = (size: FontSize) => {
    localStorage.setItem("font-size", size);
    setFontSizeState(size);
  };

  const setCompactMode = (compact: boolean) => {
    localStorage.setItem("compact-mode", String(compact));
    setCompactModeState(compact);
  };

  return (
    <ColorThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        radius,
        setRadius,
        fontSize,
        setFontSize,
        compactMode,
        setCompactMode,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};
