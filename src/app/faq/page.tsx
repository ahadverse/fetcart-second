'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3-7 business days. Expedited options are available at checkout.' },
  { q: 'Is shipping free?', a: 'Yes — all orders over $50 ship free. Orders under $50 have a flat $5.99 shipping fee.' },
  { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unused and in original packaging. Start a return from your order confirmation email.' },
  { q: 'Do you ship internationally?', a: 'We currently ship to the US, Canada, UK, and Australia. More countries are coming soon.' },
  { q: 'How do I track my order?', a: 'Once shipped, you will receive an email with a tracking number. Use it on our carrier\'s website to follow your delivery.' },
  { q: 'Can I cancel or change an order?', a: 'Orders can be cancelled or changed within 1 hour of placement. Contact us immediately at support@fetkart.com.' },
  { q: 'Are the products authentic?', a: 'Absolutely. We only source products directly from brands or authorised distributors. 100% authentic, guaranteed.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay.' },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-light text-[#111111] mb-12">Frequently Asked Questions</h1>
      <div className="space-y-0">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-[#E5E5E5]">
            <button
              onClick={() => setOpen(v => v === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-sm font-medium text-[#111111] hover:text-[#1B5DBE] transition-colors text-left"
            >
              {faq.q}
              <ChevronDown size={16} className={`shrink-0 ml-4 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <p className="pb-5 text-sm text-[#555555] leading-relaxed">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
