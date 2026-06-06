import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Refund Policy' }

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-light text-[#111111] mb-8">Refund Policy</h1>
      <div className="space-y-6 text-sm text-[#555555] leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-[#111111] mb-2">30-Day Returns</h2>
          <p>We accept returns within 30 days of the delivery date. Items must be unused, unworn, and in original packaging with all tags attached.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#111111] mb-2">How to Start a Return</h2>
          <p>Email support@fetkart.com with your order number and reason for return. We will send you a prepaid return label within 1 business day.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#111111] mb-2">Refund Timeline</h2>
          <p>Once we receive your return, refunds are processed within 3-5 business days to your original payment method.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#111111] mb-2">Non-Returnable Items</h2>
          <p>Personal care items, fragrances (opened), and digital products are non-returnable for hygiene reasons.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-[#111111] mb-2">Damaged or Wrong Items</h2>
          <p>If you receive a damaged or incorrect item, contact us within 7 days and we will send a replacement at no charge.</p>
        </section>
      </div>
    </div>
  )
}
