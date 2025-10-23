"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import { Plus, Minus } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto shadow-2xl border-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Image Section */}
            {product.images && product.images[0] && (
              <div className="relative h-64 sm:h-96 lg:h-full min-h-[400px] w-full">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Details Section */}
            <CardContent className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <div className="space-y-4 sm:space-y-6">
                {/* Product Name */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
                  {product.name}
                </h1>

                {/* Description */}
                {product.description && (
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {product.description}
                  </p>
                )}

                {/* Price */}
                <div className="bg-blue-50 rounded-lg p-4 sm:p-6 inline-block">
                  {price?.unit_amount && (
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                      ₦
                      {new Intl.NumberFormat("en-NG", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(price.unit_amount / 100)}
                    </p>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-slate-700">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => removeItem(product.id)}
                      disabled={quantity === 0}
                      className="h-12 w-12 sm:h-14 sm:w-14 p-0 rounded-full text-white hover:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>

                    <span className="text-3xl sm:text-4xl font-bold text-slate-800 min-w-[3rem] text-center">
                      {quantity}
                    </span>

                    <Button
                      variant="default"
                      size="lg"
                      onClick={onAddItem}
                      className="h-12 w-12 sm:h-14 sm:w-14 p-0 text-white rounded-full hover:text-gray-400  transition-all"
                    >
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                  </div>
                </div>

                {quantity === 0 && (
                  <div className="pt-4">
                    <p className="text-sm text-slate-500 italic">
                      Click + to add this item to your cart
                    </p>
                  </div>
                )}

                {/* Total Price if quantity > 0 */}
                {quantity > 0 && price?.unit_amount && (
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg p-4 sm:p-6 border-2 border-slate-300">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-semibold text-base sm:text-lg">
                        Subtotal ({quantity} {quantity === 1 ? "item" : "items"}
                        ):
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold text-black">
                        ₦
                        {new Intl.NumberFormat("en-NG", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format((price.unit_amount * quantity) / 100)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};
