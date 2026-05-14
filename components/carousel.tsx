"use client";

import Stripe from "stripe";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import QuickViewModal from "./QuickViewModal";
import { getCategory } from "@/lib/get-category";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Check,
  Plus,
  Minus,
  Share2,
  Truck,
  ShieldCheck,
  Smartphone,
  Headphones,
  Laptop,
  Gamepad,
  Zap,
  Eye,
} from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [quickViewProduct, setQuickViewProduct] =
    useState<Stripe.Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const { items, addItem, removeItem, updateQuantity } = useCartStore();

  if (!products.length) return null;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection("right");
      setCurrent((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length, isAutoPlaying]);

  useEffect(() => {
    setImageLoaded(false);
  }, [current]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;
  const category = getCategory(currentProduct);

  const categoryIcons: Record<string, React.ReactNode> = {
    smartphones: <Smartphone className="w-3.5 h-3.5" />,
    audio: <Headphones className="w-3.5 h-3.5" />,
    laptops: <Laptop className="w-3.5 h-3.5" />,
    gaming: <Gamepad className="w-3.5 h-3.5" />,
    accessories: <Zap className="w-3.5 h-3.5" />,
  };

  const isHot =
    currentProduct.name.toLowerCase().includes("iphone") ||
    currentProduct.name.toLowerCase().includes("ps5") ||
    currentProduct.name.toLowerCase().includes("macbook");

  const cartItem = items.find((item) => item.id === currentProduct.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isInCart = quantity > 0;

  const originalPrice = price?.unit_amount ? price.unit_amount / 100 : 0;
  const discountPercent = 15;
  const slashedPrice = Math.round(originalPrice / (1 - discountPercent / 100));

  const onAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: currentProduct.id,
      name: currentProduct.name,
      price: price.unit_amount as number,
      imageUrl: currentProduct.images?.[0] || null,
      quantity: 1,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const onIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) updateQuantity(currentProduct.id, cartItem.quantity + 1);
  };

  const onDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      if (cartItem.quantity === 1) removeItem(currentProduct.id);
      else updateQuantity(currentProduct.id, cartItem.quantity - 1);
    }
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setDirection("right");
    setCurrent((prev) => (prev + 1) % products.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setDirection("left");
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
  };

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(currentProduct);
    setIsQuickViewOpen(true);
  };

  const onShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      await navigator.share({
        title: currentProduct.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const rating = 4.5;
  const reviewCount = 128;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-100 border border-gray-200/60 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
            {/* ── LEFT: Image Panel ── */}
            <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/50 flex items-center justify-center min-h-[320px] md:min-h-0 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 bg-blue-200/30 rounded-full blur-3xl" />
              </div>

              <div className="relative w-full h-full min-h-[320px] md:min-h-[480px]">
                <Image
                  key={currentProduct.id}
                  src={currentProduct.images?.[0] || "/placeholder.png"}
                  alt={currentProduct.name}
                  fill
                  className={`object-contain p-10 transition-all duration-500 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
              </div>

              {/* Badges top-left */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm">
                  -{discountPercent}% OFF
                </span>
                {isHot && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-sm">
                    🔥 HOT
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 border border-blue-100 text-blue-600 shadow-sm capitalize">
                  {categoryIcons[category]}
                  {category}
                </span>
              </div>

              {/* Wishlist + Share */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  onClick={(e) => toggleWishlist(e, currentProduct.id)}
                  className="w-9 h-9 rounded-full bg-gray-900 border-0 shadow-md flex items-center justify-center hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all duration-300"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${wishlist.has(currentProduct.id) ? "fill-red-400 text-red-400" : "text-white"}`}
                  />
                </Button>
                <Button
                  onClick={onShare}
                  className="w-9 h-9 rounded-full bg-gray-900 border-0 shadow-md flex items-center justify-center hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all duration-300"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </Button>
              </div>

              {/* Prev arrow */}
              <Button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-900 border-0 shadow-md flex items-center justify-center hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </Button>

              {/* Next arrow */}
              <Button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-900 border-0 shadow-md flex items-center justify-center hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Next product"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </Button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {products.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrent(i);
                    }}
                    className={`rounded-full border-0 p-0 transition-all duration-300 ${
                      i === current
                        ? "w-6 h-2.5 bg-gray-900"
                        : "w-2.5 h-2.5 bg-gray-400 hover:bg-gray-600"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT: Details Panel ── */}
            <div className="flex flex-col justify-between p-6 sm:p-8 bg-white">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                    {category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-orange-500 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Trending
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {currentProduct.name}
                </h2>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : i < rating
                              ? "fill-yellow-200 text-yellow-400"
                              : "text-gray-200 fill-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({reviewCount} reviews)
                  </span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {currentProduct.description ||
                    "Premium quality tech product with top-tier performance and modern design. Built for everyday excellence."}
                </p>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-gray-900">
                    ₦{new Intl.NumberFormat("en-NG").format(originalPrice)}
                  </span>
                  <span className="text-base text-gray-400 line-through">
                    ₦{new Intl.NumberFormat("en-NG").format(slashedPrice)}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Save {discountPercent}%
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    1-Year Warranty
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Truck className="w-3.5 h-3.5 text-blue-500" />
                    Free delivery above ₦500K
                  </span>
                </div>
              </div>

              {/* ── CTA block ── */}
              <div className="mt-6 space-y-3">
                {/* Add to Cart */}
                {!isInCart ? (
                  <Button
                    onClick={onAddToCart}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-gray-900 text-white font-bold text-sm border-0 shadow-lg hover:bg-gray-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    {showSuccess ? (
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
                  </Button>
                ) : (
                  <div className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border-2 border-gray-900 bg-gray-50">
                    <Button
                      onClick={onDecrease}
                      className="w-8 h-8 rounded-full bg-gray-900 border-0 flex items-center justify-center shadow-sm hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </Button>
                    <span className="font-bold text-gray-900 tabular-nums">
                      {quantity} in cart
                    </span>
                    <Button
                      onClick={onIncrease}
                      className="w-8 h-8 rounded-full bg-gray-900 border-0 flex items-center justify-center shadow-sm hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                )}

                {/* View Details + Quick View */}
                <div className="grid grid-cols-2 gap-2">
                  <Link href={`/products/${currentProduct.id}`}>
                    <Button className="w-full py-2.5 rounded-full bg-gray-900 border-0 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-300">
                      View Details
                    </Button>
                  </Link>
                  <Button
                    onClick={openQuickView}
                    className="w-full py-2.5 rounded-full bg-gray-900 border-0 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    Quick View
                  </Button>
                </div>

                <p className="text-center text-xs text-gray-400 pt-1">
                  {current + 1} of {products.length} featured products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
