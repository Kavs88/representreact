"use client";
import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName" className="text-white font-semibold">First Name</Label>
          <Input 
            id="firstName" 
            type="text" 
            required 
            className="mt-2 bg-[#101010] border-gray-700 text-white placeholder-gray-400 focus:border-[#00ff9d] focus:ring-[#00ff9d]"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-white font-semibold">Last Name</Label>
          <Input 
            id="lastName" 
            type="text" 
            required 
            className="mt-2 bg-[#101010] border-gray-700 text-white placeholder-gray-400 focus:border-[#00ff9d] focus:ring-[#00ff9d]"
            placeholder="Enter your last name"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email" className="text-white font-semibold">Email Address</Label>
        <Input 
          id="email" 
          type="email" 
          required 
          className="mt-2 bg-[#101010] border-gray-700 text-white placeholder-gray-400 focus:border-[#00ff9d] focus:ring-[#00ff9d]"
          placeholder="Enter your email address"
        />
      </div>
      
      <div>
        <Label htmlFor="subject" className="text-white font-semibold">Subject</Label>
        <Input 
          id="subject" 
          type="text" 
          required 
          className="mt-2 bg-[#101010] border-gray-700 text-white placeholder-gray-400 focus:border-[#00ff9d] focus:ring-[#00ff9d]"
          placeholder="What is this regarding?"
        />
      </div>
      
      <div>
        <Label htmlFor="message" className="text-white font-semibold">Message</Label>
        <Textarea 
          id="message" 
          required 
          rows={6}
          className="mt-2 bg-[#101010] border-gray-700 text-white placeholder-gray-400 focus:border-[#00ff9d] focus:ring-[#00ff9d] resize-none"
          placeholder="Tell us more about your inquiry..."
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold py-4 rounded-lg transition-all duration-300"
      >
        Send Message
      </Button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#0e0e0e] via-[#101010] to-[#0a0a0a]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white">GET IN</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#008f57]">
              TOUCH
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about our artists, platform, or services? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-[#0e0e0e]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Send Us a Message</h2>
                <ContactForm />
              </div>
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#00ff9d] to-[#008f57] rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Email</h4>
                        <p className="text-gray-400">hello@representplus.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#00ff9d] to-[#008f57] rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Phone</h4>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#00ff9d] to-[#008f57] rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Office</h4>
                        <p className="text-gray-400">123 Art District<br />New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-white">Business Hours</h3>
                  <div className="space-y-2 text-gray-400">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-white">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-[#00ff9d] rounded-lg flex items-center justify-center transition-all duration-300">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-[#00ff9d] rounded-lg flex items-center justify-center transition-all duration-300">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-[#00ff9d] rounded-lg flex items-center justify-center transition-all duration-300">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#39FF14] text-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-black/80 max-w-2xl mx-auto">
              Find answers to common questions about our platform and services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-black">
              <h3 className="text-xl font-bold mb-3 text-black">How do I apply to become an artist on Represent+?</h3>
              <p className="text-black/80">We review applications on a rolling basis. Submit your portfolio through our artist application form, and our curation team will review your work within 2-3 weeks.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-black">
              <h3 className="text-xl font-bold mb-3 text-black">How can I purchase artwork from artists?</h3>
              <p className="text-black/80">Contact us directly through the contact form or reach out to the specific artist through their profile page. We'll facilitate the transaction and ensure a smooth process.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-black">
              <h3 className="text-xl font-bold mb-3 text-black">Do you offer shipping and insurance?</h3>
              <p className="text-black/80">Yes, we provide professional art handling, shipping, and insurance services for all transactions. We work with trusted partners to ensure your artwork arrives safely.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-black">
              <h3 className="text-xl font-bold mb-3 text-black">Can I commission custom artwork?</h3>
              <p className="text-black/80">Many of our artists accept commissions. Contact us with your requirements, and we'll connect you with artists whose style matches your vision.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 