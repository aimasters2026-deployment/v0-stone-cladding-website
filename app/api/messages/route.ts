import { NextRequest, NextResponse } from 'next/server'
import { addMessage, getMessages, updateMessage, deleteMessage, getConfig, Message } from '@/lib/db'

// POST - Submit a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, name, email, phone, subject, message, metadata } = body

    // Validate required fields
    if (!type || !name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: type, name, email, subject, message' },
        { status: 400 }
      )
    }

    // Validate message type
    const config = getConfig()
    if (!config.messageTypes[type as keyof typeof config.messageTypes]) {
      return NextResponse.json(
        { error: 'Invalid message type' },
        { status: 400 }
      )
    }

    // Create message
    const newMessage = addMessage({
      type: type as Message['type'],
      name,
      email,
      phone,
      subject,
      message,
      metadata: metadata || {},
    })

    // Route message to destinations
    await routeMessage(newMessage)

    return NextResponse.json(
      {
        success: true,
        message: 'Message submitted successfully',
        messageId: newMessage.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Message API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    )
  }
}

// GET - Retrieve all messages (admin only)
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const messages = getMessages()
    return NextResponse.json({ messages })
  } catch (error) {
    console.error('[v0] Get messages error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve messages' },
      { status: 500 }
    )
  }
}

// Helper function to route message to destinations
async function routeMessage(message: Message): Promise<void> {
  const config = getConfig()
  const messageTypeConfig = config.messageTypes[message.type]

  if (!messageTypeConfig || !messageTypeConfig.enabled) {
    return
  }

  const destinations = messageTypeConfig.destinations || []

  // Send to all configured destinations
  for (const destination of destinations) {
    if (destination.startsWith('http')) {
      // Send to webhook
      try {
        await fetch(destination, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message),
        })
      } catch (error) {
        console.error(`[v0] Failed to send message to webhook ${destination}:`, error)
      }
    } else if (destination.includes('@')) {
      // Email destination - implement with your email service
      // For now, just log
      console.log(`[v0] Would send email to: ${destination}`)
      console.log(`[v0] Message: ${message.subject}`)
    }
  }
}
