import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '@/theme/ThemeProvider';

export default function Home() {
    const { setTheme, availableThemes } = useTheme();

    return (
        <>
            <Head>
                <title>Hessy - Modern E-commerce Platform</title>
                <meta name="description" content="Experience the future of online shopping" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />

                    <div className="relative container mx-auto px-4 py-24 md:py-32">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                Welcome to Hessy
                            </h1>
                            <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
                                Experience the next generation of e-commerce with powerful features,
                                beautiful design, and seamless shopping.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href="/products"
                                    className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg"
                                >
                                    Browse Products
                                </Link>
                                <button
                                    onClick={() => {
                                        const currentTheme = availableThemes.find(t => t.name === 'luxury') || availableThemes[0];
                                        setTheme(currentTheme.name === 'luxury' ? 'default' : 'luxury');
                                    }}
                                    className="px-8 py-4 bg-surface text-text border-2 border-primary rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-all hover:scale-105"
                                >
                                    Try Luxury Theme
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-surface">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-16 font-heading">
                            Platform Features
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Feature 1 */}
                            <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-4">🛍️</div>
                                <h3 className="text-2xl font-semibold mb-3">Product Management</h3>
                                <p className="text-text-secondary">
                                    Full product catalog with variants, inventory tracking, and real-time stock updates.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-4">💳</div>
                                <h3 className="text-2xl font-semibold mb-3">Secure Payments</h3>
                                <p className="text-text-secondary">
                                    Integrated with Stripe for secure credit card and Apple Pay transactions.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-4">📊</div>
                                <h3 className="text-2xl font-semibold mb-3">Analytics & Insights</h3>
                                <p className="text-text-secondary">
                                    Track user behavior, conversions, and performance with built-in analytics.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-4">🧪</div>
                                <h3 className="text-2xl font-semibold mb-3">A/B Testing</h3>
                                <p className="text-text-secondary">
                                    Experiment with different designs and features to optimize conversions.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-4">📝</div>
                                <h3 className="text-2xl font-semibold mb-3">Content Management</h3>
                                <p className="text-text-secondary">
                                    Flexible CMS for managing homepage, categories, and product pages.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-background rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-4">🎨</div>
                                <h3 className="text-2xl font-semibold mb-3">Themeable Design</h3>
                                <p className="text-text-secondary">
                                    Swappable themes to match your brand identity and style preferences.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-16 font-heading">
                            Built with Modern Technology
                        </h2>

                        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-2">⚡</div>
                                <p className="font-semibold">Next.js</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">🔷</div>
                                <p className="font-semibold">TypeScript</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">🔺</div>
                                <p className="font-semibold">GraphQL</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">🐘</div>
                                <p className="font-semibold">PostgreSQL</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">🐳</div>
                                <p className="font-semibold">Docker</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">💎</div>
                                <p className="font-semibold">Redis</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">💳</div>
                                <p className="font-semibold">Stripe</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">🎨</div>
                                <p className="font-semibold">Tailwind</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-heading">
                            Ready to Start Shopping?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Explore our curated collection of premium products
                        </p>
                        <Link
                            href="/products"
                            className="inline-block px-10 py-5 bg-white text-primary rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
                        >
                            View All Products
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
