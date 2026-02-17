export interface Theme {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        surface: string;
        text: string;
        textSecondary: string;
    };
    fonts: {
        sans: string;
        heading: string;
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}

export const defaultTheme: Theme = {
    name: 'default',
    colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        background: '#ffffff',
        surface: '#f9fafb',
        text: '#111827',
        textSecondary: '#6b7280',
    },
    fonts: {
        sans: "'Inter', system-ui, sans-serif",
        heading: "'Inter', system-ui, sans-serif",
    },
    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    },
};

export const luxuryTheme: Theme = {
    name: 'luxury',
    colors: {
        primary: '#d4af37',
        secondary: '#1a1a1a',
        accent: '#c9a961',
        background: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#ffffff',
        textSecondary: '#a0a0a0',
    },
    fonts: {
        sans: "'Inter', system-ui, sans-serif",
        heading: "'Playfair Display', serif",
    },
    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    },
};
