'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'
import { Material } from '@/lib/db'
import ConsultationButton from '@/components/consultation-button'

export default function Materials() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('/api/materials')
        if (response.ok) {
          const data = await response.json()
          setMaterials(data.materials || [])
        }
      } catch (error) {
        console.error('[v0] Failed to fetch materials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [])

  // Get unique categories
  const categories = ['All', ...new Set(materials.map((m) => m.category))]

  // Filter materials by category
  const filteredMaterials =
    selectedCategory === 'All'
      ? materials
      : materials.filter((m) => m.category === selectedCategory)

  return (
    <section id="materials" className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 via-transparent to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-space-grotesk">
            Choosing the Right <span className="gradient-text">Materials</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl">
            Explore our comprehensive catalog of premium stone materials, each selected for durability, 
            aesthetic appeal, and suitability for diverse architectural applications.
          </p>
        </div>

        {/* Category Filter - Mobile responsive */}
        <motion.div 
          className="mb-8 sm:mb-12 overflow-x-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-2 sm:gap-3 min-w-min sm:min-w-0 flex-wrap">
            {categories.map((category, idx) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50'
                    : 'glass border border-white/10 hover:border-orange-500/50 text-gray-300 hover:text-white'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Materials Grid - Mobile-first responsive */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-3">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="glass rounded-lg sm:rounded-xl border border-white/10 overflow-hidden h-32 sm:h-40 animate-pulse"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
              >
                <div className="h-20 sm:h-24 bg-gradient-to-r from-white/5 to-white/10" />
                <div className="p-2 sm:p-2 space-y-2">
                  <div className="h-2 bg-white/10 rounded w-2/3" />
                  <div className="h-1.5 bg-white/10 rounded w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : filteredMaterials.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-400 text-base sm:text-lg">No materials found in this category.</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {filteredMaterials.map((material) => (
              <motion.div
                key={material.id}
                variants={itemVariants}
                className="group glass overflow-hidden rounded-lg sm:rounded-xl border border-white/10 cursor-pointer h-full flex flex-col transition-all duration-300 hover:border-orange-500/50"
                whileHover={{ 
                  y: -3,
                  boxShadow: '0 10px 20px rgba(255, 140, 66, 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setExpandedId(expandedId === material.id ? null : material.id)}
              >
                {/* Image Container - Optimized for mobile */}
                <div className="relative h-20 sm:h-24 md:h-28 overflow-hidden bg-gray-900 flex-shrink-0">
                  <motion.img
                    src={material.imageUrl}
                    alt={material.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 px-2.5 sm:px-3 py-1 bg-orange-500/85 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-orange-400/30"
                    whileHover={{ scale: 1.12, boxShadow: '0 0 20px rgba(255, 140, 66, 0.6)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {material.category}
                  </motion.div>
                </div>

                {/* Content - Compact on mobile */}
                <div className="p-2 sm:p-2.5 bg-white/5 flex-1 flex flex-col">
                  <motion.h3 
                    className="text-sm sm:text-base font-bold text-white mb-1 font-space-grotesk line-clamp-1"
                    whileHover={{ color: '#ff8c42' }}
                  >
                    {material.name}
                  </motion.h3>

                  <p className="text-gray-300 text-xs line-clamp-1 flex-1">
                    {material.description}
                  </p>

                  {/* Details Toggle Button */}
                  <motion.button
                    className="flex items-center justify-between w-full p-1.5 rounded-md text-xs mt-1 bg-white/5 border border-white/10 transition-all duration-300 group-hover:border-orange-500/50"
                    whileHover={{ 
                      backgroundColor: 'rgba(255, 140, 66, 0.15)',
                      borderColor: 'rgba(255, 140, 66, 0.5)'
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="font-medium text-gray-300 group-hover:text-orange-400 transition-colors">
                      {expandedId === material.id ? 'Hide' : 'Info'}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedId === material.id ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="w-4 h-4 text-orange-400" />
                    </motion.div>
                  </motion.button>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {expandedId === material.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        {/* Key Specs - Compact layout */}
                        <div className="space-y-0.5 mb-2 text-xs p-1.5 rounded-md bg-white/5 border border-white/10">
                          <motion.div 
                            className="flex justify-between gap-1"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 }}
                          >
                            <span className="text-gray-400 font-medium text-xs">Durability:</span>
                            <span className="text-orange-400 font-semibold text-xs text-right">{material.durability}</span>
                          </motion.div>
                          <motion.div 
                            className="flex justify-between gap-1"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 }}
                          >
                            <span className="text-gray-400 font-medium text-xs">Cost:</span>
                            <span className="text-orange-400 font-semibold text-xs">{material.cost}</span>
                          </motion.div>
                          <motion.div 
                            className="flex justify-between gap-1"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.11 }}
                          >
                            <span className="text-gray-400 font-medium text-xs">Maint:</span>
                            <span className="text-orange-400 font-semibold text-xs">{material.maintenance}</span>
                          </motion.div>
                          <motion.div 
                            className="flex justify-between gap-1"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.14 }}
                          >
                            <span className="text-gray-400 font-medium text-xs">Use:</span>
                            <span className="text-orange-400 font-semibold text-xs text-right leading-tight">{material.applications}</span>
                          </motion.div>
                        </div>

                        {/* Features Tags - Optimized for mobile */}
                        {material.features && material.features.length > 0 && (
                          <motion.div 
                            className="flex flex-wrap gap-0.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {material.features.slice(0, 2).map((feature, idx) => (
                              <motion.span
                                key={idx}
                                className="px-1.5 py-0.5 bg-orange-500/20 border border-orange-500/40 text-orange-100 text-xs rounded-full hover:bg-orange-500/30 transition-all duration-200"
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + idx * 0.03 }}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 140, 66, 0.35)' }}
                              >
                                {feature}
                              </motion.span>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        {filteredMaterials.length > 0 && (
          <motion.div 
            className="mt-12 sm:mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
              Need help selecting the right material for your project?
            </p>
            <ConsultationButton size="lg" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
