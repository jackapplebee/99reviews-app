'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface ReviewData {
  customerId: string
  customerName: string
  businessName: string
  businessId: string
}

export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const [reviewData, setReviewData] = useState<ReviewData | null>(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchReviewData()
  }, [params.token])

  async function fetchReviewData() {
    try {
      const response = await fetch(`/api/review/${params.token}`)
      if (!response.ok) {
        setError('Invalid or expired review link')
        return
      }
      const data = await response.json()
      setReviewData(data)
    } catch (error) {
      setError('Failed to load review form')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(selectedRating: number) {
    if (!reviewData) return
    
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch(`/api/review/${params.token}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: selectedRating,
          comment: comment.trim()
        })
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to submit review')
        return
      }

      setSubmitted(true)

      // Smart routing: 4-5 stars go to Google, 1-3 stars stay internal
      if (selectedRating >= 4 && result.googleUrl) {
        setTimeout(() => {
          window.location.href = result.googleUrl
        }, 2000)
      }

    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600">LOADING...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="brutalist-card p-8 text-center">
            <div className="text-4xl mb-4">❌</div>
            <h2 className="text-xl font-black text-black mb-2 uppercase letter-spacing-title">OOPS!</h2>
            <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="brutalist-card p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-black text-black mb-2 uppercase letter-spacing-title">THANK YOU!</h2>
            <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600 mb-4">
              YOUR FEEDBACK HAS BEEN RECEIVED.
            </p>
            {rating >= 4 && (
              <p className="text-xs font-bold letter-spacing-body uppercase text-blue-600">
                REDIRECTING YOU TO LEAVE A GOOGLE REVIEW...
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="brutalist-card p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-black mb-2 uppercase letter-spacing-title">
              HOW WAS YOUR EXPERIENCE?
            </h1>
            <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600">
              AT <span className="text-black">{reviewData?.businessName?.toUpperCase()}</span>
            </p>
          </div>

          {/* Star Rating */}
          <div className="text-center mb-6">
            <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600 mb-3">TAP A STAR TO RATE</p>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-4xl transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  ⭐
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600 mt-2">
                YOU RATED: {rating} STAR{rating !== 1 ? 'S' : ''}
              </p>
            )}
          </div>

          {/* Comment Section (for low ratings) */}
          {rating > 0 && rating < 4 && (
            <div className="mb-6">
              <label className="block text-xs font-bold letter-spacing-label uppercase text-black mb-2">
                HOW CAN WE IMPROVE? (OPTIONAL)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="brutalist-container w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm focus:outline-none focus:bg-gray-50"
                rows={3}
                placeholder="YOUR FEEDBACK HELPS US SERVE YOU BETTER..."
              />
            </div>
          )}

          {/* Submit Button */}
          {rating > 0 && (
            <div className="text-center">
              <button
                onClick={() => handleSubmit(rating)}
                disabled={submitting}
                className="brutalist-button w-full py-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed text-sm font-black letter-spacing-label uppercase"
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
              </button>
              {rating >= 4 && (
                <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600 mt-2">
                  YOU'LL BE REDIRECTED TO GOOGLE REVIEWS AFTER SUBMITTING
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}