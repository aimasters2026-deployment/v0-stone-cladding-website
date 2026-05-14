'use client'

import { useState, useEffect } from 'react'
import { MediaAsset, ImageGalleryConfig } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link2, X, Save } from 'lucide-react'

interface ImagePlacementManagerProps {
  adminKey: string
}

export function ImagePlacementManager({ adminKey }: ImagePlacementManagerProps) {
  const [gallery, setGallery] = useState<ImageGalleryConfig | null>(null)
  const [media, setMedia] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlacement, setSelectedPlacement] = useState<string | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [galleryRes, mediaRes] = await Promise.all([
        fetch('/api/media/gallery', { headers: { 'x-admin-key': adminKey } }),
        fetch('/api/media', { headers: { 'x-admin-key': adminKey } }),
      ])

      if (galleryRes.ok) {
        const data = await galleryRes.json()
        setGallery(data.gallery)
      }

      if (mediaRes.ok) {
        const data = await mediaRes.json()
        setMedia(data.media || [])
      }
    } catch (error) {
      console.error('[v0] Failed to load data:', error)
      setMessage('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const assignMediaToPlacement = async (placementKey: string, mediaId: string) => {
    try {
      const response = await fetch('/api/media/placements', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ placementKey, mediaId }),
      })

      if (response.ok) {
        const data = await response.json()
        setGallery(data.gallery)
        setMessage('Placement updated successfully')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to update placement')
      }
    } catch (error) {
      console.error('[v0] Failed to assign media:', error)
      setMessage('Error updating placement')
    }
  }

  const handleSaveAssignment = async () => {
    if (!selectedPlacement || !selectedMedia) return
    await assignMediaToPlacement(selectedPlacement, selectedMedia)
    setSelectedMedia(null)
  }

  const getFilteredMedia = () => {
    if (filterCategory === 'all') return media
    return media.filter(m => m.category === filterCategory)
  }

  const getMediaForPlacement = (mediaId?: string) => {
    if (!mediaId) return null
    return media.find(m => m.id === mediaId)
  }

  if (loading) {
    return <div className="text-gray-400">Loading image placements...</div>
  }

  if (!gallery) {
    return <div className="text-red-400">Failed to load image gallery configuration</div>
  }

  const categories = Array.from(new Set(media.map(m => m.category)))
  const selectedPlacementData = gallery.placements.find(p => p.placementKey === selectedPlacement)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Image Placement Manager</h2>
        <p className="text-gray-400">
          Assign media assets to specific placements across your website
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-200">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placements List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Placements</h3>
            <span className="text-sm text-gray-400">{gallery.placements.length}</span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {gallery.placements.map((placement) => {
              const assignedMedia = getMediaForPlacement(placement.mediaId)
              const isSelected = selectedPlacement === placement.placementKey

              return (
                <button
                  key={placement.placementKey}
                  onClick={() => setSelectedPlacement(isSelected ? null : placement.placementKey)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-white">{placement.label}</p>
                      <p className="text-sm text-gray-400">{placement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{placement.placementKey}</p>
                    </div>
                    {assignedMedia && (
                      <div className="ml-2 flex items-center gap-1 text-green-400 text-xs">
                        <span>✓ Assigned</span>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Media Selection */}
        <div className="space-y-4">
          {selectedPlacementData ? (
            <>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Assign Media to: {selectedPlacementData.label}
                </h3>
                <p className="text-sm text-gray-400">{selectedPlacementData.description}</p>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Filter by Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Media Grid */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Available Media
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                  {getFilteredMedia().map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => setSelectedMedia(selectedMedia === asset.id ? null : asset.id)}
                      className={`relative p-2 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
                        selectedMedia === asset.id
                          ? 'border-orange-500 bg-orange-500/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      {asset.url && (
                        <div className="relative w-full h-20 mb-2 rounded overflow-hidden bg-black/20">
                          <img
                            src={asset.url}
                            alt={asset.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="text-xs font-medium text-white truncate">
                        {asset.title}
                      </p>
                      <p className="text-xs text-gray-500">{asset.category}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-white/10">
                {selectedMedia && (
                  <Button
                    onClick={handleSaveAssignment}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Assign Selected Media
                  </Button>
                )}
                {selectedPlacementData.mediaId && (
                  <Button
                    onClick={() => assignMediaToPlacement(selectedPlacementData.placementKey, '')}
                    variant="outline"
                    className="flex-1 text-red-400 border-red-400/30 hover:bg-red-500/10"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove Assignment
                  </Button>
                )}
              </div>

              {/* Current Assignment */}
              {selectedPlacementData.mediaId && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-sm text-green-300">
                    <strong>Currently Assigned:</strong>{' '}
                    {getMediaForPlacement(selectedPlacementData.mediaId)?.title}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-400 text-center py-8">
              Select a placement to assign media
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
