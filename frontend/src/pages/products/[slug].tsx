import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/context/CartContext';

const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      basePrice
      category
      status
      metadata
    }
  }
`;

export default function ProductDetailPage() {
    const router = useRouter();
    const { slug } = router.query;
    const { addItem } = useCart();

    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: { slug },
        skip: !slug,
    });

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-lg text-text-secondary mt-4">Loading product...</p>
                </div>
            </main>
        );
    }

    if (error || !data?.product) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <p className="text-lg text-red-500 mb-4">
                            {error ? 'Error loading product' : 'Product not found'}
                        </p>
                        {error && (
                            <p className="text-sm text-text-secondary mb-4">
                                {error.message}
                            </p>
                        )}
                        <Link
                            href="/products"
                            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Back to Products
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const product = data.product;

    return (
        <>
            <Head>
                <title>{product.name} - Hessy</title>
                <meta name="description" content={product.description || `Buy ${product.name}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <div className="mb-8 flex items-center gap-2 text-sm text-text-secondary">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-primary">Products</Link>
                        <span>/</span>
                        <span className="text-text">{product.name}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Product Image */}
                        <div className="bg-surface rounded-xl p-8">
                            <div className="aspect-square bg-background rounded-lg flex items-center justify-center">
                                <span className="text-9xl">📦</span>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
                                {product.name}
                            </h1>

                            <div className="text-4xl font-bold text-primary mb-6">
                                ${product.basePrice}
                            </div>

                            <div className="prose prose-lg mb-8">
                                <p className="text-text-secondary">
                                    {product.description || 'No description available.'}
                                </p>
                            </div>

                            {/* Status Badge */}
                            <div className="mb-6">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${product.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {product.status === 'active' ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-auto">
                                <button
                                    onClick={() => addItem({
                                        id: product.id,
                                        productId: product.id,
                                        name: product.name,
                                        slug: product.slug,
                                        price: product.basePrice,
                                        category: product.category,
                                    })}
                                    disabled={product.status !== 'active'}
                                    className="flex-1 px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Add to Cart
                                </button>
                                <button className="px-8 py-4 bg-surface border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-colors">
                                    ♥
                                </button>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 pt-8 border-t border-surface">
                                <h3 className="font-semibold mb-4">Product Details</h3>
                                <ul className="space-y-2 text-text-secondary">
                                    <li className="flex justify-between">
                                        <span>SKU:</span>
                                        <span className="font-mono text-sm">{product.id.substring(0, 8)}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Category:</span>
                                        <span className="capitalize">{product.category}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Availability:</span>
                                        <span>{product.status === 'active' ? 'In Stock' : 'Out of Stock'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/products"
                            className="inline-block px-6 py-3 bg-surface text-text rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                            ← Back to Products
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
