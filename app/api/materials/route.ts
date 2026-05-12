import { NextRequest, NextResponse } from 'next/server'
import { getMaterials, addMaterial, updateMaterial, deleteMaterial, Material } from '@/lib/db'

// GET - Retrieve all materials
export async function GET(request: NextRequest) {
  try {
    const materials = getMaterials()
    return NextResponse.json({ materials })
  } catch (error) {
    console.error('[v0] Get materials error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve materials' },
      { status: 500 }
    )
  }
}

// POST - Add new material (admin only)
export async function POST(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const material = addMaterial(body as Omit<Material, 'id' | 'createdAt'>)

    return NextResponse.json(
      {
        success: true,
        message: 'Material added successfully',
        material,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Add material error:', error)
    return NextResponse.json(
      { error: 'Failed to add material' },
      { status: 500 }
    )
  }
}

// PUT - Update material (admin only)
export async function PUT(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, ...updates } = body
    const material = updateMaterial(id, updates)

    if (!material) {
      return NextResponse.json(
        { error: 'Material not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Material updated successfully',
      material,
    })
  } catch (error) {
    console.error('[v0] Update material error:', error)
    return NextResponse.json(
      { error: 'Failed to update material' },
      { status: 500 }
    )
  }
}

// DELETE - Delete material (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Material ID required' },
        { status: 400 }
      )
    }

    const success = deleteMaterial(id)

    if (!success) {
      return NextResponse.json(
        { error: 'Material not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Material deleted successfully',
    })
  } catch (error) {
    console.error('[v0] Delete material error:', error)
    return NextResponse.json(
      { error: 'Failed to delete material' },
      { status: 500 }
    )
  }
}
