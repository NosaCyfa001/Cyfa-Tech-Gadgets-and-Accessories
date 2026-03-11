"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  X,
  Plus,
  Minus,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

interface QuickViewModalProps {
  product: Stripe.Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { items, addItem, updateQuantity, removeItem } = useCartStore();

  if (!product) return null;

  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isInCart = quantity > 0;

  const onAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  const onIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const onDecreaseQuantity = () => {
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeItem(product.id);
      } else {
        updateQuantity(product.id, cartItem.quantity - 1);
      }
    }
  };

  const originalPrice = price?.unit_amount ? price.unit_amount / 100 : 0;
  const discountPercent = 15;
  const hasDiscount = true;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left: Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 bg-gray-100 rounded-lg mb-4 overflow-hidden">
              {product.images && product.images[selectedImage] && (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              )}
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge className="bg-red-500 text-white">
                    {discountPercent}% OFF
                  </Badge>
                )}
                <Badge className="bg-green-500 text-white">NEW</Badge>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded border-2 transition-all ${
                      selectedImage === idx
                        ? "border-blue-600 scale-105"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover rounded p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-3xl font-bold text-gray-900">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">4.5</span>
              <span className="text-sm text-gray-500">(248 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {hasDiscount && (
                <p className="text-lg text-gray-400 line-through mb-1">
                  ₦{new Intl.NumberFormat("en-NG", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                  }).format(originalPrice * (1 + discountPercent / 100))}
                </p>
              )}
              {price?.unit_amount && (
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-bold text-slate-800">
                    ₦{new Intl.NumberFormat("en-NG", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                    }).format(originalPrice)}
                  </p>
                  {hasDiscount && (
                    <Badge className="bg-green-500 text-white">
                      Save ₦{new Intl.NumberFormat("en-NG", {
                        maximumFractionDigits: 0,
                      }).format(originalPrice * (discountPercent / 100))}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description ||
                "Premium quality product with advanced features and reliable performance. Perfect for your everyday needs."}
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Free delivery to Lagos within 24hrs</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">1 Year Warranty Included</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-semibold">In Stock - Ready to Ship</span>
              </div>
            </div>

            {/* Add to Cart / Quantity Controls */}
            <div className="space-y-3 mt-auto">
              {!isInCart ? (
                <Button
                  size="lg"
                  onClick={onAddToCart}
                  className="w-full gap-2 text-lg font-semibold text-white hover:text-gray-500"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
              ) : (
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full h-10 w-10 p-0"
                    onClick={onDecreaseQuantity}
                  >
                    <Minus className="w-4 h-4 text-white hover:text-gray-500" />
                  </Button>
                  <span className="text-2xl font-bold text-gray-900 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full h-10 w-10 p-0"
                    onClick={onIncreaseQuantity}
                  >
                    <Plus className="w-4 h-4 text-white hover:text-gray-500" />
                  </Button>
                </div>
              )}

              <Link href={`/products/${product.id}`} onClick={onClose}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 text-lg font-semibold text-white hover:text-gray-500"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}