'use client'

import { useState, useEffect } from 'react'
import { MediaAsset } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Upload } from 'lucide-react'

interface MediaManagementProps {
  adminKey: string
}

export function MediaManagement({ adminKey }: MediaManagementProps) {
  const [media, setMedia] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null)
  const [message, setMessage] = useState('')
  const [uploadForm, setUploadForm] = useState({
    type: 'portfolio-image' as MediaAsset['type'],
    title: '',
    description: '',
    file: null as File | null,
  })

  useEffect(() => {
    loadMedia()
  }, [])

  const loadMedia = async () => {
    try {
      const response = await fetch('/api/media', {
        headers: { 'x-admin-key': adminKey },
      })
      if (response.ok) {
        const data = await response.json()
        setMedia(data.media.sort((a: MediaAsset, b: MediaAsset) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        ))
      }
    } catch (error) {
      console.error('[v0] Failed to load media:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadForm((prev) => ({ ...prev, file }))
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadForm.file || !uploadForm.title) {
      setMessage('Please fill in all required fields')
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', uploadForm.file)
      formData.append('type', uploadForm.type)
      formData.append('title', uploadForm.title)
      formData.append('description', uploadForm.description)

      const response = await fetch('/api/media', {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setMedia([data.asset, ...media])
        setUploadForm({
          type: 'portfolio-image',
          title: '',
          description: '',
          file: null,
        })
        setMessage('Media uploaded successfully')
        setTimeout(() => setMessage(''), 3000)
        // Reset file input
        const input = document.getElementById('file-input') as HTMLInputElement
        if (input) input.value = ''
      } else {
        setMessage('Failed to upload media')
      }
    } catch (error) {
      setMessage('Error uploading media')
    } finally {
      setUploading(false)
    }
  }

  const deleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      })

      if (response.ok) {
        setMedia(media.filter((m) => m.id !== id))
        if (selectedMedia?.id === id) setSelectedMedia(null)
        setMessage('Media deleted successfully')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Failed to delete media')
    }
  }

  const updateMedia = async (updates: Partial<MediaAsset>) => {
    if (!selectedMedia) return

    try {
      const response = await fetch(`/api/media/${selectedMedia.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updated = { ...selectedMedia, ...updates }
        setSelectedMedia(updated)
        setMedia(media.map((m) => (m.id === selectedMedia.id ? updated : m)))
        setMessage('Media updated successfully')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Failed to update media')
    }
  }

  if (loading) {
    return <div className="text-gray-400">Loading media...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Upload Form */}
      <div className="lg:col-span-1">
        <div className="glass p-6 rounded-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 font-space-grotesk">
            Upload Media
          </h2>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Type</label>
              <select
                value={uploadForm.type}
                onChange={(e) =>
                  setUploadForm((prev) => ({
                    ...prev,
                    type: e.target.value as MediaAsset['type'],
                  }))
                }
                className="w-full glass-sm bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="hero-image">Hero Image</option>
                <option value="hero-video">Hero Video</option>
                <option value="portfolio-image">Portfolio Image</option>
                <option value="thumbnail">Thumbnail</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-2">Title *</label>
              <Input
                value={uploadForm.title}
                onChange={(e) =>
                  setUploadForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Asset title"
                className="glass-sm bg-white/10 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-2">Description</label>
              <Textarea
                value={uploadForm.description}
                onChange={(e) =>
                  setUploadForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Asset description"
                rows={3}
                className="glass-sm bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-2">File *</label>
              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="w-full text-white text-sm"
              />
              {uploadForm.file && (
                <p className="text-xs text-gray-400 mt-2">
                  Selected: {uploadForm.file.name}
                </p>
              )}
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-xs ${
                message.includes('success')
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={uploading || !uploadForm.file}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-xs text-gray-400 mb-3">Media Library ({media.length})</p>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {media.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                    selectedMedia?.id === item.id
                      ? 'bg-orange-500/20 border border-orange-500/50'
                      : 'hover:bg-white/5 border border-white/10'
                  }`}
                >
                  <p className="font-medium text-white truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 capitalize">{item.type}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Details */}
      <div className="lg:col-span-2">
        {selectedMedia ? (
          <div className="glass p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-space-grotesk">
                  {selectedMedia.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(selectedMedia.uploadedAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteMedia(selectedMedia.id)}
                className="text-red-400 hover:text-red-300 transition-colors p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Preview */}
              {selectedMedia.type.includes('image') ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="w-full rounded-lg border border-white/10 max-h-96 object-cover"
                />
              ) : (
                <video
                  src={selectedMedia.url}
                  controls
                  className="w-full rounded-lg border border-white/10 max-h-96"
                />
              )}

              {/* Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-2">Type</p>
                  <p className="text-white capitalize">{selectedMedia.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">Size</p>
                  <p className="text-white">
                    {(selectedMedia.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-400 mb-2">File</p>
                  <p className="text-white break-all text-sm font-mono">
                    {selectedMedia.filename}
                  </p>
                </div>
              </div>

              {/* Editable Description */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Description</p>
                <Textarea
                  value={selectedMedia.description}
                  onChange={(e) =>
                    setSelectedMedia((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  onBlur={() =>
                    selectedMedia.description !== media.find((m) => m.id === selectedMedia.id)?.description &&
                    updateMedia({ description: selectedMedia.description })
                  }
                  className="glass-sm bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  rows={3}
                />
              </div>

              {/* URL */}
              <div>
                <p className="text-xs text-gray-400 mb-2">URL</p>
                <input
                  type="text"
                  value={selectedMedia.url}
                  readOnly
                  className="w-full glass-sm bg-white/10 border-white/20 text-gray-300 px-3 py-2 rounded-lg text-sm font-mono cursor-text"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Use this URL to reference this media in your site configuration
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass p-6 rounded-xl border border-white/10 text-center">
            <p className="text-gray-400">Select a media file to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
