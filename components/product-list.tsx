"use client";

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";
import { productCategories } from "@/lib/product-categories";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("all");

  // ✅ REAL categories (matches your mapping)
  const categories = [
    "all",
    "smartphones",
    "computing",
    "audio",
    "gaming",
    "wearables",
    "networking",
    "accessories",
  ];

  // ✅ CORRECT CATEGORY (no guessing anymore)
  const getCategory = (product: Stripe.Product) => {
    return productCategories[product.id] || "accessories";
  };

  // ✅ FILTER (search + category)
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term);

    const matchesCategory =
      category === "all" || getCategory(product) === category;

    return matchesSearch && matchesCategory;
  });

  // ✅ Format labels nicely
  const formatLabel = (cat: string) => {
    switch (cat) {
      case "smartphones":
        return "Smartphones";
      case "computing":
        return "Computing";
      case "audio":
        return "Audio";
      case "gaming":
        return "Gaming";
      case "wearables":
        return "Wearables";
      case "networking":
        return "Networking";
      case "accessories":
        return "Accessories";
      default:
        return "All";
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* 🔥 Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore Our Collection
        </h1>

        <p className="text-gray-600 text-lg">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* 🔘 Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              category === cat
                ? "bg-gradient-to-r from-yellow-500 to-blue-500 text-white shadow-lg scale-105"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
          >
            {formatLabel(cat)}
          </button>
        ))}
      </div>

      {/* 🔍 Search */}
      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border px-5 py-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Search for gadgets, accessories..."
          />
        </div>
      </div>

      {/* 🔎 Search Result Text */}
      {searchTerm && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {filteredProducts.length > 0
              ? `Found ${filteredProducts.length} product${
                  filteredProducts.length === 1 ? "" : "s"
                } for "${searchTerm}"`
              : `No products found for "${searchTerm}"`}
          </p>
        </div>
      )}

      {/* 🛍️ Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          {searchTerm ? (
            <div>
              <p className="text-gray-500 text-lg mb-2">
                No products found for your search.
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Try adjusting your search terms
              </p>

              <button
                onClick={() => setSearchTerm("")}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 text-lg">No products available.</p>
              <p className="text-gray-400 text-sm mt-2">
                Make sure your Stripe products are active.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
