'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, defaultTheme, luxuryTheme } from './themes';

interface ThemeContextType {
    theme: Theme;
    setTheme: (themeName: string) => void;
    availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes: Record<string, Theme> = {
    default: defaultTheme,
    luxury: luxuryTheme,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(themes[savedTheme]);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const handleSetTheme = (themeName: string) => {
        if (themes[themeName]) {
            setCurrentTheme(themes[themeName]);
            localStorage.setItem('theme', themeName);
            document.documentElement.setAttribute('data-theme', themeName);
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: currentTheme,
                setTheme: handleSetTheme,
                availableThemes: Object.values(themes),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
