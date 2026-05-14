import { NextRequest, NextResponse } from 'next/server'
import { getImageGallery, updateImageGallery, assignMediaToPlacement } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const gallery = getImageGallery()
    return NextResponse.json({ placements: gallery.placements }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch placements' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { placementKey, mediaId } = body

    if (!placementKey || !mediaId) {
      return NextResponse.json(
        { error: 'placementKey and mediaId are required' },
        { status: 400 }
      )
    }

    const updated = assignMediaToPlacement(placementKey, mediaId)
    return NextResponse.json({ gallery: updated }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update placement' },
      { status: 500 }
    )
  }
}
