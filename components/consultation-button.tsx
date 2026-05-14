'use client'

import { motion } from 'framer-motion'
import { useConsultation } from './consultation-provider'

interface ConsultationButtonProps {
  text?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ConsultationButton({
  text = 'Request Consultation',
  variant = 'primary',
  size = 'md',
  className = '',
}: ConsultationButtonProps) {
  const { openConsultation } = useConsultation()

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  }

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/50',
    secondary:
      'border border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent',
  }

  return (
    <motion.button
      onClick={openConsultation}
      className={`${sizeStyles[size]} ${variantStyles[variant]} rounded-lg font-medium transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.button>
  )
}
