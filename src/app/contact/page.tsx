import type { Metadata } from 'next'
import { MapPin, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = { title: 'Contact Us' }

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-light text-[#111111] mb-12">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form */}
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First name" className="border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
            <input placeholder="Last name" className="border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
          </div>
          <input type="email" placeholder="Email address" className="w-full border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
          <input placeholder="Subject" className="w-full border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE]" />
          <textarea
            placeholder="Your message"
            rows={5}
            className="w-full border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-[#1B5DBE] resize-none"
          />
          <button type="submit" className="w-full bg-[#1B5DBE] text-white text-sm font-semibold tracking-wide py-3.5 hover:bg-[#154aa0] transition-colors">
            Send Message
          </button>
        </form>

        {/* Info */}
        <div className="space-y-6">
          <p className="text-sm text-[#555555] leading-relaxed">
            Our support team is available Monday–Friday, 9am–6pm EST. We aim to respond within 24 hours.
          </p>
          <div className="space-y-4">
            {[
              { icon: MapPin, text: '123 Commerce Street, New York, NY 10001' },
              { icon: Phone, text: '+1 (800) 328-2276' },
              { icon: Mail, text: 'support@fetkart.com' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon size={18} className="text-[#1B5DBE] shrink-0 mt-0.5" />
                <p className="text-sm text-[#555555]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
