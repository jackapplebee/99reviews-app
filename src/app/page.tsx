'use client'

import { useSession, signOut } from 'next-auth/react'

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="brutalist-container border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold letter-spacing-logo uppercase text-black">
            99 REVIEWS
          </h1>
          <div className="flex space-x-3">
            {status === 'authenticated' ? (
              <>
                <a 
                  href="/dashboard"
                  className="brutalist-button bg-transparent text-black border-2 border-black hover:bg-black hover:text-white"
                >
                  DASHBOARD
                </a>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="brutalist-button bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/auth/login"
                  className="brutalist-button bg-transparent text-black border-2 border-black hover:bg-black hover:text-white"
                >
                  SIGN IN
                </a>
                <a 
                  href="/auth/register"
                  className="brutalist-button bg-black text-white border-2 border-black hover:bg-white hover:text-black"
                >
                  GET STARTED
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section - Hormozi Style */}
      <div className="max-w-4xl mx-auto px-5 py-16">
        <div className="text-center mb-16">
          {/* Pain-First Headline */}
          <h1 className="text-6xl font-black text-black mb-6 letter-spacing-title leading-tight">
            Stop Bad Reviews From<br/>
            <span style={{ color: 'var(--accent)' }}>Killing Your Business</span>
          </h1>
          
          {/* Big Promise */}
          <p className="text-2xl font-bold text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
            Get 10x more 5-star Google reviews while automatically filtering negative feedback before it goes public
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-8 mb-8 text-sm font-bold text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>1,200+ businesses protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-500">★</span>
              <span>47K+ positive reviews generated</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-500">⚡</span>
              <span>3-minute setup</span>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mb-12">
            <a 
              href="/auth/register"
              className="brutalist-button bg-black text-white border-2 border-black hover:bg-white hover:text-black text-lg px-10 py-4 mb-4 inline-block"
            >
              Start Free Trial →
            </a>
            <div className="text-sm text-gray-500">
              Free for 14 days • No credit card required • Cancel anytime
            </div>
          </div>

          {/* Value Stack */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-black mb-8 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="brutalist-card p-6">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-black text-black mb-3">Smart Review Routing</h3>
                <p className="text-gray-700">Happy customers (4-5 stars) get sent to Google. Unhappy ones (1-3 stars) stay private for you to address.</p>
              </div>
              <div className="brutalist-card p-6">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-black text-black mb-3">Automated Follow-Up</h3>
                <p className="text-gray-700">Stop manually asking for reviews. Our system automatically sends personalized requests to your customers.</p>
              </div>
              <div className="brutalist-card p-6">
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="text-xl font-black text-black mb-3">Reputation Protection</h3>
                <p className="text-gray-700">Fix issues privately before they become public problems. Turn unhappy customers into loyal advocates.</p>
              </div>
              <div className="brutalist-card p-6">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-xl font-black text-black mb-3">Instant Results</h3>
                <p className="text-gray-700">See more positive reviews within days. No technical setup required - works with any business type.</p>
              </div>
            </div>
          </div>

          {/* Social Proof Results */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-black mb-8 text-center">
              Real Results From Real Businesses
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black text-green-600 mb-2">127%</div>
                <div className="text-lg font-bold text-black mb-2">More Google Reviews</div>
                <div className="text-sm text-gray-600">"Went from 23 to 52 five-star reviews in 30 days. This actually works." - Mike's Auto Shop</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-blue-600 mb-2">$47K</div>
                <div className="text-lg font-bold text-black mb-2">Extra Monthly Revenue</div>
                <div className="text-sm text-gray-600">"Higher ratings brought way more customers. The ROI is insane." - Sarah's Restaurant</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-purple-600 mb-2">4.9★</div>
                <div className="text-lg font-bold text-black mb-2">Average Rating</div>
                <div className="text-sm text-gray-600">"Bad reviews stopped showing up. Now it's only good ones." - Tom's Fitness</div>
              </div>
            </div>
          </div>

        </div>


        {/* Final CTA */}
        <div className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-4xl font-black text-black mb-6">
            Ready to Transform Your Reviews?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join 1,200+ businesses that stopped worrying about bad reviews
          </p>
          <a 
            href="/auth/register"
            className="brutalist-button bg-black text-white border-2 border-black hover:bg-white hover:text-black text-xl px-12 py-6 mb-4 inline-block"
          >
            Start Free Trial →
          </a>
          <div className="text-sm text-gray-500">
            14-day free trial • Cancel anytime • No setup fees
          </div>
        </div>
        
        {/* Original Features Grid - Simplified */}
        <div className="grid md:grid-cols-3 gap-5 mt-20">
          <div className="brutalist-card p-8 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-black mb-4 uppercase letter-spacing-label text-black">Smart Routing</h3>
            <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
              Automatically route 4-5 star reviews to Google while keeping 1-3 star feedback internal.
            </p>
          </div>
          <div className="brutalist-card p-8 text-center">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-black mb-4 uppercase letter-spacing-label text-black">Multi-Tenant</h3>
            <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
              Complete business isolation with custom branding and separate data.
            </p>
          </div>
          <div className="brutalist-card p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-black mb-4 uppercase letter-spacing-label text-black">Analytics</h3>
            <p className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
              Real-time dashboard with conversion tracking and business insights.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-4 gap-5">
          <div className="brutalist-card p-6 text-center bg-black text-white">
            <div className="text-3xl font-black mb-2">99.9%</div>
            <div className="text-xs font-bold letter-spacing-label uppercase">UPTIME</div>
          </div>
          <div className="brutalist-card p-6 text-center bg-black text-white">
            <div className="text-3xl font-black mb-2">10K+</div>
            <div className="text-xs font-bold letter-spacing-label uppercase">BUSINESSES</div>
          </div>
          <div className="brutalist-card p-6 text-center bg-black text-white">
            <div className="text-3xl font-black mb-2">1M+</div>
            <div className="text-xs font-bold letter-spacing-label uppercase">REVIEWS</div>
          </div>
          <div className="brutalist-card p-6 text-center bg-black text-white">
            <div className="text-3xl font-black mb-2">4.9★</div>
            <div className="text-xs font-bold letter-spacing-label uppercase">RATING</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="brutalist-container border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="text-center">
            <p className="text-xs font-bold letter-spacing-body uppercase text-gray-600">
              © 2025 99 REVIEWS. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}