'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-b border-white/10 py-8 sticky top-0 z-40"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-4 w-fit">
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold font-space-grotesk">Privacy Policy</h1>
          <p className="text-gray-400 mt-2">Last updated: January 2025</p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-invert max-w-none"
        >
          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                Octo 21st Stone Technology ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            {/* Information Collection */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">Contact Information</h3>
                  <p className="text-gray-300">
                    When you submit a consultation request through our contact form, we collect your name, email address, phone number, project type, and message content.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">Automatic Information</h3>
                  <p className="text-gray-300">
                    We automatically collect certain information about your device and how you interact with our website, including browser type, IP address, and pages visited.
                  </p>
                </div>
              </div>
            </section>

            {/* Use of Information */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">How We Use Your Information</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>Process and respond to your consultation requests</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>Improve and personalize your experience on our website</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>Send promotional emails and updates (with your consent)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>Comply with legal obligations and protect our rights</span>
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is entirely secure.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Cookies and Tracking</h2>
              <p className="text-gray-300 leading-relaxed">
                Our website may use cookies to enhance your browsing experience. These small files help us understand how you use our site and improve functionality. You can control cookie settings through your browser preferences.
              </p>
            </section>

            {/* Third Party */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Third-Party Services</h2>
              <p className="text-gray-300 leading-relaxed">
                We may share your information with third-party service providers who assist us in operating our website, conducting business, or providing services to you. These providers are contractually obligated to maintain your information confidentially.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Your Privacy Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>The right to access your personal information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>The right to request deletion of your information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>The right to opt-out of marketing communications</span>
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@octo21st.com or visit our contact page.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Policy Changes</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date above. Your continued use of our website constitutes acceptance of any changes.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
