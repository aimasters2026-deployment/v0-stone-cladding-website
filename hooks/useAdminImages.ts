'use client'

import { useState, useEffect, useCallback } from 'react'
import { MediaAsset, ImageGalleryConfig } from '@/lib/db'
import { fetchImageByPlacement, fetchImagesByCategory, fetchAllMedia, fetchImageGallery, getPlaceholderImage } from '@/lib/image-utils'

interface UseAdminImagesResult {
  image: MediaAsset | null
  loading: boolean
  error: string | null
  placeholder: string
  refetch: () => Promise<void>
}

interface UseAdminImagesOptions {
  placementKey?: string
  category?: string
  fallbackUrl?: string
}

export function useAdminImages(options: UseAdminImagesOptions = {}): UseAdminImagesResult {
  const [image, setImage] = useState<MediaAsset | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const placeholder = options.fallbackUrl || getPlaceholderImage(options.placementKey || '')

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      if (options.placementKey) {
        const media = await fetchImageByPlacement(options.placementKey)
        setImage(media)
      } else if (options.category) {
        const mediaList = await fetchImagesByCategory(options.category)
        setImage(mediaList[0] || null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch image')
      setImage(null)
    } finally {
      setLoading(false)
    }
  }, [options])

  useEffect(() => {
    refetch()
  }, [options.placementKey, options.category, refetch])

  return {
    image,
    loading,
    error,
    placeholder,
    refetch,
  }
}

export function useAllImages() {
  const [images, setImages] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const mediaList = await fetchAllMedia()
      setImages(mediaList)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images')
      setImages([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { images, loading, error, refetch }
}

export function useImageGallery() {
  const [gallery, setGallery] = useState<ImageGalleryConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const galleryData = await fetchImageGallery()
      setGallery(galleryData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gallery')
      setGallery(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { gallery, loading, error, refetch }
}
