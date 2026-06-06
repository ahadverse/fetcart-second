'use client'

import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, total, itemCount } = useCart()
  const freeShippingThreshold = 50
  const remaining = Math.max(0, freeShippingThreshold - total)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
          <h2 className="text-sm font-semibold tracking-wider uppercase">
            Shopping Bag {itemCount > 0 && <span className="text-[#999999]">({itemCount})</span>}
          </h2>
          <button onClick={closeCart} className="text-[#555555] hover:text-[#111111] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Free shipping bar */}
        {remaining > 0 && (
          <div className="px-6 py-3 bg-[#F8F8F8] border-b border-[#E5E5E5]">
            <p className="text-xs text-[#555555]">
              Add <span className="font-semibold text-[#1B5DBE]">${remaining.toFixed(2)}</span> more for free shipping
            </p>
            <div className="mt-1.5 h-1 bg-[#E5E5E5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1B5DBE] rounded-full transition-all"
                style={{ width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}
        {remaining === 0 && total > 0 && (
          <div className="px-6 py-3 bg-[#F8F8F8] border-b border-[#E5E5E5]">
            <p className="text-xs font-medium text-[#2e7d32]">Your cart qualifies for free shipping!</p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-[#E5E5E5]" />
              <p className="text-sm text-[#999999]">Your bag is empty</p>
              <button
                onClick={closeCart}
                className="text-sm font-medium text-[#1B5DBE] hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.product.id}-${item.selectedColor ?? 'none'}`} className="flex gap-4">
                <div className="relative w-20 h-20 shrink-0 bg-[#F8F8F8]">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-[#999999]">{item.product.brand}</p>
                      <p className="text-sm font-medium text-[#111111] leading-snug line-clamp-2">
                        {item.product.name}
                      </p>
                      {item.selectedColor && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-3 h-3 rounded-full border border-[#E5E5E5]" style={{ backgroundColor: item.selectedColor }} />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-[#999999] hover:text-[#111111] shrink-0 cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-[#E5E5E5]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="w-7 h-7 flex items-center justify-center text-[#555555] hover:bg-[#F8F8F8] transition-colors cursor-pointer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        className="w-7 h-7 flex items-center justify-center text-[#555555] hover:bg-[#F8F8F8] transition-colors cursor-pointer"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E5E5E5] px-6 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#555555]">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-[#999999]">Shipping & taxes calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#111111] text-white text-sm font-medium text-center py-4 hover:bg-[#333333] transition-colors tracking-wide"
            >
              Go To Checkout · ${total.toFixed(2)}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
