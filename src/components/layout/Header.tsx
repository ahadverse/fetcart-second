"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { getAllCategories } from "@/data/seed";
import MegaMenu from "./MegaMenu";
import SearchModal from "./SearchModal";

export default function Header() {
  const { itemCount, openCart } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const categories = getAllCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className='sticky top-0 z-40 bg-white border-b border-[#E5E5E5]'
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 shrink-0'>
          <Image
            src='/logo.png'
            alt='FetKart'
            width={140}
            height={40}
            className='object-contain'
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden lg:flex items-center gap-8'>
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className='relative'
              onMouseEnter={() => setActiveCategory(cat.slug)}
            >
              <Link
                href={`/${cat.slug}`}
                className={`text-sm font-medium transition-colors pb-1 ${
                  activeCategory === cat.slug
                    ? "text-[#1B5DBE] border-b-2 border-[#1B5DBE]"
                    : "text-[#111111] hover:text-[#1B5DBE]"
                }`}
              >
                {cat.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Icons */}
        <div className='flex items-center gap-4'>
          <button
            onClick={() => setSearchOpen(true)}
            className='hidden sm:flex text-[#555555] hover:text-[#111111] transition-colors cursor-pointer'
            aria-label='Search'
          >
            <Search size={20} />
          </button>
          <Link
            href='/wishlist'
            className='hidden sm:flex relative text-[#555555] hover:text-[#111111] transition-colors cursor-pointer'
            aria-label='Wishlist'
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-[#F97316] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full'>
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={openCart}
            className='relative text-[#555555] hover:text-[#111111] transition-colors'
            aria-label='Cart'
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-[#F97316] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full'>
                {itemCount}
              </span>
            )}
          </button>
          <button
            className='lg:hidden text-[#555555] hover:text-[#111111]'
            onClick={() => setMobileOpen((v) => !v)}
            aria-label='Menu'
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      {activeCategory && (
        <div onMouseEnter={() => setActiveCategory(activeCategory)}>
          {categories
            .filter((c) => c.slug === activeCategory)
            .map((cat) => (
              <MegaMenu key={cat.slug} category={cat} />
            ))}
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden border-t border-[#E5E5E5] bg-white overflow-y-auto transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        {categories.map((cat) => (
          <div key={cat.slug} className='border-b border-[#E5E5E5]'>
            <button
              className='w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-[#111111] cursor-pointer'
              onClick={() =>
                setMobileExpanded((v) => (v === cat.slug ? null : cat.slug))
              }
            >
              {cat.name}
              <span
                className='text-[#999999] transition-transform duration-200'
                style={{
                  transform:
                    mobileExpanded === cat.slug
                      ? "rotate(45deg)"
                      : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${mobileExpanded === cat.slug ? "max-h-96" : "max-h-0"}`}
            >
              <div className='px-6 pb-4 grid grid-cols-2 gap-2'>
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/${cat.slug}/${sub.slug}`}
                    className='text-sm text-[#555555] hover:text-[#1B5DBE] py-1 transition-colors cursor-pointer'
                    onClick={() => setMobileOpen(false)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
