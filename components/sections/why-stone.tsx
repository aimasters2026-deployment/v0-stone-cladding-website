'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Zap,
  Shield,
  Lightbulb,
  TrendingUp,
  Droplet,
  Wind,
  Leaf,
  Layers,
} from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'

const benefits = [
  {
    icon: Droplet,
    title: 'Water-Resistant',
    description: 'Superior protection against moisture and weathering',
  },
  {
    icon: Zap,
    title: 'Energy Efficiency',
    description: 'Reduces HVAC reliance and lowers energy costs significantly',
  },
  {
    icon: Wind,
    title: 'Wind Resistance',
    description: 'Robust performance against extreme weather conditions',
  },
  {
    icon: Shield,
    title: 'Durability',
    description: 'Resistant to extreme temperatures, fire, and insects',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Sustainable choice with minimal environmental impact',
  },
  {
    icon: Layers,
    title: 'Zero Maintenance',
    description: 'Long-lasting beauty without ongoing upkeep',
  },
]

export default function WhyStone() {
  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[600px] bg-gradient-to-tl from-yellow-500/10 via-transparent to-transparent blur-3xl -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-12 sm:mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-space-grotesk">
            Why Choose <span className="gradient-text">Stone Cladding</span>?
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Stone cladding offers unmatched performance benefits that extend far beyond aesthetics. Transform your building into an energy-efficient, durable structure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Image */}
          <motion.div 
            className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project-building-1.png-EO3SIth9pBZ33WMLgB0y2qZe5t98VW.png"
              alt="Stone cladding technical details"
              className="w-full h-full object-cover rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 glass rounded-xl border border-white/10" />
          </motion.div>

          {/* Benefits Grid */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Key Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-3 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                variants={itemVariants}
                className="glass p-4 sm:p-6 rounded-lg sm:rounded-xl border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(255, 140, 66, 0.2)'
                }}
              >
                <motion.p 
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-1 sm:mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  30-40%
                </motion.p>
                <p className="text-xs sm:text-sm text-gray-400">Energy cost reduction potential</p>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="glass p-4 sm:p-6 rounded-lg sm:rounded-xl border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(255, 140, 66, 0.2)'
                }}
              >
                <motion.p 
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-1 sm:mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  50+
                </motion.p>
                <p className="text-xs sm:text-sm text-gray-400">Years lifespan with minimal maintenance</p>
              </motion.div>
            </motion.div>

            {/* Benefits List */}
            <motion.div 
              className="space-y-3 sm:space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 glass-sm rounded-lg hover:bg-white/10 transition-colors group"
                    whileHover={{ x: 4 }}
                  >
                    <motion.div 
                      className="flex-shrink-0 p-1.5 sm:p-2 bg-gradient-to-br from-orange-500/20 to-orange-400/10 rounded-lg h-fit border border-orange-500/20"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                    >
                      <Icon className="h-4 sm:h-5 w-4 sm:w-5 text-orange-400" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-white mb-0.5 sm:mb-1 font-space-grotesk text-sm sm:text-base group-hover:text-orange-400 transition-colors">
                        {benefit.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA Text */}
            <motion.div 
              className="pt-3 sm:pt-4 border-t border-white/10 glass-sm p-3 sm:p-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 italic text-xs sm:text-sm leading-relaxed">
                "Stone cladding is not just an aesthetic choice—it&apos;s a smart investment in your building&apos;s future performance and sustainability."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
