'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function AuthSuccessPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log('Auth Success - Status:', status)
    console.log('Auth Success - Session:', session)
  }, [status, session])

  if (status === 'loading') {
    return <div className="p-8">Loading session...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Success</h1>
      
      <div className="space-y-4">
        <div><strong>Status:</strong> {status}</div>
        
        {session ? (
          <div className="space-y-2 bg-green-50 p-4 border border-green-200">
            <h2 className="font-bold text-green-800">Session Found:</h2>
            <div><strong>Email:</strong> {session.user?.email}</div>
            <div><strong>Name:</strong> {session.user?.name}</div>
            <div><strong>Business ID:</strong> {session.user?.businessId}</div>
            <div><strong>Business Slug:</strong> {session.user?.businessSlug}</div>
            
            <div className="mt-4">
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 p-4 border border-red-200">
            <strong className="text-red-800">No session found</strong>
            <div className="mt-2">
              <a href="/auth/login" className="text-blue-600 hover:underline">
                Go to Login
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}