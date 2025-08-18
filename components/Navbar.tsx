"use client";
import { useCartStore } from "@/store/cart-store";
import { Menu, ShoppingCart, X, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const { data: session } = useSession();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        
        {/* Left Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/cyfa.png" alt="Cyfa Logo" width={120} height={50} />
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex flex-1 justify-center text-lg font-bold">
          <Link href="/" className="px-4 py-2 hover:text-blue-600">Home</Link>
          <Link href="/about" className="px-4 py-2 hover:text-blue-600">About</Link>
          <Link href="/products" className="px-4 py-2 hover:text-blue-600">Products</Link>
          <Link href="/checkout" className="px-4 py-2 hover:text-blue-600">Checkout</Link>
        </div>

        {/* Right Section (Desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          
          {/* Cart */}
          <Link href="/checkout" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Icons */}
          {session ? (
            <div
              onClick={() => signOut()}
              className="flex items-center space-x-1 cursor-pointer hover:scale-105 transition"
            >
              <LogOut className="h-6 w-6 text-red-600" />
              <span className="text-sm text-red-600 font-medium">Sign Out</span>
            </div>
          ) : (
            <User
              onClick={() => signIn("google")}
              className="h-6 w-6 text-black hover:text-blue-600 cursor-pointer hover:scale-110 transition"
            />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden cursor-pointer p-2 text-black"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md text-center">
          <ul className="flex flex-col p-4 space-y-2">
            <li><Link href="/" className="block hover:text-blue-600">Home</Link></li>
            <li><Link href="/about" className="block hover:text-blue-600">About</Link></li>
            <li><Link href="/products" className="block hover:text-blue-600">Products</Link></li>
            <li><Link href="/checkout" className="block hover:text-blue-600">Checkout</Link></li>
            
            {/* Mobile Auth Buttons */}
            {session ? (
              <li
                onClick={() => signOut()}
                className="flex items-center justify-center space-x-1 cursor-pointer hover:text-red-600"
              >
                <LogOut className="h-5 w-5 text-red-600" />
                <span className="text-sm text-red-600 font-medium">Sign Out</span>
              </li>
            ) : (
              <li
                onClick={() => signIn("google")}
                className="flex items-center justify-center space-x-1 cursor-pointer hover:text-green-600"
              >
                <User className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">Sign In</span>
              </li>
            )}
          </ul>
        </nav>
      )}
    </nav>
  );
};
