'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { slideInLeftVariants, slideInRightVariants, containerVariants, itemVariants } from '@/lib/animations'

export default function Overview() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-red-500/10 via-transparent to-transparent blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-space-grotesk">
            <span className="gradient-text">Simplifying</span> Wall Cladding
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            At Octo 21st Stone Technology, we combine expertise with premium materials to deliver exceptional stone wall cladding solutions that enhance building performance and aesthetics.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center"
        >
          {/* Image */}
          <motion.div variants={itemVariants} className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] group">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern_building_rainscreen.jpg%20-%20Copy-cZoiVF0UwkzNB3iqa4HjWcLI3XYpE2.png"
              alt="Modern building installation"
              fill
              className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 glass rounded-xl border border-white/10" />
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 font-space-grotesk">Our Expertise</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                With partnerships in Turkey and working with international partners like Neksan, we provide world-class stone cladding solutions tailored to your architectural vision and building requirements.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-bold text-white mb-2 text-sm sm:text-base">Complete Service Offering</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold mt-0.5">•</span>
                    <span>Professional consulting and facade design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>Premium Turkish stone and marble materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>Expert installation and quality assurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>Maintenance and repair services</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 glass-sm p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                <span className="font-bold text-white">In Partnership with Neksan</span> - Providing access to premium Turkish stone materials and international standards.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
