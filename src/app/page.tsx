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

      {/* Hero Section - Current.com Design System */}
      <section className="bg-gradient text-white section-lg" aria-labelledby="hero-headline">
        <div className="container text-center fade-in">
          <h1 id="hero-headline" className="hero-headline text-white mb-6">
            Power up your<br/>
            reviews today
          </h1>
          
          <form className="flex items-center justify-center max-w-md mx-auto mb-8" role="search" aria-label="Email signup">
            <label htmlFor="email-signup" className="sr-only">Enter your business email</label>
            <input 
              id="email-signup"
              type="email" 
              placeholder="Enter your business email"
              className="input flex-1 rounded-l-full border-0 focus:ring-2 focus:ring-white"
              required
              aria-describedby="email-help"
            />
            <button 
              type="submit"
              className="btn-primary bg-white text-black hover:bg-gray-100 rounded-r-full border-0"
              aria-label="Start your free trial"
            >
              Get Started
            </button>
          </form>
          <div id="email-help" className="caption text-white opacity-90">
            Start your 14-day free trial • No credit card required
          </div>
        </div>
      </section>

      {/* Feature Section - Smart Review Management */}
      <section className="section" aria-labelledby="feature-headline">
        <div className="container">
          <div className="grid desktop-grid-cols-2 gap-12 items-center fade-in">
            <div className="space-y-6">
              <div className="trust-badge uppercase">
                Smart Review Management
              </div>
              <h2 id="feature-headline" className="section-headline text-primary">
                Give businesses their very own review filter
              </h2>
              <p className="body-large text-secondary">
                Empower your business with automatic review routing, instant feedback capture, and real-time reputation alerts.
              </p>
              <button className="btn-secondary focus-visible" aria-label="Learn more about review management">
                Learn More
              </button>
            </div>
            <div className="card bg-gray-50 h-80 flex items-center justify-center scale-hover" role="img" aria-label="Review management dashboard preview">
              <div className="text-secondary body-text">Review Management Dashboard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="section bg-gray-50" aria-labelledby="security-headline">
        <div className="container-narrow text-center">
          <h2 id="security-headline" className="section-headline text-primary mb-16 fade-in">
            Safe and secure.
          </h2>
          <div className="grid desktop-grid-cols-3 gap-12">
            <div className="text-center fade-in fade-in-delay-1">
              <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center" role="img" aria-label="Privacy protection icon">
                <div className="w-8 h-8 bg-yellow-600 rounded"></div>
              </div>
              <h3 className="sub-headline text-primary mb-3">Privacy Protected</h3>
              <p className="body-text text-secondary">Your customer data stays private and secure with enterprise-grade encryption.</p>
            </div>
            
            <div className="text-center fade-in fade-in-delay-2">
              <div className="w-16 h-16 bg-success rounded-full mx-auto mb-6 flex items-center justify-center security-badge" role="img" aria-label="GDPR compliance icon">
                <div className="w-6 h-6 border-2 border-white rounded-sm"></div>
              </div>
              <h3 className="sub-headline text-primary mb-3">GDPR Compliant</h3>
              <p className="body-text text-secondary">Fully compliant with data protection regulations and privacy standards.</p>
            </div>
            
            <div className="text-center fade-in fade-in-delay-3">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center" role="img" aria-label="Reliable uptime icon">
                <div className="w-8 h-6 bg-blue-700 rounded"></div>
              </div>
              <h3 className="sub-headline text-primary mb-3">Reliable Uptime</h3>
              <p className="body-text text-secondary">99.9% uptime guarantee ensures your review system is always working.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="section" aria-labelledby="testimonials-headline">
        <div className="container">
          <h2 id="testimonials-headline" className="sr-only">Customer Testimonials</h2>
          <div className="grid desktop-grid-cols-3 gap-8">
            <article className="testimonial scale-hover fade-in" role="article" aria-label="Customer testimonial">
              <div className="star-rating mb-4" role="img" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="star" aria-hidden="true"></div>
                ))}
              </div>
              <blockquote className="body-text text-primary mb-6">
                "99Reviews is just flat out awesome. I highly recommend it as a primary review management solution. So many great benefits!"
              </blockquote>
              <footer>
                <cite className="caption font-medium text-primary">Business Owner</cite>
              </footer>
            </article>

            <article className="testimonial scale-hover fade-in fade-in-delay-1" role="article" aria-label="Customer testimonial">
              <div className="star-rating mb-4" role="img" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="star" aria-hidden="true"></div>
                ))}
              </div>
              <blockquote className="body-text text-primary mb-6">
                "I absolutely love this service, it's super easy to sign up and use. Love that it gives me my reputation back on time, all the time."
              </blockquote>
              <footer>
                <cite className="caption font-medium text-primary">Restaurant Manager</cite>
              </footer>
            </article>

            <article className="testimonial scale-hover fade-in fade-in-delay-2" role="article" aria-label="Customer testimonial">
              <div className="star-rating mb-4" role="img" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="star" aria-hidden="true"></div>
                ))}
              </div>
              <blockquote className="body-text text-primary mb-6">
                "This is the best review management system, better than Yelp and Google combined, and as good as ReviewTrackers 360."
              </blockquote>
              <footer>
                <cite className="caption font-medium text-primary">Service Provider</cite>
              </footer>
            </article>
          </div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="section bg-black text-white" aria-labelledby="features-headline">
        <div className="container-narrow text-center">
          <h2 id="features-headline" className="section-headline text-white mb-16 fade-in">
            Manage reviews anywhere.
          </h2>
          
          <div className="grid desktop-grid-cols-2 gap-12 mt-16">
            <div className="flex items-center fade-in fade-in-delay-1">
              <div className="w-12 h-12 bg-blue-600 rounded-xl mr-4 flex items-center justify-center" role="img" aria-label="Support icon">
                <span className="text-white text-xl" aria-hidden="true">📞</span>
              </div>
              <div className="text-left">
                <div className="sub-headline text-white">24/7 fast and helpful support</div>
              </div>
            </div>
            
            <div className="flex items-center fade-in fade-in-delay-2">
              <div className="w-12 h-12 bg-blue-600 rounded-xl mr-4 flex items-center justify-center" role="img" aria-label="Scale icon">
                <span className="text-white text-xl" aria-hidden="true">💳</span>
              </div>
              <div className="text-left">
                <div className="sub-headline text-white">50000+ reviews managed nationwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reputation Building Section */}
      <section className="section" aria-labelledby="reputation-headline">
        <div className="container">
          <div className="grid desktop-grid-cols-2 gap-12 items-center">
            <div className="bg-gradient rounded-2xl p-8 h-80 flex items-center justify-center scale-hover fade-in" role="img" aria-label="Review analytics dashboard preview">
              <div className="text-white body-large font-medium">Review Analytics Dashboard</div>
            </div>
            <div className="space-y-6 fade-in fade-in-delay-1">
              <div className="trust-badge uppercase">
                Reputation Building
              </div>
              <h2 id="reputation-headline" className="section-headline text-primary">
                Boost your online reputation by over 80 points after just six months.
              </h2>
              <p className="body-large text-secondary">
                Plus, get 5% more customers from improved search rankings.
              </p>
              <button className="btn-secondary focus-visible" aria-label="Learn more about reputation building">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section bg-gray-50" aria-labelledby="social-proof-headline">
        <div className="container-narrow text-center">
          <h2 id="social-proof-headline" className="section-headline text-primary mb-8 fade-in">
            Join over 50,000 businesses
          </h2>
          <div className="flex flex-wrap justify-center gap-6 items-center mt-12 fade-in fade-in-delay-1">
            <div className="counter" data-count="50000">50,000+</div>
            <div className="text-secondary">businesses trust 99Reviews</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200" role="contentinfo">
        <div className="container">
          <div className="grid desktop-grid-cols-4 gap-8 fade-in">
            <div>
              <div className="text-2xl font-bold text-primary mb-6" aria-label="99Reviews logo">99</div>
              <p className="body-text text-secondary">Professional review management for modern businesses.</p>
            </div>
            
            <nav aria-label="Help and support links">
              <h4 className="sub-headline text-primary mb-4">Help</h4>
              <div className="space-y-2">
                <div><a href="#" className="text-secondary hover:text-primary focus-visible" tabIndex={0}>Blog</a></div>
                <div><a href="#" className="text-secondary hover:text-primary focus-visible" tabIndex={0}>Contact Us</a></div>
                <div><a href="#" className="text-secondary hover:text-primary focus-visible" tabIndex={0}>Legal Docs</a></div>
              </div>
            </nav>
            
            <nav aria-label="Company information links">
              <h4 className="sub-headline text-primary mb-4">Company</h4>
              <div className="space-y-2">
                <div><a href="#" className="text-secondary hover:text-primary focus-visible" tabIndex={0}>Our Story</a></div>
                <div><a href="#" className="text-secondary hover:text-primary focus-visible" tabIndex={0}>Careers</a></div>
                <div><a href="#" className="text-secondary hover:text-primary focus-visible" tabIndex={0}>Press</a></div>
              </div>
            </nav>
            
            <div>
              <div className="bg-black text-white p-6 rounded-lg text-center trust-badge" role="img" aria-label="Business accreditation badge">
                <div className="caption font-medium mb-2">TRUSTED BUSINESS</div>
                <div className="text-2xl font-bold">A+</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between mt-12 pt-8 border-t border-gray-200 caption text-light">
            <div>Copyright © 2024 99Reviews. All rights reserved.</div>
            <nav aria-label="Legal and policy links" className="flex space-x-4">
              <a href="#" className="hover:text-primary focus-visible" tabIndex={0}>Sitemap</a>
              <a href="#" className="hover:text-primary focus-visible" tabIndex={0}>Terms</a>
              <a href="#" className="hover:text-primary focus-visible" tabIndex={0}>Privacy</a>
              <a href="#" className="hover:text-primary focus-visible" tabIndex={0}>Cookies</a>
            </nav>
          </div>
        </div>
      </footer>
      
      {/* Initialize animations */}
      <Animations />
    </div>
  )
}