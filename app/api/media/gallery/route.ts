import { NextRequest, NextResponse } from 'next/server'
import { getImageGallery, updateImageGallery } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const gallery = getImageGallery()
    return NextResponse.json({ gallery }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch image gallery' },
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
    const updated = updateImageGallery(body)

    return NextResponse.json({ gallery: updated }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update image gallery' },
      { status: 500 }
    )
  }
}
