import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { business: true }
    })
    
    if (!user) {
      return NextResponse.json({ 
        error: 'User not found',
        email: email
      }, { status: 404 })
    }
    
    // If password provided, test it
    let passwordValid = null
    if (password) {
      passwordValid = await bcrypt.compare(password, user.password)
    }
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      userFound: true,
      email: user.email,
      name: user.name,
      businessId: user.businessId,
      businessSlug: user.businessSlug,
      role: user.role,
      passwordFieldExists: !!user.password,
      passwordValid: passwordValid,
      businessName: user.business?.name,
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    await prisma.$disconnect()
    console.error('Debug auth error:', error)
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}