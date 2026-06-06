import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Briefcase, Users, TrendingUp, Heart } from 'lucide-react'

export const metadata: Metadata = { title: 'Careers' }

const benefits = [
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision coverage for you and your family.' },
  { icon: TrendingUp, title: 'Growth & Learning', desc: 'Annual learning budget, mentorship programs, and clear career progression.' },
  { icon: Users, title: 'Inclusive Culture', desc: 'A diverse team that celebrates every background, perspective, and voice.' },
  { icon: Briefcase, title: 'Flexible Work', desc: 'Hybrid schedule, remote-first roles, and generous paid time off.' },
]

const openings = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', location: 'Remote (Global)', type: 'Full-time', slug: 'senior-frontend-engineer' },
  { title: 'Product Manager — Marketplace', dept: 'Product', location: 'Dhaka, BD · Hybrid', type: 'Full-time', slug: 'product-manager-marketplace' },
  { title: 'UX Designer', dept: 'Design', location: 'Remote (APAC)', type: 'Full-time', slug: 'ux-designer' },
  { title: 'Customer Success Specialist', dept: 'Operations', location: 'Dhaka, BD · On-site', type: 'Full-time', slug: 'customer-success-specialist' },
]

export default function CareersPage() {
  return (
    <div className="animate-fadeInUp">
      {/* Hero */}
      <section className="bg-[#1B5DBE] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-200 mb-4">We&apos;re Hiring</p>
          <h1 className="text-4xl font-light mb-6 leading-tight">Build the future of commerce with us</h1>
          <p className="text-lg text-blue-100 leading-relaxed max-w-xl mx-auto">
            FetKart is on a mission to make quality products accessible to everyone. Join a team that ships fast, cares deeply, and grows together.
          </p>
          <a
            href="#openings"
            className="inline-flex items-center gap-2 mt-8 bg-white text-[#1B5DBE] text-sm font-semibold px-6 py-3 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            View Open Roles <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-light text-[#111111] mb-10 text-center">Why FetKart?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <Icon size={22} className="text-[#1B5DBE]" />
              </div>
              <h3 className="text-sm font-semibold text-[#111111]">{title}</h3>
              <p className="text-sm text-[#555555] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section id="openings" className="bg-[#F8F8F8] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-[#111111] mb-8">Open Positions</h2>
          <div className="space-y-4">
            {openings.map(job => (
              <div
                key={job.slug}
                className="bg-white border border-[#E5E5E5] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-[#1B5DBE] transition-colors group"
              >
                <div>
                  <h3 className="text-base font-medium text-[#111111] group-hover:text-[#1B5DBE] transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-xs text-[#999999]">{job.dept}</span>
                    <span className="text-[#E5E5E5]">·</span>
                    <span className="flex items-center gap-1 text-xs text-[#999999]">
                      <MapPin size={11} />{job.location}
                    </span>
                    <span className="text-[#E5E5E5]">·</span>
                    <span className="flex items-center gap-1 text-xs text-[#999999]">
                      <Clock size={11} />{job.type}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/contact`}
                  className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-[#1B5DBE] hover:underline cursor-pointer"
                >
                  Apply <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#999999] text-center">
            Don&apos;t see the right role?{' '}
            <Link href="/contact" className="text-[#1B5DBE] hover:underline cursor-pointer">
              Send us your CV anyway
            </Link>
            {' '}— we&apos;re always looking for talent.
          </p>
        </div>
      </section>
    </div>
  )
}
