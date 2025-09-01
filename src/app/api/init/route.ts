import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

export const dynamic = 'force-dynamic'

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Run prisma db push to create tables
    const { stdout, stderr } = await execAsync('npx prisma db push --accept-data-loss')
    
    return NextResponse.json({ 
      success: true,
      message: 'Database initialized successfully!',
      output: stdout,
      errors: stderr
    })
    
  } catch (error: any) {
    console.error('Database initialization error:', error)
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      details: 'Database initialization failed'
    }, { status: 500 })
  }
}