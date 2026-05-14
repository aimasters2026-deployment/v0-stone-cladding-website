import { NextRequest, NextResponse } from 'next/server'
import { getMediaByPlacement } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { placementKey: string } }
) {
  try {
    const { placementKey } = params
    const media = getMediaByPlacement(placementKey)

    return NextResponse.json(
      { media: media || null, placementKey },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch media by placement' },
      { status: 500 }
    )
  }
}
