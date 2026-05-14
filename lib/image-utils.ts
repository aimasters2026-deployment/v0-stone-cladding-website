import { MediaAsset, ImageGalleryConfig } from './db'

const IMAGE_CACHE: Map<string, { data: MediaAsset | null; timestamp: number }> = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const DEFAULT_PLACEHOLDERS = {
  'header-logo': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 40%22%3E%3Crect fill=%22%23333%22 width=%22100%22 height=%2240%22/%3E%3C/svg%3E',
  'hero-background': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1600 900%22%3E%3Crect fill=%22%23222%22 width=%221600%22 height=%22900%22/%3E%3C/svg%3E',
  'testimonial-avatar': 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23444%22/%3E%3C/svg%3E',
}

// Clear expired cache entries
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of IMAGE_CACHE.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      IMAGE_CACHE.delete(key)
    }
  }
}, CACHE_DURATION)

export async function fetchImageByPlacement(placementKey: string): Promise<MediaAsset | null> {
  // Check cache first
  const cached = IMAGE_CACHE.get(placementKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const response = await fetch(`/api/media/placement/${placementKey}`)
    if (!response.ok) return null
    
    const data = await response.json()
    IMAGE_CACHE.set(placementKey, { data: data.media || null, timestamp: Date.now() })
    return data.media || null
  } catch (error) {
    console.error(`[v0] Error fetching image for placement ${placementKey}:`, error)
    IMAGE_CACHE.set(placementKey, { data: null, timestamp: Date.now() })
    return null
  }
}

export async function fetchImagesByCategory(category: string): Promise<MediaAsset[]> {
  try {
    const response = await fetch(`/api/media/category/${category}`)
    if (!response.ok) return []
    
    const data = await response.json()
    return data.media || []
  } catch (error) {
    console.error(`[v0] Error fetching images for category ${category}:`, error)
    return []
  }
}

export async function fetchAllMedia(): Promise<MediaAsset[]> {
  try {
    const response = await fetch('/api/media')
    if (!response.ok) return []
    
    const data = await response.json()
    return data.media || []
  } catch (error) {
    console.error('[v0] Error fetching all media:', error)
    return []
  }
}

export async function fetchImageGallery(): Promise<ImageGalleryConfig | null> {
  try {
    const response = await fetch('/api/media/gallery')
    if (!response.ok) return null
    
    const data = await response.json()
    return data.gallery || null
  } catch (error) {
    console.error('[v0] Error fetching image gallery:', error)
    return null
  }
}

export function getPlaceholderImage(placementKey: string): string {
  // Try to match exact key
  if (placementKey in DEFAULT_PLACEHOLDERS) {
    return DEFAULT_PLACEHOLDERS[placementKey as keyof typeof DEFAULT_PLACEHOLDERS]
  }
  
  // Try to match by category
  if (placementKey.includes('testimonial')) {
    return DEFAULT_PLACEHOLDERS['testimonial-avatar']
  }
  if (placementKey.includes('hero')) {
    return DEFAULT_PLACEHOLDERS['hero-background']
  }
  if (placementKey.includes('logo')) {
    return DEFAULT_PLACEHOLDERS['header-logo']
  }
  
  // Default placeholder
  return DEFAULT_PLACEHOLDERS['hero-background']
}

export function getCachedImage(placementKey: string): MediaAsset | null | undefined {
  const cached = IMAGE_CACHE.get(placementKey)
  return cached?.data
}

export function clearImageCache(): void {
  IMAGE_CACHE.clear()
}

export function invalidatePlacementCache(placementKey: string): void {
  IMAGE_CACHE.delete(placementKey)
}
