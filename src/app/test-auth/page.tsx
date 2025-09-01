'use client'

import { useSession } from 'next-auth/react'

export default function TestAuthPage() {
  const { data: session, status } = useSession()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      
      <div className="space-y-4">
        <div>
          <strong>Status:</strong> {status}
        </div>
        
        {session ? (
          <div className="space-y-2">
            <div><strong>User ID:</strong> {session.user?.id}</div>
            <div><strong>Email:</strong> {session.user?.email}</div>
            <div><strong>Name:</strong> {session.user?.name}</div>
            <div><strong>Business ID:</strong> {session.user?.businessId}</div>
            <div><strong>Business Slug:</strong> {session.user?.businessSlug}</div>
          </div>
        ) : (
          <div>No session found</div>
        )}
        
        <div className="mt-6">
          <a 
            href="/dashboard" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}