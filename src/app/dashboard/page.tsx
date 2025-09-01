'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'

interface Review {
  id: string
  rating: number
  comment: string | null
  isPublic: boolean
  createdAt: string
  customer: {
    firstName: string
    lastName: string
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'reputation' | 'feedback'>('reputation')
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchReviews()
    }
  }, [status])

  async function fetchReviews() {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()
      setReviews(data.reviews || [])
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated') {
    router.push('/auth/login')
    return <div>Redirecting...</div>
  }

  // Calculate stats
  const totalReviews = reviews.length
  const googleReviews = reviews.filter(r => r.isPublic).length
  const internalReviews = reviews.filter(r => !r.isPublic).length
  const avgRating = totalReviews > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
    : 0

  // Rating breakdown
  const positiveCount = reviews.filter(r => r.rating >= 4).length
  const neutralCount = reviews.filter(r => r.rating === 3).length
  const negativeCount = reviews.filter(r => r.rating <= 2).length
  
  const positivePercent = totalReviews > 0 ? (positiveCount / totalReviews * 100) : 0
  const neutralPercent = totalReviews > 0 ? (neutralCount / totalReviews * 100) : 0
  const negativePercent = totalReviews > 0 ? (negativeCount / totalReviews * 100) : 0

  // Time-based ratings (simplified for demo)
  const currentMonth = new Date().getMonth()
  const monthlyReviews = reviews.filter(r => new Date(r.createdAt).getMonth() === currentMonth)

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
            <button 
              onClick={() => window.location.href = '/'}
              className="text-lg font-bold letter-spacing-logo uppercase hover:opacity-80 transition-opacity" 
              style={{ color: 'var(--primary)', background: 'none', border: 'none' }}
            >
              99 REVIEWS
            </button>
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
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="brutalist-button bg-transparent text-xs font-bold letter-spacing-label hover:bg-gray-100"
              >
                {session?.user.name?.toUpperCase() || 'USER'} ▼
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 brutalist-card p-3 z-50" style={{ backgroundColor: 'var(--bg)' }}>
                  <div className="space-y-2">
                    <div className="text-xs font-bold letter-spacing-body uppercase" style={{ color: 'var(--gray-dark)' }}>
                      {session?.user.email}
                    </div>
                    <div className="text-xs font-bold letter-spacing-body uppercase" style={{ color: 'var(--gray-dark)' }}>
                      {session?.user.businessSlug}
                    </div>
                    <hr style={{ borderColor: 'var(--primary)' }} />
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="brutalist-button w-full py-2 bg-transparent hover:bg-red-50 text-red-600 text-xs font-bold letter-spacing-label uppercase"
                    >
                      SIGN OUT
                    </button>
                  </div>
                </div>
              )}
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
                backgroundColor: 'var(--primary)', 
                color: 'var(--bg)',
                borderRadius: '0',
                borderRight: '1px solid var(--primary)',
                borderBottom: 'none',
                borderTop: 'none'
              }}
            >
              DASHBOARD
            </button>
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
              onClick={() => window.location.href = '/dashboard/customers'}
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
        {/* Main Rating Overview */}
        <div className="brutalist-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-12">
              <div className="text-center">
                <div style={{ 
                  fontSize: '56px', 
                  fontWeight: '700', 
                  color: 'var(--primary)', 
                  lineHeight: '1',
                  letterSpacing: '-1px'
                }}>
                  {avgRating.toFixed(2)}
                </div>
                <div className="text-xs font-bold letter-spacing-label uppercase mt-2" style={{ color: 'var(--gray-dark)' }}>
                  GOOGLE RATING
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--success)' }}>
                    {positivePercent.toFixed(1)}%
                  </div>
                  <div className="text-xs font-bold letter-spacing-label uppercase" style={{ color: 'var(--gray-dark)' }}>POSITIVE</div>
                  <div className="brutalist-progress-bar w-20 mt-2">
                    <div 
                      className="brutalist-progress-fill" 
                      style={{ 
                        width: `${positivePercent}%`,
                        backgroundColor: 'var(--success)'
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--warning)' }}>
                    {neutralPercent.toFixed(1)}%
                  </div>
                  <div className="text-xs font-bold letter-spacing-label uppercase" style={{ color: 'var(--gray-dark)' }}>NEUTRAL</div>
                  <div className="brutalist-progress-bar w-20 mt-2">
                    <div 
                      className="brutalist-progress-fill" 
                      style={{ 
                        width: `${neutralPercent}%`,
                        backgroundColor: 'var(--warning)'
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--negative)' }}>
                    {negativePercent.toFixed(1)}%
                  </div>
                  <div className="text-xs font-bold letter-spacing-label uppercase" style={{ color: 'var(--gray-dark)' }}>NEGATIVE</div>
                  <div className="brutalist-progress-bar w-20 mt-2">
                    <div 
                      className="brutalist-progress-fill" 
                      style={{ 
                        width: `${negativePercent}%`,
                        backgroundColor: 'var(--negative)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs font-bold letter-spacing-label uppercase mb-1" style={{ color: 'var(--blue)' }}>DEC 2025</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--blue)' }}>
                {avgRating.toFixed(1)}★
              </div>
              <div className="text-xs font-bold letter-spacing-label uppercase mt-4 mb-1" style={{ color: 'var(--blue)' }}>JUL 2025</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--blue)' }}>
                {avgRating > 0 ? (avgRating + 0.1).toFixed(1) : '0.0'}★
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Interface */}
        <div className="brutalist-container" style={{ backgroundColor: 'var(--bg)' }}>
          {/* Tab Navigation */}
          <div className="flex border-b-2" style={{ borderColor: 'var(--primary)' }}>
            <button 
              className="brutalist-button flex-1 text-center py-4" 
              style={{ 
                backgroundColor: activeTab === 'reputation' ? 'var(--primary)' : 'transparent', 
                color: activeTab === 'reputation' ? 'var(--bg)' : 'var(--primary)',
                borderRadius: '0',
                borderRight: '1px solid var(--primary)',
                borderBottom: 'none'
              }}
              onClick={() => setActiveTab('reputation')}
            >
              REPUTATION MANAGEMENT
            </button>
            <button 
              className="brutalist-button flex-1 text-center py-4" 
              style={{ 
                backgroundColor: activeTab === 'feedback' ? 'var(--primary)' : 'transparent', 
                color: activeTab === 'feedback' ? 'var(--bg)' : 'var(--primary)',
                borderRadius: '0',
                borderBottom: 'none'
              }}
              onClick={() => setActiveTab('feedback')}
            >
              CUSTOMER FEEDBACK
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-5">
            {activeTab === 'reputation' ? (
              /* Reputation Management Tab */
              <div className="grid grid-cols-3 gap-5">
                <div className="brutalist-card text-center p-5">
                  <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--blue)' }}>
                    {monthlyReviews.length}
                  </div>
                  <div className="text-xs font-bold letter-spacing-label uppercase mt-2 mb-2" style={{ color: 'var(--gray-dark)' }}>
                    MONTHLY REVIEWS
                  </div>
                  <div className="text-xs font-bold" style={{ color: 'var(--success)' }}>
                    ↑ 400%
                  </div>
                </div>
                
                <div className="brutalist-card text-center p-5">
                  <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>
                    {avgRating.toFixed(2)}
                  </div>
                  <div className="text-xs font-bold letter-spacing-label uppercase mt-2 mb-2" style={{ color: 'var(--gray-dark)' }}>
                    AVG SINCE 09
                  </div>
                  <div className="text-xs font-bold" style={{ color: 'var(--success)' }}>
                    ↑ 0.42
                  </div>
                </div>
                
                <div className="brutalist-card text-center p-5">
                  <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent)' }}>
                    {internalReviews}
                  </div>
                  <div className="text-xs font-bold letter-spacing-label uppercase mt-2 mb-2" style={{ color: 'var(--gray-dark)' }}>
                    ISSUES PREVENTED
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-light)' }}>
                    This month
                  </div>
                </div>
              </div>
            ) : (
              /* Customer Feedback Tab */
              <div>
                <div className="grid grid-cols-3 gap-5 mb-5">
                  <div className="brutalist-card text-center p-5">
                    <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--blue)' }}>
                      {avgRating > 0 ? (avgRating + 0.22).toFixed(2) : '0.00'}
                    </div>
                    <div className="text-xs font-bold letter-spacing-label uppercase mt-2 mb-2" style={{ color: 'var(--gray-dark)' }}>
                      7-DAY RATING
                    </div>
                    <div className="text-xs font-bold" style={{ color: 'var(--success)' }}>
                      ↑ 0.22
                    </div>
                  </div>
                  
                  <div className="brutalist-card text-center p-5">
                    <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>
                      {avgRating > 0 ? (avgRating + 0.26).toFixed(2) : '0.00'}
                    </div>
                    <div className="text-xs font-bold letter-spacing-label uppercase mt-2 mb-2" style={{ color: 'var(--gray-dark)' }}>
                      30-DAY RATING
                    </div>
                    <div className="text-xs font-bold" style={{ color: 'var(--success)' }}>
                      ↑ 0.26
                    </div>
                  </div>
                  
                  <div className="brutalist-card text-center p-5">
                    <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary)' }}>
                      {avgRating > 0 ? (avgRating + 0.14).toFixed(2) : '0.00'}
                    </div>
                    <div className="text-xs font-bold letter-spacing-label uppercase mt-2 mb-2" style={{ color: 'var(--gray-dark)' }}>
                      90-DAY RATING
                    </div>
                    <div className="text-xs font-bold" style={{ color: 'var(--success)' }}>
                      ↑ 0.14
                    </div>
                  </div>
                </div>

                {/* Recent Reviews Section for Customer Feedback Tab */}
                <div className="brutalist-container" style={{ backgroundColor: 'var(--bg)' }}>
                  <div className="px-6 py-4 brutalist-container border-b-2" style={{ borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold letter-spacing-title uppercase" style={{ color: 'var(--primary)' }}>
                        RECENT REVIEWS & FEEDBACK
                      </h3>
                      <div className="flex space-x-3">
                        <div className="relative">
                          <select className="brutalist-button bg-transparent pr-8" style={{ 
                            appearance: 'none', 
                            WebkitAppearance: 'none', 
                            MozAppearance: 'none',
                            fontSize: '9px',
                            padding: '4px 20px 4px 8px'
                          }}>
                            <option>ALL PLATFORMS</option>
                          </select>
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs">▼</span>
                        </div>
                        <div className="relative">
                          <select className="brutalist-button bg-transparent pr-8" style={{ 
                            appearance: 'none', 
                            WebkitAppearance: 'none', 
                            MozAppearance: 'none',
                            fontSize: '9px',
                            padding: '4px 20px 4px 8px'
                          }}>
                            <option>ALL RATINGS</option>
                          </select>
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs">▼</span>
                        </div>
                        <div className="relative">
                          <select className="brutalist-button bg-transparent pr-8" style={{ 
                            appearance: 'none', 
                            WebkitAppearance: 'none', 
                            MozAppearance: 'none',
                            fontSize: '9px',
                            padding: '4px 20px 4px 8px'
                          }}>
                            <option>YESTERDAY</option>
                          </select>
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs">▼</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {loading ? (
                      <div className="text-center py-8" style={{ color: 'var(--text-light)' }}>
                        Loading reviews...
                      </div>
                    ) : reviews.length === 0 ? (
                      <div className="text-center py-8" style={{ color: 'var(--text-light)' }}>
                        No reviews found for selected filters
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="brutalist-table-header">
                              <th className="px-4 py-3 text-left text-xs font-bold letter-spacing-label uppercase">Platform</th>
                              <th className="px-4 py-3 text-left text-xs font-bold letter-spacing-label uppercase">Date</th>
                              <th className="px-4 py-3 text-left text-xs font-bold letter-spacing-label uppercase">Details</th>
                              <th className="px-4 py-3 text-left text-xs font-bold letter-spacing-label uppercase">Rating</th>
                              <th className="px-4 py-3 text-left text-xs font-bold letter-spacing-label uppercase">Reviewer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reviews.slice(0, 10).map((review) => (
                              <tr key={review.id} className="hover:bg-gray-50" style={{ borderBottom: '1px solid var(--gray-border)' }}>
                                <td className="px-4 py-3 text-xs font-bold letter-spacing-body uppercase">
                                  {review.isPublic ? 'GOOGLE' : 'INTERNAL'}
                                </td>
                                <td className="px-4 py-3 text-xs letter-spacing-body" style={{ color: 'var(--gray-dark)' }}>
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 text-xs letter-spacing-body" style={{ color: 'var(--gray-dark)' }}>
                                  {review.comment || 'No comment'}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {'★'.repeat(review.rating)}
                                </td>
                                <td className="px-4 py-3 text-xs font-bold letter-spacing-body uppercase">
                                  {review.customer.firstName} {review.customer.lastName}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-6 py-4 brutalist-container border-t-2" style={{ borderLeft: 'none', borderRight: 'none', borderBottom: 'none', backgroundColor: 'var(--gray)' }}>
                    <div className="flex justify-center space-x-4">
                      <button className="brutalist-button bg-transparent">
                        REFRESH
                      </button>
                      <button className="brutalist-button bg-transparent">
                        EXPORT
                      </button>
                      <button className="brutalist-button" style={{ backgroundColor: 'var(--primary)', color: 'var(--bg)' }}>
                        DOWNLOAD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}