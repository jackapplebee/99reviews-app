import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface CustomerData {
  firstName: string
  lastName: string
  email: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { customers } = await request.json()
    
    if (!customers || !Array.isArray(customers)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }

    // Validate and process customers
    const validCustomers: CustomerData[] = []
    const errors: string[] = []
    
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i]
      
      // Basic validation
      if (!customer.firstName || !customer.lastName || !customer.email) {
        errors.push(`Row ${i + 1}: Missing required fields (firstName, lastName, email)`)
        continue
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(customer.email)) {
        errors.push(`Row ${i + 1}: Invalid email format`)
        continue
      }
      
      validCustomers.push({
        firstName: customer.firstName.trim(),
        lastName: customer.lastName.trim(),
        email: customer.email.trim().toLowerCase(),
      })
    }
    
    if (errors.length > 0 && validCustomers.length === 0) {
      return NextResponse.json({ 
        error: 'No valid customers found', 
        details: errors 
      }, { status: 400 })
    }
    
    // Insert customers (skip duplicates)
    let createdCount = 0
    let skippedCount = 0
    
    for (const customerData of validCustomers) {
      try {
        await prisma.customer.create({
          data: {
            ...customerData,
            businessId: session.user.businessId
          }
        })
        createdCount++
      } catch (error) {
        // Skip if duplicate email for this business
        skippedCount++
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Uploaded ${createdCount} customers${skippedCount > 0 ? `, skipped ${skippedCount} duplicates` : ''}`,
      created: createdCount,
      skipped: skippedCount,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('CSV upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}