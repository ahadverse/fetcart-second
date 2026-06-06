import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-light text-[#111111] mb-8">Terms & Conditions</h1>
      <div className="space-y-6 text-sm text-[#555555] leading-relaxed">
        {[
          ['Acceptance of Terms', 'By using FetKart, you agree to these terms. If you do not agree, please do not use our service.'],
          ['Use of Site', 'FetKart is for personal, non-commercial use only. You may not use the site for any unlawful purpose or to infringe upon the rights of others.'],
          ['Product Information', 'We make every effort to display products accurately. Colours may vary slightly due to screen differences. Prices and availability are subject to change.'],
          ['Orders & Payment', 'All orders are subject to acceptance and availability. We reserve the right to refuse any order. Payment must be made in full at time of order.'],
          ['Intellectual Property', 'All content on FetKart, including images, text, and logos, is the property of FetKart and may not be reproduced without written permission.'],
          ['Limitation of Liability', 'FetKart is not liable for any indirect, incidental, or consequential damages arising from your use of the site or products.'],
          ['Changes to Terms', 'We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.'],
        ].map(([title, content]) => (
          <section key={title as string}>
            <h2 className="text-base font-semibold text-[#111111] mb-2">{title}</h2>
            <p>{content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
