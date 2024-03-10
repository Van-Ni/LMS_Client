// # fix : solving client component error
"use client"

// #pakage: usage next-themes
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemeProvider >{children}</NextThemeProvider>;
}
