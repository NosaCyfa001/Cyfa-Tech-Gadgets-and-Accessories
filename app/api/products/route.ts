import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    // Fetch all products with their prices
    const products = await stripe.products.list({
      limit: 100, // Maximum products per request
      active: true, // Only fetch active products
      expand: ['data.default_price'], // Include price information
    });

    // If you have more than 100 products, implement pagination
    let allProducts = [...products.data];
    let hasMore = products.has_more;
    let lastProductId = products.data[products.data.length - 1]?.id;

    while (hasMore) {
      const nextBatch = await stripe.products.list({
        limit: 100,
        active: true,
        starting_after: lastProductId,
        expand: ['data.default_price'],
      });

      allProducts.push(...nextBatch.data);
      hasMore = nextBatch.has_more;
      lastProductId = nextBatch.data[nextBatch.data.length - 1]?.id;
    }

    return NextResponse.json({ 
      products: allProducts,
      count: allProducts.length 
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    );
  }
}