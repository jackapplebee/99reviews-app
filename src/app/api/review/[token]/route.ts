import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    // For now, we'll create a simple token system
    // In production, you'd want JWT or encrypted tokens
    
    // Extract customer email and business ID from token
    // Format: base64(customerId:businessId:timestamp)
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

    // Get customer and business info
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

    return NextResponse.json({
      customerId: customer.id,
      customerName: `${customer.firstName} ${customer.lastName}`,
      businessName: customer.business.name,
      businessId: customer.businessId
    })

  } catch (error) {
    console.error('Review token error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}