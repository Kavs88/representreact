import React from "react";
import "/globals.css";
import Link from "next/link";
import GlobalMotionWrapper from "../components/GlobalMotionWrapper";

export const metadata = {
  title: "Represent+ Artist Platform",
  description: "A boutique platform showcasing exceptional artistic talent from around the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#0e0e0e] text-white font-sans">
        {/* Navigation */}
        <header className="fixed top-0 left-0 w-full bg-[#0e0e0e]/90 backdrop-blur-sm z-50 border-b border-gray-800">
          <div className="container mx-auto flex items-center justify-between h-20 px-6">
            <div className="text-2xl font-bold text-white">
              <Link href="/">Represent<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#008f57]">+</span></Link>
            </div>
            <nav className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-[#00ff9d] transition-colors">Home</Link>
              <Link href="/artists" className="text-sm font-medium text-gray-300 hover:text-[#00ff9d] transition-colors">Artists</Link>
              <Link href="/testimonials" className="text-sm font-medium text-gray-300 hover:text-[#00ff9d] transition-colors">Testimonials</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-[#00ff9d] transition-colors">Contact</Link>
            </nav>
            <div className="md:hidden">
              {/* Mobile menu button placeholder */}
              <button className="text-gray-300 hover:text-[#00ff9d] cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <GlobalMotionWrapper>
            {children}
          </GlobalMotionWrapper>
        </main>
        {/* Footer */}
        <footer className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-t border-gray-800 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Represent<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#008f57]">+</span></h3>
                <p className="text-gray-400 mb-6">A boutique platform showcasing exceptional artistic talent from around the world.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-[#00ff9d] transition-colors cursor-pointer">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-[#00ff9d] transition-colors cursor-pointer">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-[#00ff9d] transition-colors cursor-pointer">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Subscribe</h3>
                <p className="text-gray-400 mb-4">Join our newsletter to stay updated with new artists and exhibitions.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="rounded-l-lg border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-2 border border-gray-700 bg-[#101010] text-white placeholder-gray-400 focus:border-[#00ff9d]" 
                  />
                  <button className="rounded-r-lg bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold px-4 py-2 transition-all duration-300">Subscribe</button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
                <p className="text-gray-400 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#00ff9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Art District, NY 10001
                </p>
                <p className="text-gray-400 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#00ff9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 123-4567
                </p>
                <p className="text-gray-400 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#00ff9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@representplus.com
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
              <p>© 2025 Represent+. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 