"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();

    // 🎉 Confetti rain for 3 seconds
    const duration = 3 * 1000; // 3 seconds
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <Image
        src="/order.svg"
        alt="Order successful"
        width={250}
        height={250}
        className="mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold mb-4 text-green-700">
        Payment Successful!
      </h1>
      <p className="mb-6 text-gray-600 text-lg">
         Thank you for your purchase! Your order is now being processed and
        will be on its way soon.
      </p>
      <Link href="/products">
        <Button className="px-6 py-2 text-white hover:text-gray-300">
          Continue Shopping <ArrowRight className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}
