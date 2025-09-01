import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user.businessId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get reviews for this business
    const reviews = await prisma.review.findMany({
      where: { businessId: session.user.businessId },
      include: {
        customer: true
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    })

    return NextResponse.json({ 
      reviews,
      success: true 
    })
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}