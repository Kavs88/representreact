"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "../components/ui/button";
import { FeaturedArtistCard } from "../components/artist-components";
import { useFeaturedArtists } from "../hooks/useArtists";

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

// Parallax Section Component
const ParallaxSection = ({ children, speed = 0.5 }: { children: React.ReactNode; speed?: number }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
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

export default function HomePageEnhanced() {
  const { artists: featuredArtists, loading } = useFeaturedArtists();
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    if (!isCarouselPaused) {
      const interval = setInterval(() => {
        setCurrentArtworkIndex((prev) => (prev + 1) % artworkImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isCarouselPaused]);

  return (
    <motion.div 
      className="min-h-screen bg-[#0e0e0e] text-white font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section - Enhanced with Parallax */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] via-[#101010] to-[#0a0a0a]"></div>
        
        {/* Animated background elements */}
        <ParallaxSection speed={0.3}>
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-[#00ff9d] to-[#008f57] rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-[#008f57] to-[#00ff9d] rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                delay: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </ParallaxSection>

        {/* Main content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <RevealOnScroll>
            <div className="mb-6">
              <AnimatedText 
                text="DISCOVER"
                className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4 block"
                delay={0.2}
              />
              <AnimatedText 
                text="EXCEPTIONAL"
                className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4 block text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#008f57]"
                delay={0.4}
              />
              <AnimatedText 
                text="TALENT"
                className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4 block"
                delay={0.6}
              />
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.8}>
            <p className="text-lg md:text-xl text-gray-300 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
              A curated platform showcasing the most innovative contemporary artists from around the world.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={1.0}>
            <MagneticButton className="bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl transition-all duration-300">
              See Our Artists
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </section>

      {/* Artwork Carousel - Enhanced with Motion */}
      <section className="py-16 bg-[#0e0e0e] overflow-hidden">
        <RevealOnScroll>
          <div 
            className="relative"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <motion.div 
              className="flex transition-transform duration-1000 ease-in-out" 
              style={{ transform: `translateX(-${currentArtworkIndex * 100}%)` }}
            >
              {artworkImages.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="w-full flex-shrink-0 px-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                    <img 
                      src={image} 
                      alt={`Contemporary artwork ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {artworkImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentArtworkIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentArtworkIndex 
                      ? 'bg-gradient-to-r from-[#00ff9d] to-[#008f57]' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Featured Artists - Enhanced with Motion */}
      <section className="py-16 bg-[#00ff9d]">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <AnimatedText 
                text="FEATURED ARTISTS"
                className="text-4xl md:text-5xl font-black mb-4 text-black tracking-tight"
                delay={0.2}
              />
              <p className="text-xl text-black/80 max-w-2xl mx-auto font-medium">
                Discover the creative visionaries shaping contemporary art
              </p>
            </div>
          </RevealOnScroll>
          
          {loading ? (
            <RevealOnScroll>
              <div className="text-center py-12">
                <motion.div 
                  className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-black/70">Loading featured artists...</p>
              </div>
            </RevealOnScroll>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArtists.map((artist, index) => (
                <RevealOnScroll key={artist.id} delay={index * 0.2}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FeaturedArtistCard artist={artist} />
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section - Enhanced with Motion */}
      <section className="py-20 bg-[#0e0e0e]">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <AnimatedText 
                text="What Our Community Says"
                className="text-4xl md:text-5xl font-bold mb-4 text-white"
                delay={0.2}
              />
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Trusted by artists, collectors, and galleries worldwide
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <RevealOnScroll key={testimonial.id} delay={index * 0.2}>
                <motion.div 
                  className="bg-[#101010] p-8 rounded-2xl border border-gray-800"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.svg 
                        key={i} 
                        className="w-5 h-5 text-[#00ff9d] fill-current" 
                        viewBox="0 0 20 20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center">
              <AnimatedText 
                text="Ready to Discover Exceptional Art?"
                className="text-2xl font-bold mb-4 text-white"
                delay={0.2}
              />
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Join our community of artists, collectors, and art enthusiasts.
              </p>
              <MagneticButton className="bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold px-8 py-4 rounded-full shadow-2xl transition-all duration-300">
                Get Started Today
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </motion.div>
  );
} 