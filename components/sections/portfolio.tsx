'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { containerVariants, itemVariants } from '@/lib/animations'

const projects = [
  {
    title: 'Central Bank of Nigeria - Ibadan',
    location: 'Ibadan, Nigeria',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/engineered_facade_detail.jpg%20-%20Copy%20-%20Copy-jH7bCc3bqM5kAWesV9qFSb5Iddv423.png',
    description: 'Premium stone facade installation for iconic financial institution',
  },
  {
    title: 'Modern Commercial Complex',
    location: 'Abuja, Nigeria',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern_building_rainscreen.jpg%20-%20Copy-cZoiVF0UwkzNB3iqa4HjWcLI3XYpE2.png',
    description: 'Complete stone cladding system with thermal performance optimization',
  },
  {
    title: 'Luxury Residential Development',
    location: 'Istanbul, Turkey',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project-building-1.png-EO3SIth9pBZ33WMLgB0y2qZe5t98VW.png',
    description: 'Sultangazi Hastane ve Fakülte Binaları - Prestigious stone facade',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-green-500/10 via-transparent to-transparent blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-space-grotesk">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl">
            A selection of our most prestigious stone cladding installations across Africa and international markets.
          </p>
        </motion.div>

        {/* Projects Grid - Responsive */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group glass overflow-hidden rounded-xl border border-white/10 hover:border-orange-500/50 cursor-pointer"
              whileHover={{ y: -8 }}
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-900">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <motion.div 
                className="p-4 sm:p-6 bg-white/5"
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
              >
                <motion.h3 
                  className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 font-space-grotesk line-clamp-2"
                  whileHover={{ color: '#ea580c' }}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="text-xs sm:text-sm text-orange-400 font-medium mb-2 sm:mb-3"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {project.location}
                </motion.p>
                <p className="text-gray-300 text-xs sm:text-sm line-clamp-2">
                  {project.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
            See more of our completed projects and case studies
          </p>
          <motion.button 
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm sm:text-base rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
