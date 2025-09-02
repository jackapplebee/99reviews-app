'use client'

import { useEffect } from 'react'

export default function Animations() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      return // Skip animations if user prefers reduced motion
    }

    // Intersection Observer for fade-in animations
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach((el) => observer.observe(el))

    // Counter animation
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter[data-count]')
      
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-count') || '0')
        const increment = target / 50 // Animate over 50 frames
        let current = 0
        
        const updateCounter = () => {
          if (current < target) {
            current += increment
            if (target >= 1000) {
              counter.textContent = Math.floor(current).toLocaleString() + '+'
            } else {
              counter.textContent = Math.floor(current).toString()
            }
            requestAnimationFrame(updateCounter)
          } else {
            if (target >= 1000) {
              counter.textContent = target.toLocaleString() + '+'
            } else {
              counter.textContent = target.toString()
            }
          }
        }
        
        updateCounter()
      })
    }

    // Trigger counter animation when counter section comes into view
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          counterObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    const counterSection = document.querySelector('[data-count]')?.closest('section')
    if (counterSection) {
      counterObserver.observe(counterSection)
    }

    // Progress bar animation
    const animateProgressBars = () => {
      const progressBars = document.querySelectorAll('.progress-fill[data-progress]')
      
      progressBars.forEach((bar) => {
        const progress = parseInt(bar.getAttribute('data-progress') || '0')
        const element = bar as HTMLElement
        element.style.width = `${progress}%`
      })
    }

    // Trigger progress animation when progress section comes into view
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBars()
          progressObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    const progressSection = document.querySelector('.progress-bar')?.closest('section')
    if (progressSection) {
      progressObserver.observe(progressSection)
    }

    // Form interaction enhancements
    const enhanceFormInteractions = () => {
      const emailInput = document.querySelector('#email-signup') as HTMLInputElement
      const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
      
      if (emailInput && submitButton) {
        // Email validation
        emailInput.addEventListener('input', () => {
          const isValid = emailInput.validity.valid && emailInput.value.length > 0
          
          if (isValid) {
            emailInput.classList.remove('border-red-300')
            emailInput.classList.add('border-green-300')
            submitButton.disabled = false
            submitButton.classList.remove('opacity-50', 'cursor-not-allowed')
          } else {
            emailInput.classList.remove('border-green-300')
            submitButton.disabled = true
            submitButton.classList.add('opacity-50', 'cursor-not-allowed')
          }
        })

        // Form submission
        const form = emailInput.closest('form')
        if (form) {
          form.addEventListener('submit', (e) => {
            e.preventDefault()
            
            // Add loading state
            submitButton.innerHTML = 'Starting...'
            submitButton.disabled = true
            
            // Simulate API call
            setTimeout(() => {
              // Redirect to registration
              window.location.href = '/auth/register'
            }, 1000)
          })
        }
      }
    }

    // Initialize form enhancements
    enhanceFormInteractions()

    // Cleanup function
    return () => {
      observer.disconnect()
      counterObserver.disconnect()
      progressObserver.disconnect()
    }
  }, [])

  return null // This component only adds behavior, no UI
}