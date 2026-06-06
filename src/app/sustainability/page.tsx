import type { Metadata } from 'next'
import { Leaf, Users, Globe, Package, Recycle, Sun } from 'lucide-react'

export const metadata: Metadata = { title: 'Sustainability' }

const pillars = [
  {
    icon: Leaf,
    title: 'Environment',
    color: '#16a34a',
    bg: '#f0fdf4',
    points: [
      '40% of our packaging uses recycled or compostable materials',
      'Carbon-neutral shipping on all orders over $100',
      'Partnered with 12 certified sustainable suppliers',
      'On track for 100% renewable-energy warehousing by 2027',
    ],
  },
  {
    icon: Users,
    title: 'Community',
    color: '#1B5DBE',
    bg: '#eff6ff',
    points: [
      '1% of every order donated to local education initiatives',
      'SME mentorship program supporting 50+ small businesses',
      'Fair-wage commitment across our entire supply chain',
      'Annual scholarship fund for tech students in Bangladesh',
    ],
  },
  {
    icon: Globe,
    title: 'Supply Chain',
    color: '#F97316',
    bg: '#fff7ed',
    points: [
      'All vendors audited annually for ethical labour practices',
      'Conflict-mineral-free electronics sourcing policy',
      'Consolidated shipments reduce per-unit emissions by 22%',
      'Supplier diversity target: 30% women-owned businesses by 2026',
    ],
  },
]

const metrics = [
  { icon: Recycle, value: '40%', label: 'Recycled packaging', color: '#16a34a' },
  { icon: Package, value: '22%', label: 'Lower per-unit emissions', color: '#1B5DBE' },
  { icon: Sun, value: '2027', label: 'Renewable energy target', color: '#F97316' },
  { icon: Users, value: '50+', label: 'Small businesses supported', color: '#7c3aed' },
]

export default function SustainabilityPage() {
  return (
    <div className="animate-fadeInUp">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111111] text-white py-20 px-6">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #16a34a 0%, transparent 60%), radial-gradient(circle at 70% 50%, #1B5DBE 0%, transparent 60%)' }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-green-400 mb-4">Sustainability</p>
          <h1 className="text-4xl font-light mb-6 leading-tight">Commerce that cares about tomorrow</h1>
          <p className="text-lg text-[#999999] leading-relaxed max-w-xl mx-auto">
            We believe business and responsibility go hand in hand. Our sustainability commitments span the environment, our communities, and every link in our supply chain.
          </p>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="border-b border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {metrics.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="space-y-2">
              <Icon size={24} className="mx-auto" style={{ color }} />
              <p className="text-2xl font-semibold text-[#111111]">{value}</p>
              <p className="text-xs text-[#999999]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-light text-[#111111] mb-10 text-center">Our Three Pillars</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map(({ icon: Icon, title, color, bg, points }) => (
            <div key={title} className="border border-[#E5E5E5] p-8 space-y-5 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="text-lg font-medium text-[#111111]">{title}</h3>
              <ul className="space-y-3">
                {points.map(p => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-[#555555] leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8F8F8] py-12 px-6 text-center">
        <h2 className="text-xl font-light text-[#111111] mb-3">Want to partner with us?</h2>
        <p className="text-sm text-[#555555] mb-6 max-w-md mx-auto">
          If your brand shares our values around sustainability and ethical commerce, we&apos;d love to hear from you.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#111111] text-white text-sm font-medium px-6 py-3 hover:bg-[#333333] transition-colors cursor-pointer"
        >
          Get in Touch
        </a>
      </section>
    </div>
  )
}
