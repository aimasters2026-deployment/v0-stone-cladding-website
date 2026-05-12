'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Video with Tint Overlay */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        preload="auto"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Gradient Tint Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/15 via-transparent to-transparent blur-3xl opacity-60" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32"
      >
        <div className="space-y-8 max-w-3xl">
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight font-space-grotesk">
              <span className="gradient-text">Premium Stone Wall</span> <span className="text-white">Cladding Excellence</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl text-balance leading-relaxed">
              Transform your building facade with premium Turkish stone materials. Expert consulting, design, and installation for sustainable, energy-efficient structures.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-4 md:pt-6">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 w-full xs:w-auto transform hover:scale-105"
            >
              <Link href="#contact" className="flex items-center justify-center gap-2">
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="glass border-white/20 text-white hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 w-full xs:w-auto"
            >
              <Link href="#portfolio" className="flex items-center justify-center">View Our Work</Link>
            </Button>
          </motion.div>

          {/* Trust Badge - Responsive Grid */}
          <motion.div variants={itemVariants} className="pt-8 md:pt-12 border-t border-white/10">
            <p className="text-xs sm:text-sm text-gray-400 font-medium mb-4 md:mb-6">
              Trusted by leading developers and architects across Africa
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 md:flex md:flex-wrap">
              <div className="glass-sm p-3 sm:p-4 rounded-lg border border-white/10">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">50+</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 md:mt-2">Projects</p>
              </div>
              <div className="glass-sm p-3 sm:p-4 rounded-lg border border-white/10">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">15+</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 md:mt-2">Years</p>
              </div>
              <div className="glass-sm p-3 sm:p-4 rounded-lg border border-white/10">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">3</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 md:mt-2">Locations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
