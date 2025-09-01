'use client'

import { useSession } from 'next-auth/react'

export default function SimpleTestPage() {
  const { data: session, status } = useSession()

  console.log('Simple Test - Status:', status)
  console.log('Simple Test - Session:', session)

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Simple Authentication Test</h1>
      <div style={{ marginTop: '20px' }}>
        <div><strong>Status:</strong> {status}</div>
        <div style={{ marginTop: '10px' }}>
          <strong>Session Data:</strong>
          <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '5px' }}>
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => {
            console.log('Button clicked - Status:', status)
            console.log('Button clicked - Session:', session)
            alert(`Status: ${status}, Has Session: ${!!session}`)
          }}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Test Console Log
        </button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <a 
          href="/dashboard" 
          style={{ 
            display: 'inline-block', 
            padding: '10px 20px', 
            background: '#007bff', 
            color: 'white', 
            textDecoration: 'none' 
          }}
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  )
}