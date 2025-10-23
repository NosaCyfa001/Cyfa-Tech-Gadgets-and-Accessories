"use client";
import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
    products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredProducts = products.filter((product) => {
        if (!searchTerm.trim()) return true;

        const term = searchTerm.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(term);
        const descriptionMatch = product.description
            ? product.description.toLowerCase().includes(term)
            : false;

        return nameMatch || descriptionMatch;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Heading */}
            <div className="mb-4 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-900">
                    All Products
                </h1>
                <p className="text-gray-600 text-center">
                    Showing {filteredProducts.length} of {products.length} products
                </p>
            </div>

            {/* Search Input */}
            <div className="mb-8 flex justify-center">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded border px-4 py-2 pr-10 bg-white text-black focus:outline-none focus:ring-2"
                        placeholder="Search products..."
                    />
                </div>
            </div>

            {/* Search Results Info */}
            {searchTerm && (
                <div className="mb-6 text-center">
                    <p className="text-gray-600">
                        {filteredProducts.length > 0
                            ? `Found ${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} for "${searchTerm}"`
                            : `No products found for "${searchTerm}"`
                        }
                    </p>
                </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    {searchTerm ? (
                        <div>
                            <p className="text-gray-500 text-lg mb-2">No products found for your search.</p>
                            <p className="text-gray-400 text-sm mb-4">Try adjusting your search terms</p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-500 text-lg">No products available.</p>
                            <p className="text-gray-400 text-sm mt-2">
                                Make sure you have active products in your Stripe dashboard.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};