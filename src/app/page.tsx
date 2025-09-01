'use client'

import { useSession, signOut } from 'next-auth/react'

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white landing-page">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">
            99Reviews
          </h1>
          <div className="flex items-center space-x-4">
            {status === 'authenticated' ? (
              <>
                <a 
                  href="/dashboard"
                  className="landing-button px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-none"
                >
                  Dashboard
                </a>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="landing-button px-4 py-2 bg-red-500 text-white hover:bg-red-600 border-none"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/auth/login"
                  className="landing-button px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                >
                  Sign In
                </a>
                <a 
                  href="/auth/register"
                  className="landing-button px-6 py-2 bg-black text-white hover:bg-gray-800 border-none"
                >
                  Get Started
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
          <h1 className="landing-hero-title text-5xl md:text-6xl text-gray-900 mb-6">
            Stop Bad Reviews From<br/>
            <span className="text-orange-500">Killing Your Business</span>
          </h1>
          
          {/* Big Promise */}
          <p className="landing-subtitle text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get 10x more 5-star Google reviews while automatically filtering negative feedback before it goes public
          </p>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>1,200+ businesses protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>47K+ positive reviews generated</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>3-minute setup</span>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mb-16">
            <a 
              href="/auth/register"
              className="landing-button text-lg px-8 py-4 bg-black text-white hover:bg-gray-800 border-none inline-block"
            >
              Start Free Trial →
            </a>
            <div className="text-sm text-gray-500 mt-3">
              Free for 14 days • No credit card required • Cancel anytime
            </div>
          </div>

          {/* Value Stack */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="landing-hero-title text-3xl md:text-4xl text-gray-900 mb-12 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="landing-card p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Review Routing</h3>
                <p className="text-gray-600 leading-relaxed">Happy customers (4-5 stars) get sent to Google. Unhappy ones (1-3 stars) stay private for you to address.</p>
              </div>
              <div className="landing-card p-8">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Automated Follow-Up</h3>
                <p className="text-gray-600 leading-relaxed">Stop manually asking for reviews. Our system automatically sends personalized requests to your customers.</p>
              </div>
              <div className="landing-card p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Reputation Protection</h3>
                <p className="text-gray-600 leading-relaxed">Fix issues privately before they become public problems. Turn unhappy customers into loyal advocates.</p>
              </div>
              <div className="landing-card p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Results</h3>
                <p className="text-gray-600 leading-relaxed">See more positive reviews within days. No technical setup required - works with any business type.</p>
              </div>
            </div>
          </div>

          {/* Social Proof Results */}
          <div className="mb-20">
            <h2 className="landing-hero-title text-3xl md:text-4xl text-gray-900 mb-12 text-center">
              Real Results From Real Businesses
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="landing-card p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-3">127%</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">More Google Reviews</div>
                <div className="text-sm text-gray-600 italic">"Went from 23 to 52 five-star reviews in 30 days. This actually works."</div>
                <div className="text-xs text-gray-500 mt-2">- Mike's Auto Shop</div>
              </div>
              <div className="landing-card p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-3">$47K</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">Extra Monthly Revenue</div>
                <div className="text-sm text-gray-600 italic">"Higher ratings brought way more customers. The ROI is insane."</div>
                <div className="text-xs text-gray-500 mt-2">- Sarah's Restaurant</div>
              </div>
              <div className="landing-card p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-3">4.9★</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">Average Rating</div>
                <div className="text-sm text-gray-600 italic">"Bad reviews stopped showing up. Now it's only good ones."</div>
                <div className="text-xs text-gray-500 mt-2">- Tom's Fitness</div>
              </div>
            </div>
          </div>

        </div>


        {/* Final CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="landing-card text-center p-12 bg-gradient-to-br from-gray-50 to-white">
            <h2 className="landing-hero-title text-3xl md:text-4xl text-gray-900 mb-6">
              Ready to Transform Your Reviews?
            </h2>
            <p className="landing-subtitle text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 1,200+ businesses that stopped worrying about bad reviews
            </p>
            <a 
              href="/auth/register"
              className="landing-button text-xl px-10 py-4 bg-black text-white hover:bg-gray-800 border-none inline-block mb-4"
            >
              Start Free Trial →
            </a>
            <div className="text-sm text-gray-500">
              14-day free trial • Cancel anytime • No setup fees
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}