import { ProductList } from "@/components/product-list";

async function getProducts() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return res.json();
}

export default async function ProductsPage() {
    try {
        const { products, count } = await getProducts();

        return <ProductList products={products} />;
        
    } catch (error) {
        console.error("Error in ProductsPage:", error);
        
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        Error Loading Products
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Failed to load products. Please check your configuration and try again.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Error: {error instanceof Error ? error.message : 'Unknown error'}
                    </p>
                </div>
            </div>
        );
    }
}