import { gql, useQuery, useMutation } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const GET_PRODUCTS_ADMIN = gql`
  query GetProductsAdmin {
    products(limit: 100) {
      id
      name
      slug
      description
      basePrice
      category
      status
      metadata
      createdAt
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      basePrice
      status
      category
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      slug
      basePrice
      category
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export default function AdminPage() {
    const [isCreating, setIsCreating] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        basePrice: '',
        category: '',
        status: 'active',
        color: '',
    });

    const { data, loading, error, refetch } = useQuery(GET_PRODUCTS_ADMIN);
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const [createProduct] = useMutation(CREATE_PRODUCT);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            slug: product.slug,
            description: product.description || '',
            basePrice: product.basePrice.toString(),
            category: product.category || '',
            status: product.status,
            color: product.metadata?.color || '',
        });
        setIsCreating(false);
    };

    const handleCreate = () => {
        setIsCreating(true);
        setEditingProduct(null);
        setFormData({
            name: '',
            slug: '',
            description: '',
            basePrice: '',
            category: '',
            status: 'active',
            color: '',
        });
    };

    const handleSave = async () => {
        try {
            const input = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                basePrice: parseFloat(formData.basePrice),
                category: formData.category,
                status: formData.status,
                metadata: formData.color ? { color: formData.color } : undefined,
            };

            if (isCreating) {
                await createProduct({ variables: { input } });
            } else if (editingProduct) {
                await updateProduct({
                    variables: {
                        id: editingProduct.id,
                        input,
                    },
                });
            }

            await refetch();
            setIsCreating(false);
            setEditingProduct(null);
            setFormData({
                name: '',
                slug: '',
                description: '',
                basePrice: '',
                category: '',
                status: 'active',
                color: '',
            });
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Failed to save product. Check console for details.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await deleteProduct({ variables: { id } });
            await refetch();
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('Failed to delete product.');
        }
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            slug: '',
            description: '',
            basePrice: '',
            category: '',
            status: 'active',
            color: '',
        });
    };

    return (
        <>
            <Head>
                <title>Admin Dashboard - Hessy</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 font-heading">
                                Admin Dashboard
                            </h1>
                            <p className="text-text-secondary">
                                Manage your product inventory
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="px-4 py-2 bg-surface text-text rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                            ← Back to Store
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Product List */}
                        <div className="lg:col-span-2">
                            <div className="bg-surface rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold">Products</h2>
                                    <button
                                        onClick={handleCreate}
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        + Add Product
                                    </button>
                                </div>

                                {loading && (
                                    <div className="text-center py-12">
                                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                    </div>
                                )}

                                {error && (
                                    <div className="text-center py-12">
                                        <p className="text-red-500">Error loading products</p>
                                    </div>
                                )}

                                {!loading && !error && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-background">
                                                    <th className="text-left py-3 px-2">Name</th>
                                                    <th className="text-left py-3 px-2">Category</th>
                                                    <th className="text-left py-3 px-2">Price</th>
                                                    <th className="text-left py-3 px-2">Status</th>
                                                    <th className="text-right py-3 px-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.products.map((product: any) => (
                                                    <tr
                                                        key={product.id}
                                                        className="border-b border-background hover:bg-background transition-colors"
                                                    >
                                                        <td className="py-3 px-2">
                                                            <div>
                                                                <p className="font-semibold">{product.name}</p>
                                                                <p className="text-xs text-text-secondary">{product.slug}</p>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-2">
                                                            <span className="text-sm capitalize">{product.category}</span>
                                                        </td>
                                                        <td className="py-3 px-2">
                                                            <span className="font-semibold text-primary">
                                                                ${product.basePrice}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-2">
                                                            <span
                                                                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${product.status === 'active'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-gray-100 text-gray-800'
                                                                    }`}
                                                            >
                                                                {product.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-2 text-right">
                                                            <button
                                                                onClick={() => handleEdit(product)}
                                                                className="px-3 py-1 text-sm bg-background hover:bg-primary hover:text-white rounded transition-colors mr-2"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(product.id)}
                                                                className="px-3 py-1 text-sm bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded transition-colors"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Edit/Create Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-surface rounded-xl p-6 sticky top-20">
                                <h2 className="text-2xl font-semibold mb-6">
                                    {isCreating ? 'Create Product' : editingProduct ? 'Edit Product' : 'Select a Product'}
                                </h2>

                                {(isCreating || editingProduct) ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                                placeholder="Product Name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Slug</label>
                                            <input
                                                type="text"
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                                placeholder="product-slug"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Description</label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                                rows={3}
                                                placeholder="Product description"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Price ($)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.basePrice}
                                                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                                placeholder="0.00"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Clothing">Clothing</option>
                                                <option value="Home & Garden">Home & Garden</option>
                                                <option value="Sports">Sports</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Color</label>
                                            <select
                                                value={formData.color}
                                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                            >
                                                <option value="">Select Color</option>
                                                <option value="Black">Black</option>
                                                <option value="White">White</option>
                                                <option value="Blue">Blue</option>
                                                <option value="Red">Red</option>
                                                <option value="Green">Green</option>
                                                <option value="Gray">Gray</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Status</label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:border-primary"
                                            >
                                                <option value="active">Active</option>
                                                <option value="draft">Draft</option>
                                                <option value="archived">Archived</option>
                                            </select>
                                        </div>

                                        <div className="flex gap-2 pt-4">
                                            <button
                                                onClick={handleSave}
                                                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                                            >
                                                {isCreating ? 'Create' : 'Save'}
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="px-4 py-2 bg-background text-text rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-text-secondary">
                                        <p>Select a product to edit or create a new one</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
