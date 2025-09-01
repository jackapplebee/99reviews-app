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
          <h1 className="text-5xl font-black text-black mb-4 uppercase letter-spacing-title leading-tight">
            TIRED OF BAD REVIEWS<br/>
            <span style={{ color: 'var(--accent)' }}>DESTROYING YOUR BUSINESS?</span>
          </h1>
          
          {/* Big Promise */}
          <p className="text-xl font-bold letter-spacing-body uppercase text-gray-700 mb-6 leading-relaxed">
            Get 10X more 5-star Google reviews while automatically hiding negative feedback<br/>
            <span className="text-black">WITHOUT ASKING CUSTOMERS TO "LEAVE A REVIEW"</span>
          </p>

          {/* Social Proof */}
          <div className="brutalist-container bg-yellow-100 border-2 border-black p-4 mb-8 inline-block">
            <p className="text-sm font-bold letter-spacing-label uppercase text-black">
              📈 1,247+ BUSINESSES ALREADY USING • 47,000+ NEW 5-STAR REVIEWS THIS MONTH
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mb-8">
            <a 
              href="/auth/register"
              className="brutalist-button bg-black text-white border-2 border-black hover:bg-white hover:text-black text-xl px-12 py-6 mb-4 inline-block"
            >
              START GETTING 5-STAR REVIEWS TODAY →
            </a>
            <div className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
              ⚡ SETUP IN 3 MINUTES • NO CREDIT CARD • 14-DAY FREE TRIAL
            </div>
          </div>

          {/* Value Stack */}
          <div className="text-left max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-black text-black mb-6 uppercase letter-spacing-title text-center">
              HERE'S WHAT YOU GET:
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="brutalist-container bg-green-50 border-2 border-black p-4">
                <div className="text-lg font-black text-black mb-2 uppercase">✅ SMART REVIEW ROUTING</div>
                <div className="text-sm font-bold text-gray-700">Happy customers go to Google. Unhappy ones stay private.</div>
              </div>
              <div className="brutalist-container bg-blue-50 border-2 border-black p-4">
                <div className="text-lg font-black text-black mb-2 uppercase">✅ AUTOMATED FOLLOW-UP</div>
                <div className="text-sm font-bold text-gray-700">Never manually ask for reviews again. We handle everything.</div>
              </div>
              <div className="brutalist-container bg-purple-50 border-2 border-black p-4">
                <div className="text-lg font-black text-black mb-2 uppercase">✅ DAMAGE CONTROL</div>
                <div className="text-sm font-bold text-gray-700">Fix problems privately before they hurt your reputation.</div>
              </div>
              <div className="brutalist-container bg-orange-50 border-2 border-black p-4">
                <div className="text-lg font-black text-black mb-2 uppercase">✅ INSTANT SETUP</div>
                <div className="text-sm font-bold text-gray-700">Works with any business. No technical skills required.</div>
              </div>
            </div>
          </div>

          {/* Urgency + Secondary CTA */}
          <div className="brutalist-container bg-red-100 border-2 border-red-600 p-6 mb-8">
            <h3 className="text-xl font-black text-red-800 mb-3 uppercase letter-spacing-title">
              🚨 LIMITED TIME: FREE FOR 14 DAYS
            </h3>
            <p className="text-sm font-bold text-red-700 mb-4 uppercase">
              Usually $97/month • Get started now before we end this promotion
            </p>
            <a 
              href="/auth/register"
              className="brutalist-button bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600 text-lg px-8 py-4"
            >
              CLAIM YOUR FREE TRIAL NOW →
            </a>
          </div>

        </div>

        {/* Social Proof Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-black mb-8 uppercase letter-spacing-title text-center">
            REAL RESULTS FROM REAL BUSINESSES:
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="brutalist-container bg-white border-2 border-black p-6">
              <div className="text-4xl font-black text-green-600 mb-2">+127%</div>
              <div className="text-sm font-bold text-black uppercase mb-2">Google Reviews in 30 days</div>
              <div className="text-xs text-gray-600">"Went from 23 to 52 five-star reviews. Game changer." - Mike's Auto Shop</div>
            </div>
            <div className="brutalist-container bg-white border-2 border-black p-6">
              <div className="text-4xl font-black text-blue-600 mb-2">$47K</div>
              <div className="text-sm font-bold text-black uppercase mb-2">Extra Revenue Per Month</div>
              <div className="text-xs text-gray-600">"Higher ratings = more customers. Simple math." - Sarah's Restaurant</div>
            </div>
            <div className="brutalist-container bg-white border-2 border-black p-6">
              <div className="text-4xl font-black text-purple-600 mb-2">4.9★</div>
              <div className="text-sm font-bold text-black uppercase mb-2">Average Google Rating</div>
              <div className="text-xs text-gray-600">"Bad reviews stopped showing up. Only good ones now." - Tom's Gym</div>
            </div>
          </div>
        </div>

        {/* The Problem/Solution */}
        <div className="brutalist-container bg-gray-50 border-2 border-black p-8 mb-16">
          <h2 className="text-3xl font-black text-black mb-6 uppercase letter-spacing-title text-center">
            HERE'S THE PROBLEM EVERY BUSINESS OWNER FACES:
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-black text-red-600 mb-4 uppercase">❌ THE OLD WAY SUCKS:</h3>
                <ul className="space-y-2 text-sm font-bold text-gray-700">
                  <li>• Beg customers to leave reviews</li>
                  <li>• Bad reviews tank your reputation</li>
                  <li>• Spend hours managing feedback</li>
                  <li>• Miss out on potential customers</li>
                  <li>• Competitors outrank you online</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-green-600 mb-4 uppercase">✅ THE 99REVIEWS WAY:</h3>
                <ul className="space-y-2 text-sm font-bold text-gray-700">
                  <li>• Automatic 5-star review collection</li>
                  <li>• Bad reviews never see daylight</li>
                  <li>• Set it and forget it automation</li>
                  <li>• Customers find YOU instead</li>
                  <li>• Dominate local search results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-4xl font-black text-black mb-6 uppercase letter-spacing-title">
            READY TO 10X YOUR REVIEWS?
          </h2>
          <p className="text-lg font-bold text-gray-700 mb-8 uppercase">
            Join 1,247+ smart business owners who stopped begging for reviews
          </p>
          <a 
            href="/auth/register"
            className="brutalist-button bg-black text-white border-2 border-black hover:bg-white hover:text-black text-2xl px-16 py-8 mb-4 inline-block"
          >
            START MY FREE TRIAL →
          </a>
          <div className="text-sm font-bold letter-spacing-body uppercase text-gray-600">
            ⚡ 3-MINUTE SETUP • CANCEL ANYTIME • RISK-FREE GUARANTEE
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