// BACKUP VERSION 1.0 - Artist Profile Page
// Created: 2024-01-XX
// Features: Basic artist profile with motion effects, exhibitions, activities
// This is a backup before implementing collections and dynamic media

"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { TagBadge, PressFeatureCard } from "../../../components/artist-components";
import { useArtist } from "../../../hooks/useArtists";
import { ArtistLayoutConfig, PressFeature } from "../../../types/artist";
import { useParams } from "next/navigation";

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

function ArtworkCard({ artwork }: { artwork: any }) {
  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-[#101010] border border-gray-800 hover:border-[#00ff9d] transition-all duration-500"
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 40px rgba(0, 255, 157, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img 
            src={artwork.image} 
            alt={artwork.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Artwork Info Overlay */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-white font-semibold text-lg mb-1">{artwork.title}</h3>
          <p className="text-gray-300 text-sm">{artwork.year} • {artwork.medium}</p>
          <p className="text-gray-400 text-xs">{artwork.dimensions}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ExhibitionCard({ exhibition }: { exhibition: any }) {
  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-[#101010] border border-gray-800 hover:border-[#00ff9d] transition-all duration-500"
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 40px rgba(0, 255, 157, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img 
            src={exhibition.image} 
            alt={exhibition.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Exhibition Info Overlay */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-white font-semibold text-lg mb-1">{exhibition.title}</h3>
          <p className="text-gray-300 text-sm">{exhibition.venue}</p>
          <p className="text-gray-400 text-xs">{exhibition.date}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ActivityCard({ activity }: { activity: any }) {
  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-[#101010] border border-gray-800 hover:border-[#00ff9d] transition-all duration-500"
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 40px rgba(0, 255, 157, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <motion.img 
            src={activity.image} 
            alt={activity.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Activity Info Overlay */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-white font-semibold text-lg mb-1">{activity.title}</h3>
          <p className="text-gray-300 text-sm">{activity.type}</p>
          <p className="text-gray-400 text-xs">{activity.date}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function SocialLinks({ social }: { social: any }) {
  return (
    <motion.div 
      className="flex space-x-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {social.instagram && (
        <motion.a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </motion.a>
      )}
      {social.twitter && (
        <motion.a
          href={social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </motion.a>
      )}
      {social.website && (
        <motion.a
          href={social.website}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gradient-to-br from-[#00ff9d] to-[#008f57] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </motion.a>
      )}
    </motion.div>
  );
}

// Mock data for development
const mockArtworks = [
  {
    id: "1",
    title: "Digital Dreams",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    year: "2024",
    medium: "Mixed Media",
    dimensions: "48\" x 60\""
  },
  {
    id: "2",
    title: "Urban Symphony",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    year: "2023",
    medium: "Oil on Canvas",
    dimensions: "36\" x 48\""
  },
  {
    id: "3",
    title: "Quiet Space",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=600&fit=crop",
    year: "2024",
    medium: "Charcoal on Paper",
    dimensions: "24\" x 24\""
  }
];

const mockExhibitions = [
  {
    id: "1",
    title: "Contemporary Visions",
    venue: "Modern Art Gallery",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop"
  },
  {
    id: "2",
    title: "Digital Frontiers",
    venue: "Tech Art Museum",
    date: "January 2024",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
  }
];

const mockActivities = [
  {
    id: "1",
    title: "Artist Talk",
    type: "Public Event",
    date: "February 2024",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=600&fit=crop"
  },
  {
    id: "2",
    title: "Workshop Series",
    type: "Educational",
    date: "Ongoing",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop"
  }
];

const mockPressFeatures = [
  {
    id: "1",
    title: "The Rise of Digital Expressionism",
    publication: "Art & Culture Magazine",
    excerpt: "Exploring how contemporary artists are redefining traditional boundaries through digital mediums.",
    url: "https://example.com/article1",
    thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    title: "Interview: Breaking the Mold",
    publication: "Creative Quarterly",
    excerpt: "An in-depth conversation about innovation in contemporary art practices.",
    url: "https://example.com/article2"
  }
];

export default function ArtistProfile() {
  const params = useParams();
  const slug = params.slug as string;
  const { artist, loading, error } = useArtist(slug);

  // Motion refs
  const heroRef = useRef(null);
  const bioRef = useRef(null);
  const artworkRef = useRef(null);
  const exhibitionsRef = useRef(null);
  const activitiesRef = useRef(null);
  const pressRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const heroInView = useInView(heroRef, { once: true });
  const bioInView = useInView(bioRef, { once: true });
  const artworkInView = useInView(artworkRef, { once: true });
  const exhibitionsInView = useInView(exhibitionsRef, { once: true });
  const activitiesInView = useInView(activitiesRef, { once: true });
  const pressInView = useInView(pressRef, { once: true });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00ff9d]"></div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist Not Found</h1>
          <Link href="/artists" className="text-[#00ff9d] hover:underline">
            Back to Artists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={artist.profileImage}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          <AnimatedText
            text={artist.name}
            className="text-6xl md:text-8xl font-bold mb-6"
            delay={0.2}
          />
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {artist.specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <TagBadge text={specialty} />
              </motion.div>
            ))}
          </div>
          
          {artist.socialLinks && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <SocialLinks social={artist.socialLinks} />
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* Bio Section */}
      <RevealOnScroll delay={0.2}>
        <section ref={bioRef} className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About</h2>
            <p className="text-lg leading-relaxed text-gray-300 text-center max-w-3xl mx-auto">
              {artist.bio}
            </p>
          </div>
        </section>
      </RevealOnScroll>

      {/* Artwork Section */}
      <RevealOnScroll delay={0.3}>
        <section ref={artworkRef} className="py-20 px-6 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Selected Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockArtworks.map((artwork, index) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Exhibitions Section */}
      <RevealOnScroll delay={0.4}>
        <section ref={exhibitionsRef} className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Exhibitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mockExhibitions.map((exhibition, index) => (
                <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Activities Section */}
      <RevealOnScroll delay={0.5}>
        <section ref={activitiesRef} className="py-20 px-6 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Activities & Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mockActivities.map((activity, index) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Press & Features Section */}
      <RevealOnScroll delay={0.6}>
        <section ref={pressRef} className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Press & Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mockPressFeatures.map((feature, index) => (
                <PressFeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* CTA Section */}
      <RevealOnScroll delay={0.7}>
        <section className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Interested in {artist.name}'s Work?</h2>
            <p className="text-gray-400 mb-8">
              Get in touch to learn more about available pieces and upcoming exhibitions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="px-8 py-3 bg-gradient-to-r from-[#00ff9d] to-[#008f57] text-black font-bold rounded-lg hover:from-[#00e68a] hover:to-[#007a4a] transition-all duration-300">
                  Contact Us
                </Button>
              </Link>
              <Link href="/artists">
                <Button variant="outline" className="px-8 py-3 border-[#00ff9d] text-[#00ff9d] font-bold rounded-lg hover:bg-[#00ff9d] hover:text-black transition-all duration-300">
                  View All Artists
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
} 