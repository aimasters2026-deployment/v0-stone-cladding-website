'use client'

import { Mail, Phone, MapPin } from 'lucide-react'
import AdvancedConsultation from '@/components/advanced-consultation'

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Headquarters',
      details: ['Suite R238, Red Block, New Gbagi', 'Ibadan, Oyo State, Nigeria'],
    },
    {
      icon: MapPin,
      title: 'Office - Abuja',
      details: ['6, Rihana Close, ACO Est.', 'Airport Road, Abuja, Nigeria'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+234 809 877 7052', '+234 906 939 1034'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['octo21ststonetechnology@gmail.com'],
    },
  ]

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-0 w-[700px] h-[700px] bg-gradient-to-r from-orange-500/10 via-transparent to-transparent blur-3xl -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-space-grotesk">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Let&apos;s discuss your stone cladding project and how we can bring your architectural vision to life.
          </p>
        </div>

        {/* Advanced Consultation Component */}
        <div className="mb-16">
          <AdvancedConsultation />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <div key={index} className="glass p-4 sm:p-6 rounded-lg sm:rounded-xl border border-white/10 hover:border-orange-500/50 hover-lift transition-all duration-300">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-400/10 rounded-lg border border-orange-500/20 flex-shrink-0">
                    <Icon className="h-4 sm:h-5 w-4 sm:w-5 text-orange-400" />
                  </div>
                  <h3 className="font-bold text-white font-space-grotesk text-sm sm:text-base">{info.title}</h3>
                </div>
                <div className="ml-10 sm:ml-11 space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-400 text-xs sm:text-sm leading-tight">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
