'use client'

import { useEffect, useState } from 'react'
import { MessageRoutingConfig } from '@/components/admin/message-routing-config'
import { useRouter } from 'next/navigation'

export default function RoutingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleAuthenticate = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid admin key')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="glass p-8 rounded-xl border border-white/10 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Authentication</h1>
          <input
            type="password"
            placeholder="Enter admin key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAuthenticate()}
            className="glass-sm bg-white/10 border-white/20 text-white placeholder:text-gray-500 w-full px-4 py-2 rounded-lg mb-4"
          />
          <button
            onClick={handleAuthenticate}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all"
          >
            Authenticate
          </button>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Message Routing Configuration</h1>
        <p className="text-gray-400">Configure where messages are routed based on type</p>
      </div>
      <MessageRoutingConfig />
    </div>
  )
}
