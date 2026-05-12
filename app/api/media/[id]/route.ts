import { NextRequest, NextResponse } from 'next/server'
import { updateMediaAsset, deleteMediaAsset, getMedia } from '@/lib/db'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')

// GET - Retrieve specific media asset
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const media = getMedia()
    const asset = media.find((m) => m.id === params.id)

    if (!asset) {
      return NextResponse.json(
        { error: 'Media asset not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ asset })
  } catch (error) {
    console.error('[v0] Get media detail error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve media' },
      { status: 500 }
    )
  }
}

// PATCH - Update media asset metadata
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const updated = updateMediaAsset(params.id, body)

    if (!updated) {
      return NextResponse.json(
        { error: 'Media asset not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ asset: updated })
  } catch (error) {
    console.error('[v0] Update media error:', error)
    return NextResponse.json(
      { error: 'Failed to update media' },
      { status: 500 }
    )
  }
}

// DELETE - Delete media asset
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const media = getMedia()
    const asset = media.find((m) => m.id === params.id)

    if (!asset) {
      return NextResponse.json(
        { error: 'Media asset not found' },
        { status: 404 }
      )
    }

    // Delete file
    const filepath = join(UPLOAD_DIR, asset.filename)
    if (existsSync(filepath)) {
      try {
        await unlink(filepath)
      } catch (error) {
        console.error('[v0] Failed to delete file:', error)
      }
    }

    // Delete database record
    const deleted = deleteMediaAsset(params.id)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete media' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Media deleted successfully' }
    )
  } catch (error) {
    console.error('[v0] Delete media error:', error)
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    )
  }
}
