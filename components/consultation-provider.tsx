'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface ConsultationContextType {
  isOpen: boolean
  openConsultation: () => void
  closeConsultation: () => void
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined)

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openConsultation = useCallback(() => {
    setIsOpen(true)
    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden'
  }, [])

  const closeConsultation = useCallback(() => {
    setIsOpen(false)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }, [])

  return (
    <ConsultationContext.Provider value={{ isOpen, openConsultation, closeConsultation }}>
      {children}
    </ConsultationContext.Provider>
  )
}

export function useConsultation() {
  const context = useContext(ConsultationContext)
  if (!context) {
    throw new Error('useConsultation must be used within ConsultationProvider')
  }
  return context
}
