import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function ReviewsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/login')
  }

  // Get reviews for this business
  const reviews = await prisma.review.findMany({
    where: { businessId: session.user.businessId },
    include: {
      customer: true
    },
    orderBy: { createdAt: 'desc' },
    take: 100
  })

  // Calculate stats
  const totalReviews = reviews.length
  const positiveReviews = reviews.filter(r => r.rating >= 4).length
  const negativeReviews = reviews.filter(r => r.rating <= 3).length
  const avgRating = totalReviews > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
    : 0

  const googleReviews = reviews.filter(r => r.isPublic).length
  const internalReviews = reviews.filter(r => !r.isPublic).length

  return (
    <div className="min-h-screen bg-white">
      <div className="brutalist-container sticky top-0 z-10 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-bold letter-spacing-logo uppercase text-black">
              99 REVIEWS
            </h1>
            <div className="relative">
              <select className="brutalist-button bg-transparent border-2 border-black pr-8 text-xs">
                <option>{session.user.businessSlug?.toUpperCase() || 'BUSINESS'}</option>
              </select>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs">▼</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">🔔</span>
            <div className="relative">
              <button className="brutalist-button bg-transparent border-2 border-black text-xs font-bold letter-spacing-label">
                {session.user.name?.toUpperCase() || 'USER'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="brutalist-container bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-5">
          <nav className="flex space-x-0">
            <a 
              href="/dashboard"
              className="brutalist-button py-3 px-6 bg-transparent text-black border-r-2 border-black hover:bg-black hover:text-white"
            >
              DASHBOARD
            </a>
            <a 
              href="/dashboard/customers"
              className="brutalist-button py-3 px-6 bg-transparent text-black border-r-2 border-black hover:bg-black hover:text-white"
            >
              CUSTOMERS
            </a>
            <div className="brutalist-button py-3 px-6 bg-black text-white">
              REVIEWS
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="brutalist-card text-center p-5">
            <div className="text-2xl">⭐</div>
            <div className="text-lg font-medium text-gray-900 mt-2">
              {avgRating.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Average Rating</div>
          </div>

          <div className="brutalist-card text-center p-5">
            <div className="text-2xl">📊</div>
            <div className="text-lg font-medium text-gray-900 mt-2">
              {totalReviews}
            </div>
            <div className="text-sm text-gray-500">Total Reviews</div>
          </div>

          <div className="brutalist-card text-center p-5">
            <div className="text-2xl">🎯</div>
            <div className="text-lg font-medium text-gray-900 mt-2">
              {googleReviews}
            </div>
            <div className="text-sm text-gray-500">Google Reviews</div>
          </div>

          <div className="brutalist-card text-center p-5">
            <div className="text-2xl">🔒</div>
            <div className="text-lg font-medium text-gray-900 mt-2">
              {internalReviews}
            </div>
            <div className="text-sm text-gray-500">Negative Prevented</div>
          </div>
        </div>

        <div className="brutalist-card">
          <h3 className="text-lg font-bold letter-spacing-title uppercase mb-4 text-black">
            Recent Reviews ({totalReviews})
          </h3>
          
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-50 border-2 border-black p-6">
                <h4 className="text-lg font-bold text-black mb-2 uppercase">No reviews yet</h4>
                <p className="text-gray-600 mb-4">
                  Start sending review requests to see feedback here
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold letter-spacing-label uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold letter-spacing-label uppercase">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold letter-spacing-label uppercase">
                      Comment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold letter-spacing-label uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold letter-spacing-label uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-black uppercase">
                          {review.customer.firstName} {review.customer.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{review.customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg">{'⭐'.repeat(review.rating)}</span>
                          <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {review.comment || 'No comment'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full uppercase ${
                          review.isPublic 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {review.isPublic ? 'Google Review' : 'Internal Feedback'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
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