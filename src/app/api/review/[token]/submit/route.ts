import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { rating, comment } = await request.json()

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 })
    }

    // Decode token to get customer and business info
    let customerId: string
    let businessId: string
    
    try {
      const decoded = Buffer.from(params.token, 'base64').toString()
      const [custId, bizId, timestamp] = decoded.split(':')
      
      // Check if token is not too old (24 hours)
      const tokenTime = parseInt(timestamp)
      const now = Date.now()
      if (now - tokenTime > 24 * 60 * 60 * 1000) {
        return NextResponse.json({ error: 'Link expired' }, { status: 400 })
      }
      
      customerId = custId
      businessId = bizId
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    // Verify customer exists
    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId,
        businessId: businessId
      },
      include: {
        business: true
      }
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    // Check if review already exists for this customer
    const existingReview = await prisma.review.findFirst({
      where: {
        customerId: customerId,
        businessId: businessId
      }
    })

    if (existingReview) {
      return NextResponse.json({ error: 'Review already submitted' }, { status: 400 })
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        rating,
        comment: comment || null,
        isPublic: rating >= 4, // 4-5 stars go public (Google), 1-3 stay internal
        customerId,
        businessId
      }
    })

    // Prepare response
    let googleUrl = null
    if (rating >= 4) {
      // In production, this would be the actual Google Business URL
      // For now, we'll use a placeholder
      googleUrl = `https://www.google.com/search?q=${encodeURIComponent(customer.business.name)}+reviews#lrd=0x0:0x0,3`
    }

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      rating,
      isPublic: rating >= 4,
      googleUrl
    })

  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}