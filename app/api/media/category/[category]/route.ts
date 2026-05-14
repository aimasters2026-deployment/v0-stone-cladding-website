import { NextRequest, NextResponse } from 'next/server'
import { getMedia } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params
    const allMedia = getMedia()
    const categoryMedia = allMedia.filter(m => m.category === category && m.isActive)

    return NextResponse.json(
      { media: categoryMedia, category, count: categoryMedia.length },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch media by category' },
      { status: 500 }
    )
  }
}
