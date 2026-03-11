"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import QuickViewModal from "./QuickViewModal";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  TrendingUp,
  Check,
  Plus,
  Minus,
  Share2,
  Truck,
  Package,
} from "lucide-react";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Stripe.Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { items, addItem, removeItem, updateQuantity } = useCartStore();

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length, isAutoPlaying]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  const cartItem = items.find((item) => item.id === currentProduct.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isInCart = quantity > 0;

  const onAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: currentProduct.id,
      name: currentProduct.name,
      price: price.unit_amount as number,
      imageUrl: currentProduct.images ? currentProduct.images[0] : null,
      quantity: 1,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const onIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(currentProduct.id, cartItem.quantity + 1);
    }
  };

  const onDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeItem(currentProduct.id);
      } else {
        updateQuantity(currentProduct.id, cartItem.quantity - 1);
      }
    }
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % products.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrent(index);
  };

  const toggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(currentProduct);
    setIsQuickViewOpen(true);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentProduct.name,
          text: `Check out ${currentProduct.name}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const originalPrice = price?.unit_amount ? price.unit_amount / 100 : 0;
  const discountPercent = 15;
  const hasDiscount = true;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Carousel Card */}
        <Card className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-200 group">
          {/* Product Image */}
          {currentProduct.images && currentProduct.images[0] && (
            <div className="relative h-[400px] md:h-[500px] w-full bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                alt={currentProduct.name}
                src={currentProduct.images[0]}
                fill
                className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 p-8"
                priority
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {hasDiscount && (
                  <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-bold shadow-lg">
                    {discountPercent}% OFF
                  </Badge>
                )}
                <Badge className="bg-green-500 text-white px-3 py-1 text-sm font-bold shadow-lg">
                  NEW
                </Badge>
              </div>

              {/* Quick Actions at Top - Appears on Hover */}
              <div className="absolute top-20 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 z-20">
                <div className="flex gap-3 justify-center">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="gap-2 shadow-xl backdrop-blur-sm text-white hover:text-gray-500 hover:scale-105 transition-transform"
                    onClick={openQuickView}
                  >
                    <Eye className="w-4 h-4" />
                    Quick View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="gap-2 shadow-xl backdrop-blur-sm text-white hover:text-gray-500 hover:scale-105 transition-transform"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Delivery Info at Bottom - Appears on Hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 z-20">
                <div className="text-white space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-green-400" />
                    <span className="font-medium">Free delivery to Lagos within 24hrs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-400" />
                    <span className="text-green-400 font-semibold">✓ In Stock - Ready to ship</span>
                  </div>
                </div>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => toggleWishlist(e, currentProduct.id)}
                className="absolute top-4 right-4 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-red-50 transition-all hover:scale-110"
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    wishlist.has(currentProduct.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }`}
                />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white hover:text-gray-500" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white hover:text-gray-500" />
              </button>
            </div>
          )}

          {/* Product Details */}
          <CardContent className="p-6 md:p-8 bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left: Product Info */}
              <div className="flex-1">
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {currentProduct.name}
                </CardTitle>

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

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {currentProduct.description ||
                    "Premium quality product with advanced features and reliable performance."}
                </p>
              </div>

              {/* Right: Price & CTA */}
              <div className="md:text-right">
                {/* Price */}
                <div className="mb-4">
                  {hasDiscount && (
                    <p className="text-lg text-gray-400 line-through mb-1">
                      ₦
                      {new Intl.NumberFormat("en-NG", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(originalPrice * (1 + discountPercent / 100))}
                    </p>
                  )}
                  {price?.unit_amount && (
                    <p className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center gap-2 md:justify-end">
                      ₦
                      {new Intl.NumberFormat("en-NG", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(originalPrice)}
                      {hasDiscount && (
                        <Badge className="bg-green-500 text-white text-xs">
                          Save ₦
                          {new Intl.NumberFormat("en-NG", {
                            style: "decimal",
                            maximumFractionDigits: 0,
                          }).format(originalPrice * (discountPercent / 100))}
                        </Badge>
                      )}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  {!isInCart ? (
                    <Button
                      size="lg"
                      className="w-full md:w-auto gap-2 text-lg font-semibold shadow-lg text-white hover:text-gray-300 transition-all"
                      onClick={onAddToCart}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 justify-center md:justify-start bg-slate-100 rounded-lg p-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full p-1 h-8 w-8"
                        onClick={onDecreaseQuantity}
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </Button>
                      <span className="text-lg font-semibold text-slate-800 w-8 text-center">
                        {quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full p-1 h-8 w-8"
                        onClick={onIncreaseQuantity}
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  )}

                  {showSuccess && (
                    <div className="flex items-center justify-center gap-2 bg-green-500 text-white rounded-lg py-2 shadow-lg animate-bounce">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-semibold">Added to cart!</span>
                    </div>
                  )}

                  <Link
                    href={`/products/${currentProduct.id}`}
                    className="w-full md:w-auto"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full gap-2 text-lg font-semibold transition-all shadow-lg text-white hover:text-gray-500"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Trending Indicator */}
                <div className="flex items-center justify-center md:justify-end gap-2 mt-4 text-orange-600">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-semibold">Trending Now</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thumbnail Navigation */}
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          {products.map((product, index) => (
            <button
              key={product.id}
              onClick={() => goToSlide(index)}
              className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                index === current
                  ? "border-blue-600 scale-110 shadow-lg"
                  : "border-gray-300 hover:border-blue-400 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="relative w-20 h-20 bg-gray-100">
                {product.images && product.images[0] && (
                  <Image
                    alt={product.name}
                    src={product.images[0]}
                    fill
                    className="object-cover p-2"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
        
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};