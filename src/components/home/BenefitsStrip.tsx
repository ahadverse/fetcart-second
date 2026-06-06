import { Truck, RotateCcw, ShieldCheck } from 'lucide-react'

const benefits = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: ShieldCheck, title: 'Secure Checkout', desc: 'SSL encrypted payment' },
]

export default function BenefitsStrip() {
  return (
    <section className="border-y border-[#E5E5E5] bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5]">
        {benefits.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-4 py-4 sm:py-0 sm:px-8 sm:first:pl-0 sm:last:pr-0">
            <Icon size={24} className="text-[#1B5DBE] shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#111111]">{title}</p>
              <p className="text-xs text-[#999999]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
