'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageConfig, MessageType } from '@/lib/db'
import { Trash2, Plus, Check, X } from 'lucide-react'

interface MessageRoutingConfigProps {
  adminKey: string
}

export function MessageRoutingConfig({ adminKey }: MessageRoutingConfigProps) {
  const [config, setConfig] = useState<MessageConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [newDestination, setNewDestination] = useState<Record<MessageType, string>>({
    consultation: '',
    project: '',
    support: '',
    material: '',
    partnership: '',
  })

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/config', {
        headers: { 'x-admin-key': adminKey },
      })
      if (response.ok) {
        const data = await response.json()
        setConfig(data.config)
      }
    } catch (error) {
      console.error('[v0] Failed to load config:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveConfig = async () => {
    if (!config) return
    setSaving(true)

    try {
      const response = await fetch('/api/config', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        setMessage('Configuration saved successfully')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save configuration')
      }
    } catch (error) {
      setMessage('Error saving configuration')
    } finally {
      setSaving(false)
    }
  }

  const addDestination = (type: MessageType) => {
    const dest = newDestination[type].trim()
    if (!dest) return

    setConfig((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        messageTypes: {
          ...prev.messageTypes,
          [type]: {
            ...prev.messageTypes[type],
            destinations: [...prev.messageTypes[type].destinations, dest],
          },
        },
      }
    })
    setNewDestination((prev) => ({ ...prev, [type]: '' }))
  }

  const removeDestination = (type: MessageType, index: number) => {
    setConfig((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        messageTypes: {
          ...prev.messageTypes,
          [type]: {
            ...prev.messageTypes[type],
            destinations: prev.messageTypes[type].destinations.filter((_, i) => i !== index),
          },
        },
      }
    })
  }

  const toggleTypeEnabled = (type: MessageType) => {
    setConfig((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        messageTypes: {
          ...prev.messageTypes,
          [type]: {
            ...prev.messageTypes[type],
            enabled: !prev.messageTypes[type].enabled,
          },
        },
      }
    })
  }

  if (loading) {
    return <div className="text-gray-400">Loading configuration...</div>
  }

  if (!config) {
    return <div className="text-red-400">Failed to load configuration</div>
  }

  return (
    <div className="space-y-8">
      <div className="glass p-6 sm:p-8 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 font-space-grotesk">
          Message Type Configuration
        </h2>

        <div className="space-y-8">
          {(Object.entries(config.messageTypes) as [MessageType, any][]).map(
            ([type, typeConfig]) => (
              <div key={type} className="border-b border-white/10 pb-8 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-space-grotesk capitalize">
                      {typeConfig.label}
                    </h3>
                    <p className="text-sm text-gray-400">{typeConfig.description}</p>
                  </div>
                  <button
                    onClick={() => toggleTypeEnabled(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      typeConfig.enabled
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {typeConfig.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-3">
                      Routing Destinations ({typeConfig.destinations.length})
                    </p>
                    <div className="space-y-2 mb-4">
                      {typeConfig.destinations.map((dest: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10"
                        >
                          <span className="text-sm text-gray-300 break-all">{dest}</span>
                          <button
                            onClick={() => removeDestination(type, idx)}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        value={newDestination[type]}
                        onChange={(e) =>
                          setNewDestination((prev) => ({ ...prev, [type]: e.target.value }))
                        }
                        placeholder="email@example.com or https://webhook.url"
                        className="glass-sm bg-white/10 border-white/20 text-white placeholder:text-gray-500 flex-1"
                      />
                      <Button
                        onClick={() => addDestination(type)}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-sm ${
            message.includes('success')
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <Button
          onClick={saveConfig}
          disabled={saving}
          className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg w-full sm:w-auto"
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>
    </div>
  )
}
