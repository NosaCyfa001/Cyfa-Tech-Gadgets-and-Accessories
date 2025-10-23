"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Replaced custom Input import with native input element to avoid missing module
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Trash2, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate totals
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping - discount;

  const formatNaira = (amount: number) =>
    `₦${(amount / 100).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "cyfa10") {
      setPromoApplied(true);
    }
  };

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-4 text-center">
        <div className="bg-gray-100 rounded-full p-8 mb-6 shadow-lg">
          <ShoppingBag className="w-20 h-20 text-gray-500" />
        </div>

        <h1 className="text-3xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Your Cart is Empty!
        </h1>

        <p className="text-black max-w-sm text-base sm:text-lg mb-8">
          Looks like you haven’t added anything yet. Start exploring our amazing
          products!
        </p>

        <Link href="/products" className="flex items-center justify-center">
          <Button className="text-white px-8 py-3 rounded-full font-semibold hover:text-gray-300 transition-colors duration-300 flex items-center justify-center gap-2">
            Go Shopping <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-3xl font-bold text-black">Checkout</h1>
        <Button
          variant="default"
          size="sm"
          onClick={clearCart}
          className="text-white hover:text-gray-300 flex items-center gap-2 mt-2"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Cart</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border border-gray-200 rounded-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl sm:text-3xl font-bold">
                Shopping Cart
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 sm:px-6">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 sm:gap-4 pb-4 border-b border-gray-100 last:border-0"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-2">
                          {item.name}
                        </h3>
                        <span className="font-bold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                          {formatNaira(item.price * item.quantity)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="rounded-full w-7 h-7 sm:w-8 sm:h-8 p-0 text-base sm:text-lg text-white hover:text-gray-400"
                          >
                            –
                          </Button>
                          <span className="text-base sm:text-lg font-semibold text-gray-700 min-w-[1.5rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addItem({ ...item, quantity: 1 })}
                            className="rounded-full w-7 h-7 sm:w-8 sm:h-8 p-0 text-base sm:text-lg text-white hover:text-gray-400"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm border border-gray-200 rounded-lg sticky top-4">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl sm:text-3xl font-bold text-center">
                <span className="text-yellow-500">Order</span>{" "}
                <span className="text-blue-600">Summary</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 space-y-4">
              {/* Promo Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="w-full rounded border px-4 py-2 pr-10 bg-white text-black focus:outline-none focus:ring-2"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                    className="px-4 text-white mt-1 hover:text-gray-300"
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied ? (
                  <p className="text-xs text-green-600 font-medium">
                    ✓ Promo code applied! 10% discount
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Try <strong>CYFA10</strong> for 10% off
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatNaira(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                {promoApplied && discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (10%)</span>
                    <span className="font-medium">
                      -{formatNaira(discount)}
                    </span>
                  </div>
                )}

                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-black">
                    {formatNaira(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <form action={checkoutAction} className="pt-2">
                <input
                  type="hidden"
                  name="items"
                  value={JSON.stringify(items)}
                />
                <input type="hidden" name="total" value={total} />
                <input type="hidden" name="discount" value={discount} />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r  hover:to-blue-800 text-white text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Proceed to Payment
                </Button>
              </form>

              <p className="text-xs text-center text-gray-500 pt-2">
                Secure checkout • Free shipping on all orders
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
