'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function DashboardTestPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div className="p-8">Loading session...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Not authenticated</h1>
        <a href="/auth/login" className="text-blue-600 hover:underline">Go to login</a>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Test - Session Data</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="font-bold mb-2">Full Session Object:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="bg-blue-50 p-4 rounded mb-6">
        <h2 className="font-bold mb-2">Token Fields (for middleware):</h2>
        <div className="space-y-1 text-sm">
          <div><strong>Email:</strong> {session?.user?.email || 'missing'}</div>
          <div><strong>Business ID:</strong> {session?.user?.businessId || 'missing'}</div>
          <div><strong>Business Slug:</strong> {session?.user?.businessSlug || 'missing'}</div>
          <div><strong>User ID:</strong> {session?.user?.id || 'missing'}</div>
        </div>
      </div>

      <div className="space-x-4">
        <button 
          onClick={() => router.push('/dashboard')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Dashboard
        </button>
        
        <button 
          onClick={() => {
            // Clear session and redirect to login
            window.location.href = '/auth/login'
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Logout & Login Again
        </button>
      </div>
    </div>
  )
}