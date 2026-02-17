import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/theme/ThemeProvider';

export default function Header() {
    const { totalItems, openCart } = useCart();
    const { currentTheme, setTheme, availableThemes } = useTheme();

    const toggleTheme = () => {
        const newTheme = currentTheme?.name === 'default' ? 'luxury' : 'default';
        setTheme(newTheme);
    };

    return (
        <header className="sticky top-0 z-50 bg-surface shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        Hessy
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-text hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link href="/products" className="text-text hover:text-primary transition-colors">
                            Products
                        </Link>
                        <Link href="/admin" className="text-text hover:text-primary transition-colors">
                            Admin
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-background transition-colors"
                            title={`Switch to ${currentTheme?.name === 'default' ? 'Luxury' : 'Default'} theme`}
                        >
                            {currentTheme?.name === 'default' ? '🌙' : '☀️'}
                        </button>

                        {/* Cart Button */}
                        <button
                            onClick={openCart}
                            className="relative p-2 rounded-lg hover:bg-background transition-colors"
                            aria-label="Shopping cart"
                        >
                            <svg
                                className="w-6 h-6 text-text"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
