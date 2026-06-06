'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const steps = ['Cart', 'Information', 'Shipping', 'Payment']

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [step] = useState(1)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', phone: '',
  })

  function handle(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    clearCart()
    router.push('/thank-you')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[#999999]">Your cart is empty.</p>
        <Link href="/" className="text-sm font-medium text-[#1B5DBE] hover:underline">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — Form */}
      <div className="px-6 md:px-12 lg:px-16 py-12 max-w-2xl w-full mx-auto lg:mx-0 lg:ml-auto">
        {/* Logo */}
        <Link href="/" className="block mb-8">
          <div className="relative w-32 h-9">
            <Image src="/logo.svg" alt="FetKart" fill className="object-contain object-left" />
          </div>
        </Link>

        {/* Steps */}
        <nav className="flex items-center gap-1 text-xs text-[#999999] mb-8">
          {steps.map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} />}
              <span className={i === step ? 'text-[#111111] font-medium' : ''}>{s}</span>
            </span>
          ))}
        </nav>

        <form onSubmit={submit} className="space-y-6">
          {/* Contact */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-[#111111]">Contact</h2>
              <Link href="/" className="text-xs text-[#1B5DBE] hover:underline">Sign in</Link>
            </div>
            <input
              name="email" type="email" placeholder="Email" required value={form.email} onChange={handle}
              className="w-full border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]"
            />
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-base font-semibold text-[#111111] mb-3">Shipping Address</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="firstName" placeholder="First name" required value={form.firstName} onChange={handle}
                  className="border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
                <input name="lastName" placeholder="Last name" required value={form.lastName} onChange={handle}
                  className="border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
              </div>
              <input name="address" placeholder="Address" required value={form.address} onChange={handle}
                className="w-full border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
              <div className="grid grid-cols-2 gap-3">
                <input name="city" placeholder="City" required value={form.city} onChange={handle}
                  className="border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
                <input name="zip" placeholder="Postal code" value={form.zip} onChange={handle}
                  className="border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
              </div>
              <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handle}
                className="w-full border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="/" className="text-xs text-[#555555] hover:text-[#111111] flex items-center gap-1">
              ← Return to cart
            </Link>
            <button
              type="submit"
              className="bg-[#1B5DBE] text-white text-sm font-semibold tracking-wide px-8 py-4 hover:bg-[#154aa0] transition-colors"
            >
              Continue to shipping
            </button>
          </div>
        </form>

        <div className="mt-10 pt-6 border-t border-[#E5E5E5] flex flex-wrap gap-4 text-xs text-[#999999]">
          <Link href="/refund-policy" className="hover:text-[#111111]">Refund policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-[#111111]">Terms</Link>
          <Link href="/contact" className="hover:text-[#111111]">Contact</Link>
        </div>
      </div>

      {/* Right — Order summary */}
      <div className="bg-[#F8F8F8] border-l border-[#E5E5E5] px-6 md:px-12 lg:px-16 py-12 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="max-w-lg mx-auto lg:mx-0 space-y-6">
          <h2 className="text-sm font-semibold text-[#111111] mb-4">Order Summary</h2>

          {/* Items */}
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex items-center gap-4">
                <div className="relative w-14 h-14 bg-white border border-[#E5E5E5] shrink-0">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="56px" />
                  <span className="absolute -top-2 -right-2 bg-[#555555] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#111111] line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-[#999999]">{item.product.brand}</p>
                </div>
                <p className="text-sm font-medium shrink-0">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Discount */}
          <div className="flex gap-2">
            <input
              placeholder="Discount code or gift card"
              className="flex-1 border border-[#E5E5E5] bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B5DBE]"
            />
            <button className="border border-[#E5E5E5] bg-white text-sm px-4 py-2.5 hover:bg-[#F8F8F8] transition-colors">
              Apply
            </button>
          </div>

          {/* Totals */}
          <div className="space-y-2 border-t border-[#E5E5E5] pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#555555]">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#555555]">Shipping</span>
              <span className="text-[#999999]">{total >= 50 ? 'Free' : 'Calculated at next step'}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-[#E5E5E5]">
              <span>Total</span>
              <span>USD ${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Trust */}
          <div className="space-y-2 pt-2 text-xs text-[#999999]">
            <p className="font-medium text-[#111111]">Satisfaction Guaranteed</p>
            <p>We offer 30-day hassle-free returns on all orders.</p>
            <p className="font-medium text-[#111111] pt-1">Easy Returns</p>
            <p>Start a return from your order confirmation email.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
