'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Eye, EyeOff, Save } from 'lucide-react'
import { ConsultationConfig, ConsultationChannel } from '@/lib/db'

interface ConsultationManagementProps {
  adminKey: string
}

export function ConsultationManagement({ adminKey }: ConsultationManagementProps) {
  const [config, setConfig] = useState<ConsultationConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showPreview, setShowPreview] = useState(false)

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
      console.error('Failed to fetch config:', error)
      setMessage({ type: 'error', text: 'Failed to load configuration' })
    } finally {
      setLoading(false)
    }
  }

  const saveConfig = async () => {
    if (!config) return

    setSaving(true)
    try {
      const response = await fetch('/api/consultation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Configuration saved successfully' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage({ type: 'error', text: 'Failed to save configuration' })
      }
    } catch (error) {
      console.error('Failed to save config:', error)
      setMessage({ type: 'error', text: 'Error saving configuration' })
    } finally {
      setSaving(false)
    }
  }

  const updateChannel = (id: string, updates: Partial<ConsultationChannel>) => {
    if (!config) return

    setConfig({
      ...config,
      channels: config.channels.map((ch) =>
        ch.id === id ? { ...ch, ...updates } : ch
      ),
    })
  }

  const deleteChannel = (id: string) => {
    if (!config) return

    setConfig({
      ...config,
      channels: config.channels.filter((ch) => ch.id !== id),
    })
  }

  const addChannel = () => {
    if (!config) return

    const newChannel: ConsultationChannel = {
      id: Date.now().toString(),
      type: 'phone',
      label: 'New Channel',
      value: '',
      enabled: true,
      icon: 'Phone',
    }

    setConfig({
      ...config,
      channels: [...config.channels, newChannel],
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    )
  }

  if (!config) {
    return <div className="text-red-400">Failed to load consultation configuration</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Consultation Popup Management</h2>
        <p className="text-gray-400">
          Configure contact channels, colors, and behaviors for your consultation popup
        </p>
      </div>

      {/* Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Settings */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Left Column - Text Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Subtitle */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Popup Content</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Popup Title
                </label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Popup Subtitle
                </label>
                <input
                  type="text"
                  value={config.subtitle}
                  onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Color Settings */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Colors</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Accent Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.accentColor}
                    onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Button Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.buttonColor}
                    onChange={(e) => setConfig({ ...config, buttonColor: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.buttonColor}
                    onChange={(e) => setConfig({ ...config, buttonColor: e.target.value })}
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Animation Settings */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Behavior</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="animations"
                  checked={config.animationEnabled}
                  onChange={(e) => setConfig({ ...config, animationEnabled: e.target.checked })}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="animations" className="text-sm text-gray-300 cursor-pointer">
                  Enable Animations
                </label>
              </div>

              {config.animationEnabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Animation Duration (ms)
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="1000"
                    step="50"
                    value={config.animationDuration}
                    onChange={(e) =>
                      setConfig({ ...config, animationDuration: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="backdrop"
                  checked={config.closeOnBackdropClick}
                  onChange={(e) =>
                    setConfig({ ...config, closeOnBackdropClick: e.target.checked })
                  }
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="backdrop" className="text-sm text-gray-300 cursor-pointer">
                  Close on Backdrop Click
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview Button */}
        <div className="flex flex-col gap-4">
          <motion.button
            onClick={() => setShowPreview(!showPreview)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </motion.button>

          {/* Save Button */}
          <motion.button
            onClick={saveConfig}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </motion.div>

      {/* Contact Channels */}
      <motion.div
        className="glass p-6 rounded-xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Contact Channels</h3>
          <motion.button
            onClick={addChannel}
            className="flex items-center gap-2 px-3 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            Add Channel
          </motion.button>
        </div>

        <div className="space-y-4">
          {config.channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                {/* Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Type
                  </label>
                  <select
                    value={channel.type}
                    onChange={(e) =>
                      updateChannel(channel.id, {
                        type: e.target.value as ConsultationChannel['type'],
                      })
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="gmail">Gmail</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                  </select>
                </div>

                {/* Label */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={channel.label}
                    onChange={(e) => updateChannel(channel.id, { label: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                    placeholder="e.g., Call Us"
                  />
                </div>

                {/* Value */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Contact Info
                  </label>
                  <input
                    type="text"
                    value={channel.value}
                    onChange={(e) => updateChannel(channel.id, { value: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                    placeholder={
                      channel.type === 'phone'
                        ? '+234...'
                        : channel.type === 'telegram'
                          ? '@username'
                          : 'contact info'
                    }
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 items-end">
                  <motion.button
                    onClick={() => updateChannel(channel.id, { enabled: !channel.enabled })}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      channel.enabled
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {channel.enabled ? 'Active' : 'Inactive'}
                  </motion.button>
                  <motion.button
                    onClick={() => deleteChannel(channel.id)}
                    className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Preview Panel */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="glass p-8 rounded-xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h3 className="text-lg font-bold text-white mb-6">Live Preview</h3>

            <div className="bg-black/50 rounded-xl p-8 flex items-center justify-center min-h-96">
              <div
                className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
                style={{
                  backgroundColor: config.backgroundColor,
                }}
              >
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-white mb-2">{config.title}</h4>
                  <p className="text-sm text-gray-300">{config.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {config.channels
                    .filter((ch) => ch.enabled)
                    .map((channel) => (
                      <div
                        key={channel.id}
                        className="p-3 rounded-lg border border-white/20 text-center"
                        style={{
                          backgroundColor: `${config.accentColor}15`,
                          borderColor: `${config.accentColor}40`,
                        }}
                      >
                        <p className="text-xs font-medium text-white">{channel.label}</p>
                        <p className="text-xs text-gray-400 mt-1 truncate">{channel.value}</p>
                      </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <p className="text-xs text-gray-400">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
