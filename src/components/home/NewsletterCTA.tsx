import { Mail, Tag, Zap } from 'lucide-react'

const perks = [
  { icon: Tag, text: 'Exclusive member discounts' },
  { icon: Zap, text: 'Early access to sales' },
  { icon: Mail, text: 'New arrivals first' },
]

export default function NewsletterCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a1628] text-white py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #1B5DBE 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F97316 0%, transparent 40%)',
        }}
      />
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.01) 40px, rgba(255,255,255,0.01) 80px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#F97316] border border-[#F97316]/40 bg-[#F97316]/10 px-3 py-1 rounded-full mb-5">
              Members Only
            </span>
            <h2 className="text-3xl lg:text-4xl font-light leading-tight mb-4">
              Shop smarter.<br />
              <span className="font-semibold text-white">Save more.</span>
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              Join 200,000+ subscribers who never miss a deal. Get early access to exclusive sales and curated picks delivered to your inbox.
            </p>
            <div className="space-y-3">
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#1B5DBE]/20 flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-[#1B5DBE]" />
                  </div>
                  <span className="text-sm text-white/70">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <p className="text-lg font-medium mb-1">Get your first deal today</p>
            <p className="text-xs text-white/50 mb-6">No spam. Unsubscribe anytime.</p>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm px-4 py-3.5 rounded-lg focus:outline-none focus:border-[#1B5DBE] transition-colors"
              />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm px-4 py-3.5 rounded-lg focus:outline-none focus:border-[#1B5DBE] transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#F97316] hover:bg-[#ea6a0a] text-white text-sm font-bold tracking-widest uppercase py-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.99]"
              >
                Join Free — Get 10% Off
              </button>
            </form>
            <p className="text-[10px] text-white/30 text-center mt-4">
              By subscribing you agree to our Privacy Policy
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
