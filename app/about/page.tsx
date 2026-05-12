'use client'

import { motion } from 'framer-motion'
import { Award, Users, Globe, Zap } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function About() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden py-20"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold font-space-grotesk mb-6">
            About <span className="gradient-text">Octo 21st</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Premium stone wall cladding solutions with 15+ years of excellence in building facades across Africa and beyond.
          </p>
        </div>
      </motion.section>

      {/* Company Story */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 sm:py-28"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl font-bold font-space-grotesk mb-6">Our Story</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Founded with a vision to revolutionize building facades, Octo 21st Stone Technology has established itself as a trusted partner in premium stone cladding solutions. Starting from humble beginnings in Ibadan, we've grown to serve clients across Nigeria and internationally.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our commitment to quality, innovation, and customer satisfaction has made us the preferred choice for architects, developers, and facility managers seeking durable, aesthetically pleasing facade solutions.
            </p>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '15+', label: 'Years Experience' },
              { number: '3', label: 'Office Locations' },
              { number: '1,000+', label: 'Satisfied Clients' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass p-6 rounded-lg border border-white/10 hover:border-orange-500/50 hover-lift"
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 sm:py-28 bg-[#0f0f0f]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold font-space-grotesk mb-12">
            Our Core Values
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                icon: Award,
                title: 'Quality Excellence',
                description: 'We use only premium Turkish stone materials and maintain the highest installation standards.',
              },
              {
                icon: Users,
                title: 'Client Focus',
                description: 'Your satisfaction is our priority. We work closely with every client to deliver exactly what they envision.',
              },
              {
                icon: Globe,
                title: 'Sustainability',
                description: 'Our stone cladding solutions are environmentally responsible and energy-efficient.',
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'We continuously adapt and improve our techniques to meet evolving market demands.',
              },
            ].map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass p-8 rounded-lg border border-white/10 hover:border-orange-500/50 hover-lift"
                >
                  <Icon className="h-12 w-12 text-orange-400 mb-4" />
                  <h3 className="text-xl font-bold font-space-grotesk mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Team & Partnership */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 sm:py-28"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl font-bold font-space-grotesk mb-6">Our Team & Partners</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Our success is built on the expertise of a dedicated team of professionals with deep experience in facade design, stone installation, and project management. Each team member brings a passion for quality and attention to detail.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're proud to partner with Neksan, a leading Turkish stone supplier, ensuring access to premium materials and international standards. This partnership strengthens our ability to deliver world-class solutions to our clients.
            </p>
          </motion.div>

          {/* Locations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                city: 'Ibadan',
                role: 'Headquarters',
                desc: 'Our main office and primary operations center',
              },
              {
                city: 'Abuja',
                role: 'Regional Office',
                desc: 'Serving the North and Federal Capital Territory',
              },
              {
                city: 'Lagos',
                role: 'Client Services',
                desc: 'Dedicated team for projects across the Southwest',
              },
            ].map((location, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass p-6 rounded-lg border border-white/10"
              >
                <h3 className="text-2xl font-bold font-space-grotesk mb-2 text-orange-400">{location.city}</h3>
                <p className="text-sm font-semibold text-gray-300 mb-2">{location.role}</p>
                <p className="text-sm text-gray-400">{location.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 sm:py-28 bg-gradient-to-r from-orange-500/10 to-transparent"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-space-grotesk mb-6">Ready to Transform Your Building?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Let us bring your architectural vision to life with premium stone cladding solutions.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
          >
            Start a Consultation
          </motion.a>
        </div>
      </motion.section>
    </main>
  )
}
