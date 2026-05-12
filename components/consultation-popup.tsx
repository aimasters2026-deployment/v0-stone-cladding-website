'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, MessageCircle, Send, Copy, Check } from 'lucide-react'
import { useConsultation } from './consultation-provider'
import { ConsultationConfig, ConsultationChannel } from '@/lib/db'

export default function ConsultationPopup() {
  const { isOpen, closeConsultation } = useConsultation()
  const [config, setConfig] = useState<ConsultationConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/consultation')
      if (response.ok) {
        const data = await response.json()
        setConfig(data)
      }
    } catch (error) {
      console.error('Failed to fetch consultation config:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleContactClick = (channel: ConsultationChannel) => {
    let url = ''

    switch (channel.type) {
      case 'phone':
        url = `tel:${channel.value}`
        break
      case 'email':
        url = `mailto:${channel.value}`
        break
      case 'gmail':
        url = `mailto:${channel.value}`
        break
      case 'whatsapp':
        // Remove any non-numeric characters from phone number
        const phoneNumber = channel.value.replace(/\D/g, '')
        url = `https://wa.me/${phoneNumber}`
        break
      case 'telegram':
        // Remove @ if present
        const username = channel.value.replace('@', '')
        url = `https://t.me/${username}`
        break
    }

    if (url) {
      window.open(url, '_blank')
    }
  }

  const getChannelIcon = (channel: ConsultationChannel) => {
    const iconProps = { className: 'w-6 h-6' }

    switch (channel.type) {
      case 'phone':
        return <Phone {...iconProps} />
      case 'email':
      case 'gmail':
        return <Mail {...iconProps} />
      case 'whatsapp':
        return <MessageCircle {...iconProps} />
      case 'telegram':
        return <Send {...iconProps} />
      default:
        return <Mail {...iconProps} />
    }
  }

  if (!config) return null

  const animationDuration = config.animationEnabled ? config.animationDuration / 1000 : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            onClick={() => config.closeOnBackdropClick && closeConsultation()}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
          >
            <motion.div
              className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                backgroundColor: config.backgroundColor,
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: animationDuration, type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* Header */}
              <div className="relative p-6 sm:p-8">
                <motion.button
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={closeConsultation}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                <div className="pr-8">
                  <motion.h2
                    className="text-2xl sm:text-3xl font-bold text-white mb-2 font-space-grotesk"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: animationDuration * 0.2 }}
                  >
                    {config.title}
                  </motion.h2>
                  <motion.p
                    className="text-sm sm:text-base text-gray-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: animationDuration * 0.4 }}
                  >
                    {config.subtitle}
                  </motion.p>
                </div>
              </div>

              {/* Contact Channels */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {config.channels
                    .filter((channel) => channel.enabled)
                    .map((channel, index) => (
                      <motion.div
                        key={channel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: animationDuration * (0.1 + index * 0.1) }}
                      >
                        <motion.button
                          className="w-full p-4 rounded-xl border border-white/20 hover:border-white/40 transition-all group relative overflow-hidden"
                          style={{
                            backgroundColor: `${config.accentColor}15`,
                          }}
                          onClick={() => handleContactClick(channel)}
                          whileHover={{
                            scale: 1.05,
                            borderColor: `${config.accentColor}80`,
                            boxShadow: `0 0 20px ${config.accentColor}40`,
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                          <div className="relative z-10 flex flex-col items-center gap-2">
                            <motion.div
                              style={{ color: config.accentColor }}
                              whileHover={{ scale: 1.15, rotate: 5 }}
                            >
                              {getChannelIcon(channel)}
                            </motion.div>
                            <div>
                              <p
                                className="text-sm font-semibold text-white"
                                style={{ color: 'inherit' }}
                              >
                                {channel.label}
                              </p>
                              <p className="text-xs text-gray-400 truncate">{channel.value}</p>
                            </div>
                          </div>
                        </motion.button>

                        {/* Copy Button - appears on hover for smaller screens */}
                        <motion.button
                          className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            backgroundColor: `${config.accentColor}30`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCopy(channel.value, channel.id)
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {copiedId === channel.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" style={{ color: config.accentColor }} />
                          )}
                        </motion.button>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Footer */}
              <motion.div
                className="px-6 sm:px-8 py-4 border-t border-white/10 bg-white/5 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animationDuration * 0.5 }}
              >
                <p className="text-xs sm:text-sm text-gray-400">
                  We typically respond within 24 hours
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
