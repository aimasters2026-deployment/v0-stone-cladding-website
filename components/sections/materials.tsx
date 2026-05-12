'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { containerVariants, itemVariants } from '@/lib/animations'
import { Material } from '@/lib/db'

export default function Materials() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

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
        <div className="mb-8 sm:mb-12 overflow-x-auto">
          <div className="flex gap-2 sm:gap-3 min-w-min sm:min-w-0 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50'
                    : 'glass border border-white/10 hover:border-orange-500/50 text-gray-300 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Materials Grid - Mobile-first responsive */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass rounded-xl border border-white/10 overflow-hidden h-96 animate-pulse"
              >
                <div className="h-48 bg-white/5" />
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No materials found in this category.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {filteredMaterials.map((material) => (
              <motion.div
                key={material.id}
                variants={itemVariants}
                className="group glass overflow-hidden rounded-xl border border-white/10 hover:border-orange-500/50 hover-lift cursor-pointer h-full flex flex-col transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-900 flex-shrink-0">
                  <Image
                    src={material.imageUrl}
                    alt={material.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-3 sm:px-4 py-1 sm:py-2 bg-orange-500/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white">
                    {material.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 bg-white/5 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-space-grotesk line-clamp-2">
                    {material.name}
                  </h3>

                  <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 flex-1">
                    {material.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Durability:</span>
                      <span className="text-orange-400 font-medium">{material.durability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cost:</span>
                      <span className="text-orange-400 font-medium">{material.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Maintenance:</span>
                      <span className="text-orange-400 font-medium">{material.maintenance}</span>
                    </div>
                  </div>

                  {/* Features Tags */}
                  {material.features && material.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {material.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 border border-white/20 text-white text-xs rounded-full hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        {filteredMaterials.length > 0 && (
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
              Need help selecting the right material for your project?
            </p>
            <button className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm sm:text-base rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
              Request Consultation
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
