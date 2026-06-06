import Link from 'next/link'
import { CheckCircle, Package, Mail } from 'lucide-react'

export default function ThankYouPage() {
  const orderNumber = `FK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <CheckCircle size={56} className="text-[#2e7d32] mb-6" />
      <h1 className="text-2xl font-light text-[#111111] mb-2">Order Confirmed!</h1>
      <p className="text-sm text-[#999999] mb-1">Order #{orderNumber}</p>
      <p className="text-sm text-[#555555] max-w-sm mb-10">
        Thank you for shopping with FetKart. We&apos;ll send a confirmation to your email shortly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-sm w-full mb-10">
        <div className="flex flex-col items-center gap-2 p-5 border border-[#E5E5E5]">
          <Package size={24} className="text-[#1B5DBE]" />
          <p className="text-xs font-semibold">Estimated Delivery</p>
          <p className="text-xs text-[#999999]">3–7 business days</p>
        </div>
        <div className="flex flex-col items-center gap-2 p-5 border border-[#E5E5E5]">
          <Mail size={24} className="text-[#1B5DBE]" />
          <p className="text-xs font-semibold">Confirmation Email</p>
          <p className="text-xs text-[#999999]">Sent to your inbox</p>
        </div>
      </div>

      <Link
        href="/"
        className="bg-[#1B5DBE] text-white text-sm font-semibold tracking-widest uppercase px-10 py-4 hover:bg-[#154aa0] transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  )
}
