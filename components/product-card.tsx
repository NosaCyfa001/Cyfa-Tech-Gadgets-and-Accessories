import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="flex flex-col group hover:shadow-2xl transition duration-300 w-full h-full border border-gray-200 rounded-lg overflow-hidden">
        {/* Image */}
        {product.images?.[0] && (
          <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-video">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-90"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-lg sm:text-xl font-semibold text-yellow-500 text-center">
              {product.name}
            </CardTitle>
          </CardHeader>

          {/* Body */}
          <CardContent className="px-4 pb-4 flex flex-col justify-between flex-grow">
            {product.description && (
              <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 text-center">
                {product.description}
              </p>
            )}

            {/* Price + Button */}
            <div className="mt-auto space-y-3 text-center">
              {price?.unit_amount && (
                <p className="text-lg sm:text-xl font-bold text-blue-600">
                  ₦
                  {new Intl.NumberFormat("en-NG", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(price.unit_amount / 100)}
                </p>
              )}

              <Button
                size="sm"
                className="w-full bg-black hover:bg-gray-800 text-white text-sm sm:text-base transition-colors"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};
