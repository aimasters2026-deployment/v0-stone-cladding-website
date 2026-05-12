'use client'

import { useState, useEffect } from 'react'
import { Message } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Trash2, Eye, EyeOff } from 'lucide-react'

interface MessageHistoryProps {
  adminKey: string
}

export default function MessageHistory({ adminKey }: MessageHistoryProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/messages', {
        headers: { 'x-admin-key': adminKey },
      })
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages.sort((a: Message, b: Message) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ))
      }
    } catch (error) {
      console.error('[v0] Failed to load messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      })

      if (response.ok) {
        setMessages(messages.filter((m) => m.id !== id))
        setMessage('Message deleted successfully')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Failed to delete message')
    }
  }

  const updateMessageStatus = async (id: string, status: Message['status']) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setMessages(
          messages.map((m) => (m.id === id ? { ...m, status } : m))
        )
      }
    } catch (error) {
      console.error('[v0] Failed to update message:', error)
    }
  }

  if (loading) {
    return <div className="text-gray-400">Loading messages...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Messages List */}
      <div className="lg:col-span-1">
        <div className="glass p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4 font-space-grotesk">
            Messages ({messages.length})
          </h2>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm">No messages yet</p>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                    selectedMessage?.id === msg.id
                      ? 'bg-orange-500/20 border border-orange-500/50'
                      : 'hover:bg-white/5 border border-white/10'
                  }`}
                >
                  <p className="font-medium text-white truncate">{msg.subject}</p>
                  <p className="text-xs text-gray-400 truncate">{msg.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs capitalize font-medium text-orange-400">
                      {msg.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      msg.status === 'received' ? 'bg-blue-500/20 text-blue-300' :
                      msg.status === 'processed' ? 'bg-green-500/20 text-green-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Message Details */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <div className="glass p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-space-grotesk">
                  {selectedMessage.subject}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteMessage(selectedMessage.id)}
                className="text-red-400 hover:text-red-300 transition-colors p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Name</p>
                  <p className="text-white font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Email</p>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-orange-400 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone</p>
                    <p className="text-white font-medium">{selectedMessage.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-400 mb-1">Type</p>
                  <p className="text-orange-400 capitalize font-medium">
                    {selectedMessage.type}
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Message</p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-300 whitespace-pre-wrap text-sm">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Status Management */}
              <div>
                <p className="text-xs text-gray-400 mb-3">Status</p>
                <div className="flex gap-2">
                  {(['received', 'processed', 'archived'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateMessageStatus(selectedMessage.id, status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedMessage.status === status
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {message && (
                <div className={`p-4 rounded-lg text-sm ${
                  message.includes('success')
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="glass p-6 rounded-xl border border-white/10 text-center">
            <p className="text-gray-400">Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
