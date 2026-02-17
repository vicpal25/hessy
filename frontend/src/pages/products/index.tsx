import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const GET_PRODUCTS = gql`
  query GetProducts($category: String, $status: String) {
    products(category: $category, status: $status, limit: 50) {
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

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name');

    const { data, loading, error } = useQuery(GET_PRODUCTS, {
        variables: {
            category: selectedCategory ? selectedCategory.toLowerCase() : undefined,
            status: 'active',
        },
    });

    // Filter and sort products client-side
    const filteredProducts = data?.products
        ? data.products
            .filter((product: any) => {
                // Price filter
                if (priceRange) {
                    const price = product.basePrice;
                    switch (priceRange) {
                        case 'under-50':
                            if (price >= 50) return false;
                            break;
                        case '50-100':
                            if (price < 50 || price > 100) return false;
                            break;
                        case '100-200':
                            if (price < 100 || price > 200) return false;
                            break;
                        case 'over-200':
                            if (price <= 200) return false;
                            break;
                    }
                }

                // Color filter (from metadata)
                if (selectedColor && product.metadata?.color) {
                    if (product.metadata.color.toLowerCase() !== selectedColor.toLowerCase()) {
                        return false;
                    }
                }

                return true;
            })
            .sort((a: any, b: any) => {
                switch (sortBy) {
                    case 'price-low':
                        return a.basePrice - b.basePrice;
                    case 'price-high':
                        return b.basePrice - a.basePrice;
                    case 'name':
                    default:
                        return a.name.localeCompare(b.name);
                }
            })
        : [];

    const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports'];
    const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Gray'];

    return (
        <>
            <Head>
                <title>Products - Hessy</title>
                <meta name="description" content="Browse our collection of products" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center text-primary hover:underline mb-4"
                        >
                            ← Back to Home
                        </Link>
                        <h1 className="text-5xl font-bold mb-4 font-heading">
                            Our Products
                        </h1>
                        <p className="text-xl text-text-secondary">
                            Discover our curated collection
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-surface rounded-xl p-6 sticky top-20">
                                <h2 className="text-2xl font-semibold mb-6">Filters</h2>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">Category</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === ''}
                                                onChange={() => setSelectedCategory('')}
                                                className="mr-2"
                                            />
                                            <span>All Categories</span>
                                        </label>
                                        {categories.map((category) => (
                                            <label key={category} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={selectedCategory === category}
                                                    onChange={() => setSelectedCategory(category)}
                                                    className="mr-2"
                                                />
                                                <span>{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">Price Range</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={priceRange === ''}
                                                onChange={() => setPriceRange('')}
                                                className="mr-2"
                                            />
                                            <span>All Prices</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={priceRange === 'under-50'}
                                                onChange={() => setPriceRange('under-50')}
                                                className="mr-2"
                                            />
                                            <span>Under $50</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={priceRange === '50-100'}
                                                onChange={() => setPriceRange('50-100')}
                                                className="mr-2"
                                            />
                                            <span>$50 - $100</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={priceRange === '100-200'}
                                                onChange={() => setPriceRange('100-200')}
                                                className="mr-2"
                                            />
                                            <span>$100 - $200</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={priceRange === 'over-200'}
                                                onChange={() => setPriceRange('over-200')}
                                                className="mr-2"
                                            />
                                            <span>Over $200</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Color Filter */}
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">Color</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="color"
                                                checked={selectedColor === ''}
                                                onChange={() => setSelectedColor('')}
                                                className="mr-2"
                                            />
                                            <span>All Colors</span>
                                        </label>
                                        {colors.map((color) => (
                                            <label key={color} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="color"
                                                    checked={selectedColor === color}
                                                    onChange={() => setSelectedColor(color)}
                                                    className="mr-2"
                                                />
                                                <span className="flex items-center gap-2">
                                                    <span
                                                        className="w-4 h-4 rounded-full border border-text-secondary"
                                                        style={{ backgroundColor: color.toLowerCase() }}
                                                    />
                                                    {color}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                <button
                                    onClick={() => {
                                        setSelectedCategory('');
                                        setPriceRange('');
                                        setSelectedColor('');
                                    }}
                                    className="w-full py-2 px-4 bg-background hover:bg-primary hover:text-white rounded-lg transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            {/* Sort and Results Count */}
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-text-secondary">
                                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                                </p>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-text-secondary">Sort by:</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 bg-surface border border-background rounded-lg focus:outline-none focus:border-primary"
                                    >
                                        <option value="name">Name (A-Z)</option>
                                        <option value="price-low">Price (Low to High)</option>
                                        <option value="price-high">Price (High to Low)</option>
                                    </select>
                                </div>
                            </div>

                            {loading && (
                                <div className="text-center py-12">
                                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                    <p className="text-lg text-text-secondary mt-4">Loading products...</p>
                                </div>
                            )}

                            {error && (
                                <div className="text-center py-12">
                                    <p className="text-lg text-red-500">
                                        Error loading products. Please make sure the backend is running.
                                    </p>
                                    <p className="text-sm text-text-secondary mt-2">
                                        {error.message}
                                    </p>
                                </div>
                            )}

                            {!loading && !error && filteredProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-lg text-text-secondary">
                                        No products found matching your filters.
                                    </p>
                                </div>
                            )}

                            {!loading && !error && filteredProducts.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProducts.map((product: any) => (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.slug}`}
                                            className="group"
                                        >
                                            <div className="bg-surface rounded-lg p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                                                <div className="aspect-square bg-background rounded-md mb-4 flex items-center justify-center">
                                                    <span className="text-4xl">📦</span>
                                                </div>
                                                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                                    {product.name}
                                                </h3>
                                                <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-2xl font-bold text-primary">
                                                        ${product.basePrice}
                                                    </span>
                                                    <span className="text-xs text-text-secondary uppercase px-2 py-1 bg-background rounded">
                                                        {product.category}
                                                    </span>
                                                </div>
                                                {product.metadata?.color && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <span
                                                            className="w-4 h-4 rounded-full border border-text-secondary"
                                                            style={{ backgroundColor: product.metadata.color.toLowerCase() }}
                                                        />
                                                        <span className="text-xs text-text-secondary">
                                                            {product.metadata.color}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
