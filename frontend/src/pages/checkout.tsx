import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const handleCheckout = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setOrderComplete(true);
        clearCart();
    };

    if (orderComplete) {
        return (
            <>
                <Head>
                    <title>Order Complete - Hessy</title>
                </Head>

                <main className="min-h-screen bg-background flex items-center justify-center">
                    <div className="max-w-md w-full mx-4">
                        <div className="bg-surface rounded-xl p-8 text-center">
                            <div className="text-6xl mb-4">✅</div>
                            <h1 className="text-3xl font-bold mb-4 font-heading">Order Complete!</h1>
                            <p className="text-text-secondary mb-6">
                                Thank you for your purchase. Your order has been confirmed.
                            </p>
                            <Link
                                href="/products"
                                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    if (items.length === 0) {
        return (
            <>
                <Head>
                    <title>Checkout - Hessy</title>
                </Head>

                <main className="min-h-screen bg-background flex items-center justify-center">
                    <div className="max-w-md w-full mx-4">
                        <div className="bg-surface rounded-xl p-8 text-center">
                            <div className="text-6xl mb-4">🛒</div>
                            <h1 className="text-3xl font-bold mb-4 font-heading">Your cart is empty</h1>
                            <p className="text-text-secondary mb-6">
                                Add some products to your cart before checking out.
                            </p>
                            <Link
                                href="/products"
                                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Checkout - Hessy</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className="min-h-screen bg-background py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8 font-heading">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="bg-surface rounded-xl p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 pb-4 border-b border-background last:border-0">
                                            <div className="w-16 h-16 bg-background rounded-md flex items-center justify-center flex-shrink-0">
                                                <span className="text-2xl">📦</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-sm text-text-secondary capitalize">{item.category}</p>
                                                <p className="text-sm text-text-secondary">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-primary">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Information */}
                            <div className="bg-surface rounded-xl p-6">
                                <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                            placeholder="123 Main St"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">City</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">ZIP Code</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                                placeholder="10001"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Total */}
                        <div className="lg:col-span-1">
                            <div className="bg-surface rounded-xl p-6 sticky top-20">
                                <h2 className="text-2xl font-semibold mb-4">Order Total</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Subtotal</span>
                                        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Shipping</span>
                                        <span className="font-semibold">$10.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-secondary">Tax</span>
                                        <span className="font-semibold">${(totalPrice * 0.08).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-background pt-3">
                                        <div className="flex justify-between text-lg">
                                            <span className="font-semibold">Total</span>
                                            <span className="font-bold text-primary text-2xl">
                                                ${(totalPrice + 10 + totalPrice * 0.08).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                                >
                                    {isProcessing ? 'Processing...' : 'Place Order'}
                                </button>

                                <Link
                                    href="/products"
                                    className="block text-center text-text-secondary hover:text-primary transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
