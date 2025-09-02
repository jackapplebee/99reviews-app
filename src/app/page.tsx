'use client'

import { useSession, signOut } from 'next-auth/react'
import Animations from '@/components/animations'

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-white fade-in">
      {/* Navigation - Professional Design System */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="container flex items-center justify-between h-full">
          <a href="/" className="text-2xl font-bold text-primary focus-visible" aria-label="99Reviews Home">
            99Reviews
          </a>
          <div className="flex items-center space-x-1">
            {status === 'authenticated' ? (
              <>
                <a 
                  href="/dashboard"
                  className="nav-link focus-visible"
                  aria-label="Go to Dashboard"
                >
                  Dashboard
                </a>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-primary btn-rounded focus-visible"
                  aria-label="Sign out of account"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/auth/login"
                  className="nav-link focus-visible"
                >
                  Help
                </a>
                <a 
                  href="/auth/login"
                  className="nav-link focus-visible"
                >
                  About
                </a>
                <a 
                  href="/auth/register"
                  className="btn-primary btn-rounded focus-visible"
                  aria-label="Get started with 99Reviews"
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Hormozi Style High-Conversion */}
      <section className="bg-gradient text-white section-lg" aria-labelledby="hero-headline">
        <div className="container text-center fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 id="hero-headline" className="hero-headline text-white mb-4">
              50 real five-star reviews,<br/>
              <span className="text-yellow-300">on us</span>
            </h1>
            
            <p className="body-large text-white opacity-90 mb-8 max-w-2xl mx-auto">
              No fake reviews. No incentives. Just happy customers finally leaving the reviews they meant to write.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button 
                className="btn-primary bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-4 text-lg font-bold"
                aria-label="Get your first 50 reviews free"
              >
                Get Your First 50 Reviews FREE
              </button>
              <button 
                className="btn-secondary border-white text-white hover:bg-white hover:text-black px-6 py-4"
                aria-label="Watch how it works"
              >
                Watch How It Works (2 min)
              </button>
            </div>
            
            <div className="caption text-white opacity-75">
              ✓ No credit card required • ✓ Setup in 48 hours • ✓ Results in 3 days
            </div>
          </div>
        </div>
      </section>

      {/* Live Proof Bar */}
      <section className="section-sm bg-black text-white" aria-labelledby="proof-headline">
        <div className="container text-center fade-in">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="body-text text-white font-medium">LIVE:</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400" data-count="14847">
              14,847 five-star reviews
            </div>
            <div className="body-text text-white opacity-90">
              delivered this month across 67 restaurants
            </div>
          </div>
        </div>
      </section>
      
      {/* Holy Shit Visual Proof */}
      <section className="section" aria-labelledby="proof-headline">
        <div className="container text-center fade-in">
          <h2 id="proof-headline" className="section-headline text-primary mb-12">
            Real Results From Real Restaurants
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before Card */}
            <div className="card bg-red-50 border-2 border-red-200">
              <div className="text-red-600 font-bold mb-4 text-lg">BEFORE 99Reviews</div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="body-text">Google Rating:</span>
                  <span className="text-2xl font-bold text-red-600">4.2 ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="body-text">Monthly Reviews:</span>
                  <span className="text-2xl font-bold text-red-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="body-text">Total Reviews:</span>
                  <span className="text-2xl font-bold text-red-600">31</span>
                </div>
              </div>
            </div>
            
            {/* After Card */}
            <div className="card bg-green-50 border-2 border-green-200">
              <div className="text-green-600 font-bold mb-4 text-lg">AFTER 99Reviews</div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="body-text">Google Rating:</span>
                  <span className="text-2xl font-bold text-green-600">4.8 ⭐</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="body-text">Monthly Reviews:</span>
                  <span className="text-2xl font-bold text-green-600">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="body-text">Total Reviews:</span>
                  <span className="text-2xl font-bold text-green-600">178</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="body-text text-secondary mb-4">
              <strong>Real data from Applebee's Fish & Seafood - 45 days</strong>
            </p>
            <button className="btn-primary">
              See Live Dashboard
            </button>
          </div>
        </div>
      </section>
      
      {/* You Do Nothing Section */}
      <section className="section bg-gray-50" aria-labelledby="easy-headline">
        <div className="container text-center fade-in">
          <h2 id="easy-headline" className="section-headline text-primary mb-12">
            You Do Nothing. We Do Everything.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="sub-headline text-red-600 mb-6">We Handle:</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Email design & sending</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Timing optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Review routing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Complaint capture</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Weekly reporting</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="sub-headline text-green-600 mb-6">You Handle:</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Counting your new reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Reading happy feedback</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Watching revenue grow</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-yellow-100 rounded-lg max-w-md mx-auto">
            <p className="body-large font-bold text-black">
              Setup takes 48 hours. Results start day 3.
            </p>
          </div>
        </div>
      </section>

      {/* Money Section - ROI Calculator */}
      <section className="section" aria-labelledby="money-headline">
        <div className="container text-center fade-in">
          <h2 id="money-headline" className="section-headline text-primary mb-12">
            Let's Talk Money
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-12">
            <div className="card bg-red-50 border-2 border-red-200">
              <h3 className="sub-headline text-red-600 mb-6">Without 99Reviews</h3>
              <div className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="body-text">You're at:</span>
                  <span className="font-bold text-red-600">4.2 stars</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-text">You lose:</span>
                  <span className="font-bold text-red-600">30% of customers</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-text">Lost revenue:</span>
                  <span className="font-bold text-red-600 text-xl">$50K/month</span>
                </div>
              </div>
            </div>
            
            <div className="card bg-green-50 border-2 border-green-200">
              <h3 className="sub-headline text-green-600 mb-6">With 99Reviews</h3>
              <div className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="body-text">You jump to:</span>
                  <span className="font-bold text-green-600">4.8 stars</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-text">You capture:</span>
                  <span className="font-bold text-green-600">That 30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-text">ROI:</span>
                  <span className="font-bold text-green-600 text-xl">Week One</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card bg-gradient-to-r from-yellow-400 to-orange-400 text-black max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-4">Revenue Calculator</h3>
            <div className="space-y-4">
              <div>
                <label className="body-text font-medium mb-2 block">Current Monthly Revenue:</label>
                <input 
                  type="text" 
                  placeholder="$50,000"
                  className="input w-full text-center text-xl font-bold"
                />
              </div>
              <div className="border-t-2 border-black pt-4">
                <div className="text-3xl font-bold mb-2">Potential Monthly Gain:</div>
                <div className="text-4xl font-black text-green-700">+$15,000</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Real Testimonials */}
      <section className="section bg-gray-50" aria-labelledby="testimonials-headline">
        <div className="container text-center fade-in">
          <h2 id="testimonials-headline" className="section-headline text-primary mb-12">
            But Wait, Is This Actually Real?
          </h2>
          
          <div className="mb-12">
            <div className="bg-black rounded-lg p-8 max-w-2xl mx-auto">
              <div className="text-white mb-4">
                <div className="text-sm opacity-75 mb-2">Video Testimonial - 30 seconds</div>
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">▶️</div>
                  <div className="body-text">Restaurant owner showing actual Google reviews dashboard</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid desktop-grid-cols-3 gap-8 mb-12">
            <article className="card scale-hover fade-in" role="article">
              <div className="star-rating mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="star" aria-hidden="true"></div>
                ))}
              </div>
              <blockquote className="body-text text-primary mb-6">
                "We went from 31 reviews to 178 reviews in 6 weeks. Revenue is up $18K per month."
              </blockquote>
              <footer>
                <div className="font-bold">Sarah Martinez</div>
                <cite className="caption text-secondary">Bella Vista Italian</cite>
              </footer>
            </article>

            <article className="card scale-hover fade-in fade-in-delay-1" role="article">
              <div className="star-rating mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="star" aria-hidden="true"></div>
                ))}
              </div>
              <blockquote className="body-text text-primary mb-6">
                "52 five-star reviews in our first month. My staff doesn't have to beg anyone anymore."
              </blockquote>
              <footer>
                <div className="font-bold">Marcus Thompson</div>
                <cite className="caption text-secondary">Thompson's Grill</cite>
              </footer>
            </article>

            <article className="card scale-hover fade-in fade-in-delay-2" role="article">
              <div className="star-rating mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="star" aria-hidden="true"></div>
                ))}
              </div>
              <blockquote className="body-text text-primary mb-6">
                "4.2 to 4.8 stars in 45 days. We're booked solid now. This actually works."
              </blockquote>
              <footer>
                <div className="font-bold">Jennifer Wu</div>
                <cite className="caption text-secondary">Golden Dragon</cite>
              </footer>
            </article>
          </div>
          
          <button className="btn-primary bg-blue-600 text-white px-8 py-4">
            Watch Us Generate a Review Live
          </button>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="section bg-red-600 text-white" aria-labelledby="competitive-headline">
        <div className="container text-center fade-in">
          <h2 id="competitive-headline" className="section-headline text-white mb-8">
            Your Competitors Are Already Catching On
          </h2>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="body-large text-white mb-6">
              In your area, <strong>3 restaurants</strong> started using 99Reviews last month.
            </p>
            <p className="body-large text-white mb-6">
              They're averaging <strong className="text-yellow-300">52 new five-star reviews each</strong>.
            </p>
            <p className="body-large text-white font-bold">
              The question isn't IF you'll automate reviews.<br/>
              It's whether you'll be first or playing catch-up.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-8 max-w-2xl mx-auto">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="body-text text-white opacity-90">
                Interactive map showing anonymous pins of restaurants using 99Reviews in your city
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Types of Restaurants */}
      <section className="section" aria-labelledby="types-headline">
        <div className="container text-center fade-in">
          <h2 id="types-headline" className="section-headline text-primary mb-12">
            There Are Only Two Types of Restaurants Now
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Type 1 - The Beggars */}
            <div className="card bg-red-50 border-2 border-red-200 text-left">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">😭</div>
                <h3 className="text-2xl font-bold text-red-600">Type 1: The Beggars</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">❌</div>
                  <span className="body-text">Awkwardly ask for reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">❌</div>
                  <span className="body-text">Get 2% success rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">❌</div>
                  <span className="body-text">Staff hate doing it</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">❌</div>
                  <span className="body-text">Customers feel pressured</span>
                </div>
              </div>
            </div>
            
            {/* Type 2 - The Automators */}
            <div className="card bg-green-50 border-2 border-green-200 text-left">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">😎</div>
                <h3 className="text-2xl font-bold text-green-600">Type 2: The Automators</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Never mention reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Get 40% success rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Staff love it</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="body-text">Customers feel valued</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-primary mb-8">
              Which one are you?
            </h3>
          </div>
        </div>
      </section>

      {/* Final Push - Three Options */}
      <section className="section bg-black text-white" aria-labelledby="final-headline">
        <div className="container text-center fade-in">
          <h2 id="final-headline" className="section-headline text-white mb-12">
            Look, You Have Three Options
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Option 1 */}
            <div className="card bg-red-900 border-2 border-red-500">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">❌</div>
                <h3 className="text-xl font-bold text-red-300">Option 1</h3>
              </div>
              <h4 className="text-lg font-bold text-white mb-4">Keep doing what you're doing</h4>
              <div className="text-red-300 space-y-2">
                <div>• 2 reviews/month</div>
                <div>• Slowly declining rating</div>
                <div>• Losing customers to competitors</div>
              </div>
            </div>
            
            {/* Option 2 */}
            <div className="card bg-yellow-900 border-2 border-yellow-500">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">⚠️</div>
                <h3 className="text-xl font-bold text-yellow-300">Option 2</h3>
              </div>
              <h4 className="text-lg font-bold text-white mb-4">Try another review platform</h4>
              <div className="text-yellow-300 space-y-2">
                <div>• Complicated software</div>
                <div>• Your staff won't use it</div>
                <div>• Waste $500/month</div>
              </div>
            </div>
            
            {/* Option 3 */}
            <div className="card bg-green-900 border-2 border-green-400 scale-hover">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="text-xl font-bold text-green-300">Option 3</h3>
              </div>
              <h4 className="text-lg font-bold text-white mb-4">Get your first 50 five-star reviews free</h4>
              <div className="text-green-300 space-y-2">
                <div>• 4.8 stars guaranteed</div>
                <div>• $50K more monthly revenue</div>
                <div>• Setup in 48 hours</div>
              </div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <button className="btn-primary bg-yellow-400 text-black px-12 py-6 text-2xl font-bold mb-4 w-full md:w-auto">
              Start My First 50 Reviews FREE
            </button>
            <div className="caption text-white opacity-75">
              No credit card required for first 50 reviews
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="section-sm bg-yellow-400 text-black" aria-labelledby="guarantee-headline">
        <div className="container text-center fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 id="guarantee-headline" className="text-3xl font-bold mb-6">
              Our Iron-Clad Guarantee
            </h2>
            <p className="text-2xl font-bold mb-4">
              If you don't get 50 five-star reviews in your first 60 days,
            </p>
            <p className="text-3xl font-black">
              we work for FREE until you do.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-sm bg-gray-50" aria-labelledby="faq-headline">
        <div className="container fade-in">
          <h2 id="faq-headline" className="section-headline text-primary text-center mb-12">
            Quick Questions, Straight Answers
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">"Is this ethical?"</h3>
                <p className="body-text text-secondary">Yes, we're just helping real customers share real experiences. Nothing fake, nothing forced.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">"What if we get bad reviews?"</h3>
                <p className="body-text text-secondary">That's the point - they go private to you instead of public on Google. You can fix the problem quietly.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">"Do we need to train staff?"</h3>
                <p className="body-text text-secondary">Zero training. It's completely automated. Your staff won't even know it's running.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">"What if we already ask for reviews?"</h3>
                <p className="body-text text-secondary">You'll 5X your current results. Most restaurants go from 2 reviews/month to 40+ reviews/month.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12" role="contentinfo">
        <div className="container">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-yellow-400 mb-4">99Reviews</div>
            <p className="body-large text-white opacity-90">
              The only review system that guarantees 50 five-star reviews
            </p>
          </div>
          
          <div className="grid desktop-grid-cols-4 gap-8 fade-in">
            <nav aria-label="Help and support links">
              <h4 className="sub-headline text-white mb-4">Support</h4>
              <div className="space-y-2">
                <div><a href="#" className="text-white opacity-75 hover:opacity-100 focus-visible" tabIndex={0}>Help Center</a></div>
                <div><a href="#" className="text-white opacity-75 hover:opacity-100 focus-visible" tabIndex={0}>Contact Us</a></div>
                <div><a href="#" className="text-white opacity-75 hover:opacity-100 focus-visible" tabIndex={0}>Live Chat</a></div>
              </div>
            </nav>
            
            <nav aria-label="Company information links">
              <h4 className="sub-headline text-white mb-4">Company</h4>
              <div className="space-y-2">
                <div><a href="#" className="text-white opacity-75 hover:opacity-100 focus-visible" tabIndex={0}>About</a></div>
                <div><a href="#" className="text-white opacity-75 hover:opacity-100 focus-visible" tabIndex={0}>Case Studies</a></div>
                <div><a href="#" className="text-white opacity-75 hover:opacity-100 focus-visible" tabIndex={0}>Reviews</a></div>
              </div>
            </nav>
            
            <nav aria-label="Legal links">
              <h4 className="sub-headline text-white mb-4">Legal</h4>
              <div className="space-y-2">
                <div><a href="#" className="text-white opacity-75 hover:opacity-100 focus-visible" tabIndex={0}>Terms</a></div>
                <div><a href="#" className="text-white opacity-75 hover:opacity-100 focus-visible" tabIndex={0}>Privacy</a></div>
                <div><a href="#" className="text-white opacity-75 hover:opacity-100 focus-visible" tabIndex={0}>Cookies</a></div>
              </div>
            </nav>
            
            <div>
              <h4 className="sub-headline text-white mb-4">Contact</h4>
              <div className="text-white opacity-75 space-y-2">
                <div>📧 hello@99reviews.com</div>
                <div>📞 (555) 99-REVIEW</div>
                <div>💬 24/7 Live Chat</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-gray-800 caption text-white opacity-50">
            Copyright © 2024 99Reviews. We guarantee your first 50 reviews.
          </div>
        </div>
      </footer>
      
      {/* Initialize animations */}
      <Animations />
    </div>
  )
}