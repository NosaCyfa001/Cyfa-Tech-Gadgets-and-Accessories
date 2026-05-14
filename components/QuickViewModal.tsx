"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { useCartStore } from "@/store/cart-store";
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  Package,
  Plus,
  Minus,
  ExternalLink,
  Check,
} from "lucide-react";
import { useState } from "react";

interface QuickViewModalProps {
  product: Stripe.Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const { items, addItem, updateQuantity, removeItem } = useCartStore();

  if (!product) return null;

  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isInCart = quantity > 0;

  const originalPrice = price?.unit_amount ? price.unit_amount / 100 : 0;
  const discountPercent = 15;
  const slashedPrice = Math.round(originalPrice * (1 + discountPercent / 100));

  const onAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images?.[0] ?? null,
      quantity: 1,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const onIncrease = () => {
    if (cartItem) updateQuantity(product.id, cartItem.quantity + 1);
  };

  const onDecrease = () => {
    if (cartItem) {
      if (cartItem.quantity === 1) removeItem(product.id);
      else updateQuantity(product.id, cartItem.quantity - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[95vw] max-w-3xl
          max-h-[92vh]
          overflow-y-auto
          p-0
          rounded-2xl
          border border-gray-200
          shadow-2xl shadow-gray-200/60
          bg-white
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* ── LEFT: Image panel ── */}
          <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 p-5 flex flex-col gap-3 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">

            {/* Main image */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white/60 shadow-inner">
              {product.images?.[selectedImage] && (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-6 transition-all duration-300"
                  priority
                />
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm">
                  -{discountPercent}% OFF
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                  NEW
                </span>
              </div>
            </div>

            {/* Thumbnail strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden bg-white transition-all duration-200 ${
                      selectedImage === idx
                        ? "border-gray-900 scale-105 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Details panel ── */}
          <div className="flex flex-col p-5 sm:p-6 gap-4">

            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {/* Star rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-yellow-200 text-yellow-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">4.5</span>
              <span className="text-xs text-gray-400">(248 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-black text-gray-900">
                ₦{new Intl.NumberFormat("en-NG").format(originalPrice)}
              </span>
              <span className="text-base text-gray-400 line-through">
                ₦{new Intl.NumberFormat("en-NG").format(slashedPrice)}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Save {discountPercent}%
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
              {product.description ||
                "Premium quality product with advanced features and reliable performance. Perfect for your everyday needs."}
            </p>

            {/* Trust badges */}
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 space-y-2.5">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                <Truck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                Free delivery to Lagos within 24hrs
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                1-Year Warranty Included
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                <Package className="w-4 h-4 text-purple-500 flex-shrink-0" />
                In Stock — Ready to Ship
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-2 mt-auto pt-2">

              {/* Add to cart / quantity */}
              {!isInCart ? (
                <button
                  onClick={onAddToCart}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gray-900 border-0 text-white font-bold text-sm shadow-lg hover:bg-gray-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              ) : (
                <div className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border-2 border-gray-900 bg-gray-50">
                  {/* Minus — matches checkout Button style exactly */}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={onDecrease}
                    className="rounded-full w-8 h-8 p-0 bg-gray-900 text-white border-0 shadow-sm hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-bold text-gray-900 tabular-nums text-lg">
                    {quantity} in cart
                  </span>
                  {/* Plus — matches checkout Button style exactly */}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={onIncrease}
                    className="rounded-full w-8 h-8 p-0 bg-gray-900 text-white border-0 shadow-sm hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* View full details */}
              <Link href={`/products/${product.id}`} onClick={onClose}>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gray-900 border-0 text-white font-bold text-sm shadow-lg hover:bg-gray-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  <ExternalLink className="w-4 h-4" />
                  View Full Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}