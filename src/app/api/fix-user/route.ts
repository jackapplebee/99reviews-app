import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }
    
    // Find user and business
    const user = await prisma.user.findUnique({
      where: { email },
      include: { business: true }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Update user with missing fields
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        businessSlug: user.business.slug,
        role: user.role || 'OWNER'
      }
    })
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        businessSlug: updatedUser.businessSlug,
        role: updatedUser.role
      }
    })
    
  } catch (error: any) {
    await prisma.$disconnect()
    console.error('Fix user error:', error)
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 })
  }
}