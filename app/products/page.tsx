import { ProductList } from "@/components/product-list";

// ISR: Revalidate every 30 seconds for fresh data with fast performance
export const revalidate = 30;

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products`, {
    next: { revalidate: 30 }, // Cache for 30 seconds, then refresh
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}

export default async function ProductsPage() {
  try {
    const { products, count } = await getProducts();

    return (
      <div className="container mx-auto px-4 py-8">
        <ProductList products={products} />
      </div>
    );
  } catch (error) {
    console.error("Error in ProductsPage:", error);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Products
          </h1>
          <p className="text-gray-600 mb-4">
            Failed to load products. Please check your configuration and try
            again.
          </p>
          <p className="text-gray-500 text-sm font-mono bg-white p-3 rounded inline-block">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }
}
