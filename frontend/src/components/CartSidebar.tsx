import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartSidebar() {
    const { items, removeItem, updateQuantity, totalPrice, isCartOpen, closeCart } = useCart();

    // Close cart on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCart();
        };

        if (isCartOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen, closeCart]);

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-surface shadow-2xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-background">
                    <h2 className="text-2xl font-bold font-heading">Shopping Cart</h2>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        aria-label="Close cart"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-lg text-text-secondary mb-4">Your cart is empty</p>
                            <button
                                onClick={closeCart}
                                className="text-primary hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="bg-background rounded-lg p-4">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 bg-surface rounded-md flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl">📦</span>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/products/${item.slug}`}
                                                onClick={closeCart}
                                                className="font-semibold hover:text-primary transition-colors block truncate"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-text-secondary capitalize">{item.category}</p>
                                            <p className="text-lg font-bold text-primary mt-1">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-text-secondary hover:text-red-500 transition-colors self-start"
                                            aria-label="Remove item"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 mt-3">
                                        <span className="text-sm text-text-secondary">Quantity:</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-md bg-surface hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-md bg-surface hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="ml-auto font-semibold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-background p-6 space-y-4">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between text-lg">
                            <span className="font-semibold">Subtotal:</span>
                            <span className="text-2xl font-bold text-primary">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>

                        {/* Checkout Button */}
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="block w-full py-4 bg-primary text-white text-center rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                        >
                            Proceed to Checkout
                        </Link>

                        {/* Continue Shopping */}
                        <button
                            onClick={closeCart}
                            className="block w-full py-3 text-text-secondary hover:text-primary transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
