'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAdminImages } from '@/hooks/useAdminImages'

interface AdminImageProps {
  placementKey: string
  width?: number
  height?: number
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill'
  fallbackUrl?: string
}

export function AdminImage({
  placementKey,
  width,
  height,
  alt,
  className = '',
  priority = false,
  fill = false,
  objectFit = 'cover',
  fallbackUrl,
}: AdminImageProps) {
  const { image, loading, placeholder } = useAdminImages({
    placementKey,
    fallbackUrl,
  })
  const [isError, setIsError] = useState(false)

  const imageSrc = isError || !image ? placeholder : image.url

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt || image?.altText || 'Image'}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className={`${className} ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
        onError={() => setIsError(true)}
      />
    )
  }

  return (
    <Image
      src={imageSrc}
      alt={alt || image?.altText || 'Image'}
      width={width || 400}
      height={height || 300}
      priority={priority}
      className={`${className} ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
      onError={() => setIsError(true)}
    />
  )
}

export default AdminImage
