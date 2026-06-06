import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Download, ExternalLink } from 'lucide-react'

export const metadata: Metadata = { title: 'Press' }

const releases = [
  {
    date: 'May 28, 2026',
    title: 'FetKart Surpasses 500,000 Active Customers in its First Year',
    excerpt: 'The Dhaka-based e-commerce platform has seen exceptional growth, driven by its curated product selection across five major categories and a seamless shopping experience.',
  },
  {
    date: 'March 12, 2026',
    title: 'FetKart Launches Same-Day Delivery in Dhaka Metropolitan Area',
    excerpt: 'Partnering with leading local logistics providers, FetKart now offers same-day delivery for thousands of eligible products to customers across the Dhaka metro region.',
  },
  {
    date: 'January 5, 2026',
    title: 'FetKart Opens Applications for the 2026 Merchant Partner Program',
    excerpt: "The Merchant Partner Program invites curated brands and artisans to list products on FetKart's platform, giving them access to marketing tools and a growing customer base.",
  },
]

export default function PressPage() {
  return (
    <div className="animate-fadeInUp">
      {/* Hero */}
      <section className="border-b border-[#E5E5E5] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#1B5DBE] mb-3">Press &amp; Media</p>
          <h1 className="text-4xl font-light text-[#111111] mb-4">FetKart in the news</h1>
          <p className="text-base text-[#555555] leading-relaxed">
            For press enquiries, media kits, or interview requests, please contact our communications team.
          </p>
          <a
            href="mailto:press@fetkart.com"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-white bg-[#1B5DBE] px-5 py-3 hover:bg-[#154aa0] transition-colors cursor-pointer"
          >
            <Mail size={16} />
            press@fetkart.com
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Press releases */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-[#111111] mb-6">Recent Press Releases</h2>
          <div className="space-y-8">
            {releases.map(r => (
              <article key={r.title} className="border-b border-[#E5E5E5] pb-8 last:border-0">
                <time className="text-xs text-[#999999] font-medium">{r.date}</time>
                <h3 className="text-base font-medium text-[#111111] mt-2 mb-3 hover:text-[#1B5DBE] transition-colors cursor-pointer">
                  {r.title}
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">{r.excerpt}</p>
                <button className="flex items-center gap-1.5 mt-4 text-sm text-[#1B5DBE] hover:underline cursor-pointer">
                  Read full release <ExternalLink size={13} />
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Brand assets */}
          <div>
            <h2 className="text-lg font-semibold text-[#111111] mb-4">Brand Assets</h2>
            <div className="space-y-3">
              {[
                { label: 'Logo Pack (SVG + PNG)', size: '2.1 MB' },
                { label: 'Brand Guidelines PDF', size: '4.8 MB' },
                { label: 'Photography Kit', size: '18 MB' },
              ].map(asset => (
                <div
                  key={asset.label}
                  className="flex items-center justify-between border border-[#E5E5E5] px-4 py-3 hover:border-[#1B5DBE] transition-colors group cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-[#111111] group-hover:text-[#1B5DBE] transition-colors">{asset.label}</p>
                    <p className="text-xs text-[#999999]">{asset.size}</p>
                  </div>
                  <Download size={16} className="text-[#999999] group-hover:text-[#1B5DBE] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick facts */}
          <div>
            <h2 className="text-lg font-semibold text-[#111111] mb-4">Quick Facts</h2>
            <dl className="space-y-3">
              {[
                { label: 'Founded', value: '2025' },
                { label: 'Headquarters', value: 'Dhaka, Bangladesh' },
                { label: 'Products listed', value: '125,000+' },
                { label: 'Active customers', value: '500,000+' },
                { label: 'Categories', value: '5 major, 25 subcategories' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <dt className="text-[#999999]">{label}</dt>
                  <dd className="font-medium text-[#111111]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
