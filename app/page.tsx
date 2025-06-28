"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "../components/ui/button";
import { FeaturedArtistCard } from "../components/artist-components";
import { useArtists } from "../hooks/useArtists";
import Link from "next/link";

const artworkImages = [
  "https://source.unsplash.com/800x600/?abstract,art,contemporary",
  "https://source.unsplash.com/800x600/?sculpture,modern,installation",
  "https://source.unsplash.com/800x600/?painting,texture,layered",
  "https://source.unsplash.com/800x600/?digital,art,geometric",
  "https://source.unsplash.com/800x600/?photography,urban,architecture",
  "https://source.unsplash.com/800x600/?mixed,media,artwork"
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Art Collector",
    text: "Represent+ has introduced me to some of the most innovative artists working today. Their curation is impeccable.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Gallery Director",
    text: "The quality of artists and the professional presentation make Represent+ a standout in the contemporary art world.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Art Consultant",
    text: "Working with Represent+ has been transformative. They truly understand the intersection of creativity and commerce.",
    rating: 5
  }
];

// Animated Text Component
const AnimatedText = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const characters = text.split("");
  
  return (
    <div className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

// Reveal on Scroll Component
const RevealOnScroll = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  return (
    <motion.button
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      animate={{
        x: isHovered ? mousePosition.x * 0.3 : 0,
        y: isHovered ? mousePosition.y * 0.3 : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default function HomePage() {
  const { artists, loading } = useArtists();
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Get featured artists (first 3)
  const featuredArtists = artists.slice(0, 3);

  useEffect(() => {
    if (!isCarouselPaused) {
      const interval = setInterval(() => {
        setCurrentArtworkIndex((prev) => (prev + 1) % artworkImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isCarouselPaused]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section - Premium Minimalist */}
      <section className="relative bg-primary-dark text-background min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-gray-900 to-primary-dark"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-[#00ff9d] to-[#008f57] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-[#008f57] to-[#00ff9d] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-none mb-4">
              <span className="text-white">DISCOVER</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#008f57]">
                EXCEPTIONAL
              </span>
              <br />
              <span className="text-white">TALENT</span>
            </h1>
          </div>
          
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-300 mx-auto leading-relaxed">
            A curated platform showcasing the most innovative contemporary artists from around the world.
          </p>
          
          <RevealOnScroll delay={1.0}>
            <Link href="/artists">
              <MagneticButton className="bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl transition-all duration-300 mt-8">
                View All Artists
              </MagneticButton>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Work Section - Placeholder for Carousel */}
      <section className="w-full bg-background py-16 md:py-24">
        {/* Placeholder for Featured Artist Carousel to be built next */}
        <div className="text-center">
          <h2 className="font-serif text-4xl text-foreground">Featured Work</h2>
        </div>
      </section>

      {/* Featured Artists - Restyled with neon-green background and black text */}
      <section className="py-16 bg-[#00ff9d]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-black tracking-tight">
              FEATURED ARTISTS
            </h2>
            <p className="text-xl text-black/80 max-w-2xl mx-auto font-medium">
              Discover the creative visionaries shaping contemporary art
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-black/70">Loading featured artists...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArtists.map((artist) => (
                <FeaturedArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section - Back to dark */}
      <section className="py-20 bg-[#0e0e0e]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Trusted by artists, collectors, and galleries worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-[#101010] p-8 rounded-2xl border border-gray-800">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#00ff9d] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to Discover Exceptional Art?
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Join our community of artists, collectors, and art enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold px-8 py-4 rounded-full transition-all duration-300">
                Get Started
              </Button>
              <Button className="border border-gray-600 hover:border-[#00ff9d] text-gray-300 hover:text-[#00ff9d] font-semibold px-8 py-4 rounded-full transition-all duration-300 bg-transparent">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 