'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'

const testimonials = [
  {
    name: 'Arch. Chioma Okafor',
    role: 'Principal Architect',
    company: 'Lagos Design Studios',
    text: 'Working with Octo 21st Stone Technology was exceptional. Their expertise in stone selection and installation quality exceeded all our expectations. The building facade is stunning and performing beautifully.',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20-%20Copy-5TXvy836rjWOFMLMeBR3Mk2Vm25aFQ.png',
  },
  {
    name: 'Engr. Adeyemi Hassan',
    role: 'Project Manager',
    company: 'Central Construction Ltd',
    text: 'Professional, reliable, and detail-oriented. From initial consultation to final installation, every step was handled with precision. Our clients are extremely satisfied with the results.',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20-%20Copy-5TXvy836rjWOFMLMeBR3Mk2Vm25aFQ.png',
  },
  {
    name: 'Dr. Oluwaseun Adekunle',
    role: 'Facilities Manager',
    company: 'Financial Institution',
    text: 'The stone cladding has transformed our building&apos;s appearance while providing excellent thermal performance. We&apos;ve seen measurable reductions in energy costs since completion.',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20-%20Copy-5TXvy836rjWOFMLMeBR3Mk2Vm25aFQ.png',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-green-500/10 via-transparent to-transparent blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-12 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-space-grotesk">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Trusted by architects, developers, and facility managers across Africa.
          </p>
        </motion.div>

        {/* Testimonials Grid - Responsive */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group glass p-3 sm:p-5 lg:p-7 rounded-lg sm:rounded-xl border border-white/10 relative overflow-hidden transition-all duration-300 hover:border-orange-500/50"
              whileHover={{ 
                y: -6,
                boxShadow: '0 20px 40px rgba(255, 140, 66, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col h-full">
                {/* Stars - Compact on mobile */}
                <motion.div 
                  className="flex gap-0.5 mb-2 sm:mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star
                        className="h-3.5 sm:h-4 w-3.5 sm:w-4 fill-orange-400 text-orange-400"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Testimonial Text - Optimized for mobile */}
                <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed italic text-xs sm:text-sm flex-1 line-clamp-3 sm:line-clamp-4">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author with Avatar */}
                <div className="border-t border-white/10 pt-3 sm:pt-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {/* Avatar Image - Responsive sizing */}
                    <motion.div 
                      className="relative h-10 sm:h-12 w-10 sm:w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-orange-400/50"
                      whileHover={{ scale: 1.12, boxShadow: '0 0 15px rgba(255, 140, 66, 0.5)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Author Info - Compact */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white font-space-grotesk text-xs sm:text-sm truncate group-hover:text-orange-400 transition-colors">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{testimonial.role}</p>
                      <p className="text-xs text-orange-400 font-medium truncate">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
