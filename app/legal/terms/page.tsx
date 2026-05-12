'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
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
          <h1 className="text-4xl sm:text-5xl font-bold font-space-grotesk">Terms of Service</h1>
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
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Agreement</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms of Service ("Terms") govern your use of the Octo 21st Stone Technology website ("Website") and services. By accessing and using this Website, you accept and agree to be bound by these Terms. If you do not agree to these Terms, do not use this Website.
              </p>
            </section>

            {/* Use License */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Use License</h2>
              <p className="text-gray-300 leading-relaxed">
                You are granted a limited, non-exclusive, non-transferable license to access and use this Website for lawful purposes only. You may not:
              </p>
              <ul className="space-y-3 text-gray-300 mt-4">
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>Violate any laws or regulations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>Infringe upon intellectual property rights</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>Harass, abuse, or threaten others</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>Submit false or misleading information</span>
                </li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-300 leading-relaxed">
                The Website and its content are provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the Website's operation or the information, content, or materials included on the Website. To the fullest extent permissible by law, we disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
              </p>
            </section>

            {/* Limitations */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                In no event shall Octo 21st Stone Technology be liable for any direct, indirect, incidental, special, or consequential damages arising out of or related to your use of the Website, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Intellectual Property Rights</h2>
              <p className="text-gray-300 leading-relaxed">
                All content on this Website, including text, graphics, logos, images, and software, is the property of Octo 21st Stone Technology or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
              </p>
            </section>

            {/* User Submissions */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">User Submissions</h2>
              <p className="text-gray-300 leading-relaxed">
                Any information you submit through our Website, including consultation requests and messages, may be used by us for business purposes. You represent and warrant that you own or have the necessary rights to the information you submit.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Indemnification</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to indemnify and hold harmless Octo 21st Stone Technology, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your violation of these Terms or your use of the Website.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Modifications to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website following any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to terminate your access to the Website at any time and for any reason, without notice or liability.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law principles.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold font-space-grotesk mb-4">Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have questions about these Terms of Service, please contact us through our website contact page or email us at legal@octo21st.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
