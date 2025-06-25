"use client";
import React from "react";
import { Button } from "../../components/ui/button";

// Mock data for testimonials - replace with actual useTestimonials hook
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Art Collector",
    company: "Chen Gallery",
    text: "Represent+ has introduced me to some of the most innovative artists working today. Their curation is impeccable and the quality of work consistently exceeds expectations. I've built my entire collection through their platform.",
    rating: 5,
    image: "https://source.unsplash.com/200x200/?portrait,woman,professional"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Gallery Director",
    company: "Contemporary Arts Center",
    text: "The quality of artists and the professional presentation make Represent+ a standout in the contemporary art world. Their platform has helped us discover emerging talent that we've successfully exhibited.",
    rating: 5,
    image: "https://source.unsplash.com/200x200/?portrait,man,business"
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Art Consultant",
    company: "Thompson Art Advisory",
    text: "Working with Represent+ has been transformative for my clients. They truly understand the intersection of creativity and commerce, making it easy to connect collectors with exceptional artists.",
    rating: 5,
    image: "https://source.unsplash.com/200x200/?portrait,woman,consultant"
  },
  {
    id: 4,
    name: "David Park",
    role: "Artist",
    company: "Independent Studio",
    text: "Represent+ has given me a platform to showcase my work to a global audience. The exposure and connections I've made through their platform have been invaluable to my career growth.",
    rating: 5,
    image: "https://source.unsplash.com/200x200/?artist,portrait,man"
  },
  {
    id: 5,
    name: "Isabella Santos",
    role: "Museum Curator",
    company: "Modern Art Museum",
    text: "The caliber of artists on Represent+ is consistently high. I've discovered several artists through their platform that we've since featured in our exhibitions. Their curation is world-class.",
    rating: 5,
    image: "https://source.unsplash.com/200x200/?curator,portrait,woman"
  },
  {
    id: 6,
    name: "Alex Thompson",
    role: "Private Collector",
    company: "Independent",
    text: "Represent+ has revolutionized how I discover and collect art. The platform makes it easy to explore new artists and their work, with detailed information and high-quality images.",
    rating: 5,
    image: "https://source.unsplash.com/200x200/?collector,portrait,person"
  }
];

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="bg-[#101010] p-8 rounded-2xl border border-gray-800 hover:border-[#00ff9d] transition-all duration-500 transform hover:-translate-y-1">
      <div className="flex items-start space-x-4 mb-6">
        <div className="flex-shrink-0">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{testimonial.name}</h3>
          <p className="text-[#00ff9d] font-semibold mb-1">{testimonial.role}</p>
          <p className="text-gray-400 text-sm">{testimonial.company}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-[#00ff9d] fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <blockquote className="text-gray-300 leading-relaxed text-lg italic">
        "{testimonial.text}"
      </blockquote>
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#0e0e0e] via-[#101010] to-[#0a0a0a]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white">WHAT OUR</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#008f57]">
              COMMUNITY SAYS
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Trusted by artists, collectors, galleries, and art enthusiasts worldwide. Here's what they have to say about their experience with Represent+.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-[#0e0e0e]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#39FF14] text-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-black/80 max-w-2xl mx-auto">
              Our platform has connected artists and collectors across the globe
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">500+</div>
              <div className="text-black/80 font-medium">Artists</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">2,000+</div>
              <div className="text-black/80 font-medium">Collectors</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">50+</div>
              <div className="text-black/80 font-medium">Countries</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">4.9★</div>
              <div className="text-black/80 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0e0e0e]">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Join Our Community
          </h3>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you're an artist looking to showcase your work or a collector seeking exceptional pieces, Represent+ is here to connect you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold px-8 py-4 rounded-full transition-all duration-300">
              For Artists
            </Button>
            <Button className="border border-gray-600 hover:border-[#00ff9d] text-gray-300 hover:text-[#00ff9d] font-semibold px-8 py-4 rounded-full transition-all duration-300 bg-transparent">
              For Collectors
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 