import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About FetKart' }

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-light text-[#111111] mb-6">About FetKart</h1>
      <div className="space-y-5 text-sm text-[#555555] leading-relaxed">
        <p>
          FetKart is a general-purpose online marketplace committed to bringing quality products
          across every major category — from cutting-edge electronics and everyday fashion to home
          essentials, health &amp; beauty, and outdoor gear.
        </p>
        <p>
          Founded with a simple mission: make great products accessible to everyone, delivered fast,
          returned easily. We partner with trusted brands to curate a selection that prioritises
          quality, value, and customer satisfaction.
        </p>
        <p>
          Every order ships with care. Every return is hassle-free. Every product is handpicked.
        </p>
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E5E5E5]">
          {[['10K+', 'Products'], ['50+', 'Brands'], ['30-day', 'Returns']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-semibold text-[#1B5DBE]">{val}</p>
              <p className="text-xs text-[#999999] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
