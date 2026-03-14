"use client";
import { useCartStore } from "@/store/cart-store";
import { Menu, ShoppingCart, X, User } from "lucide-react";
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
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/cyfa.png" alt="Cyfa Logo" width={120} height={50} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center text-lg font-bold">
          <Link href="/" className="px-4 py-2 hover:text-gray-500">
            Home
          </Link>

          <Link href="/about" className="px-4 py-2 hover:text-gray-500">
            About
          </Link>

          <Link href="/products" className="px-4 py-2 hover:text-gray-500">
            Products
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link
            href="/checkout"
            className="relative hover:text-gray-500 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          <div className="relative flex items-center">
            {session ? (
              <div className="relative group cursor-pointer">
                {/* Avatar */}
                <Image
                  src={session.user?.image || "/avatar.png"}
                  alt="User Avatar"
                  width={28}
                  height={28}
                  className="rounded-full hover:scale-110 transition-transform duration-200"
                  onClick={() => signOut()}
                />

                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-md px-2.5 py-1.5 shadow-lg opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap">
                  Logout
                </span>
              </div>
            ) : (
              <div className="relative group">
                <User
                  onClick={() => signIn("google")}
                  className="h-6 w-6 text-black hover:text-gray-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                />

                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-md px-2.5 py-1.5 shadow-lg opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap hover:text-gray-300">
                  Login
                </span>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div
            className="md:hidden cursor-pointer p-2 text-black"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md text-center">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/" className="block hover:text-gray-500">
                Home
              </Link>
            </li>

            <li>
              <Link href="/about" className="block hover:text-gray-500">
                About
              </Link>
            </li>

            <li>
              <Link href="/products" className="block hover:text-gray-500">
                Products
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
