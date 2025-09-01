'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CsvUpload } from '@/components/csv-upload'
import { getReviewUrl } from '@/lib/review-tokens'
import { useState, useEffect } from 'react'

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

export default function CustomersPage() {
  const { data: session, status } = useSession()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    if (status === 'authenticated') {
      fetchCustomers()
    }
  }, [status])

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated') {
    router.push('/auth/login')
    return <div>Redirecting...</div>
  }
  
  async function fetchCustomers() {
    try {
      const response = await fetch('/api/customers')
      const data = await response.json()
      setCustomers(data.customers || [])
    } catch (error) {
      console.error('Failed to fetch customers:', error)
    } finally {
      setLoading(false)
    }
  }
  
  function handleUploadSuccess() {
    fetchCustomers() // Refresh the list
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Navigation Header */}
      <div className="brutalist-container sticky top-0 z-10" style={{ 
        backgroundColor: 'var(--bg)', 
        height: '56px',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none'
      }}>
        <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-bold letter-spacing-logo uppercase" style={{ color: 'var(--primary)' }}>
              99 REVIEWS
            </h1>
            <div className="relative">
              <select className="brutalist-button bg-transparent pr-8" style={{ 
                appearance: 'none', 
                WebkitAppearance: 'none', 
                MozAppearance: 'none',
                fontSize: '10px',
                padding: '6px 24px 6px 12px'
              }}>
                <option>{session?.user.businessSlug?.toUpperCase() || 'BUSINESS'}</option>
              </select>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs">▼</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">🔔</span>
            <div className="relative">
              <button className="brutalist-button bg-transparent text-xs font-bold letter-spacing-label">
                {session?.user.name?.toUpperCase() || 'USER'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="brutalist-container" style={{ 
        backgroundColor: 'var(--bg)', 
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none'
      }}>
        <div className="max-w-7xl mx-auto px-5">
          <nav className="flex space-x-0">
            <button 
              className="brutalist-button py-3 px-6" 
              style={{ 
                backgroundColor: 'transparent', 
                color: 'var(--primary)',
                borderRadius: '0',
                borderRight: '1px solid var(--primary)',
                borderBottom: 'none',
                borderTop: 'none'
              }}
              onClick={() => window.location.href = '/dashboard'}
            >
              DASHBOARD
            </button>
            <button 
              className="brutalist-button py-3 px-6" 
              style={{ 
                backgroundColor: 'var(--primary)', 
                color: 'var(--bg)',
                borderRadius: '0',
                borderRight: '1px solid var(--primary)',
                borderBottom: 'none',
                borderTop: 'none'
              }}
            >
              CUSTOMERS
            </button>
            <button 
              className="brutalist-button py-3 px-6" 
              style={{ 
                backgroundColor: 'transparent', 
                color: 'var(--primary)',
                borderRadius: '0',
                borderBottom: 'none',
                borderTop: 'none'
              }}
              onClick={() => window.location.href = '/dashboard/reviews'}
            >
              REVIEWS
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-5 space-y-5">
        {/* Header */}
        <div className="brutalist-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold letter-spacing-title uppercase" style={{ color: 'var(--primary)' }}>Customer Database</h2>
              <p className="text-xs letter-spacing-body uppercase mt-1" style={{ color: 'var(--gray-dark)' }}>
                Manage your customer information and upload new data
              </p>
            </div>
            <CsvUpload onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>

        {/* Customer List */}
        <div className="brutalist-card">
          <h3 className="text-lg font-bold letter-spacing-title uppercase mb-4" style={{ color: 'var(--primary)' }}>
            Customers ({customers.length})
          </h3>
            
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading customers...</p>
              </div>
            ) : customers.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gray-50 border-2 border-black p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h4>
                  <p className="text-gray-600 mb-4">
                    Upload your first CSV file to start managing customer reviews
                  </p>
                  <p className="text-sm text-gray-500">
                    Expected CSV format: firstName, lastName, email
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reviews
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.firstName} {customer.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{customer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            0 reviews
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(customer.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => {
                              const reviewUrl = getReviewUrl(customer.id, session?.user.businessId || '', window.location.origin)
                              navigator.clipboard.writeText(reviewUrl)
                              alert('Review link copied to clipboard!')
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Copy Review Link
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}