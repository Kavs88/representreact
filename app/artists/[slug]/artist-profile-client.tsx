"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { TagBadge } from "../../../components/artist-components";
import { useArtwork } from "../../../hooks/useArtwork";
import { Artist } from "../../../lib/airtable";

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
  const ref = useRef<HTMLDivElement>(null);
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

function SocialLinks({ social }: { social: any }) {
  // Check if social links exist and have any non-empty values
  if (!social || Object.keys(social).length === 0 || 
      (!social.instagram && !social.twitter && !social.website)) {
    return null;
  }
  
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

interface ArtistProfileClientProps {
  artist: Artist;
}

export default function ArtistProfileClient({ artist }: ArtistProfileClientProps) {
  const { artwork, loading: artworkLoading, error: artworkError } = useArtwork(artist.id);

  // Create theme styles with fallbacks
  const themeStyles = {
    '--bg-color': artist.fields?.ThemeBackgroundColor || '#0e0e0e',
    '--text-color': artist.fields?.ThemeTextColor || '#ffffff',
    '--primary-color': artist.fields?.ThemePrimaryColor || '#00ff9d',
  } as React.CSSProperties;

  // Transform artist data to match the expected format
  const artistData = {
    id: artist.id,
    name: artist.fields.Name || '',
    specialty: artist.fields.Specialty || '',
    location: '', // Not available in current table structure
    bio: artist.fields.Bio || '',
    image: artist.fields.ProfileImage?.[0]?.url || '',
    slug: artist.fields.Name || '', // Use name as slug since no slug field
    tags: Array.isArray(artist.fields.Specialties)
      ? artist.fields.Specialties
      : typeof artist.fields.Specialties === 'string'
        ? artist.fields.Specialties.split(',').map((s: string) => s.trim())
        : [],
    socialLinks: {
      instagram: artist.fields.Instagram || '',
      twitter: '', // Not available in current table structure
      website: '' // Not available in current table structure
    },
    featured: artist.fields.Featured || false,
    createdDate: '', // Not available in current table structure
    updatedDate: '', // Not available in current table structure
    fields: artist.fields,
  };

  return (
    <motion.div 
      className="min-h-screen bg-[--bg-color] text-[--text-color] font-sans transition-colors duration-500"
      style={themeStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Banner Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end justify-start p-8 md:p-12 overflow-hidden">
        {/* Conditional Banner Display */}
        {artist.fields?.GeneratedBannerImage ? (
          // Use generated banner image
          <div className="absolute inset-0">
            <Image
              src={artist.fields.GeneratedBannerImage}
              alt={`${artistData.name} banner`}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          // Fallback to theme background color or profile image
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: artist.fields?.ThemeBackgroundColor || '#0e0e0e',
              backgroundImage: artistData.image ? `url(${artistData.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Artist Info Overlay */}
        <div className="relative z-10 max-w-4xl">
          <RevealOnScroll delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              <AnimatedText text={artistData.name} className="text-white" />
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.4}>
            <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl">
              {artistData.specialty}
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.6}>
            <SocialLinks social={artistData.socialLinks} />
          </RevealOnScroll>
        </div>
      </section>

      {/* Artist Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Bio Section */}
        {artistData.bio && (
          <RevealOnScroll delay={0.2}>
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-[--primary-color]">About</h2>
              <div className="prose prose-lg max-w-none text-[--text-color]">
                <p className="text-lg leading-relaxed">{artistData.bio}</p>
              </div>
            </section>
          </RevealOnScroll>
        )}

        {/* Tags/Specialties Section */}
        {artistData.tags && artistData.tags.length > 0 && (
          <RevealOnScroll delay={0.4}>
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-[--primary-color]">Specialties</h2>
              <div className="flex flex-wrap gap-3">
                {artistData.tags.map((tag, index) => (
                  <TagBadge key={index} tag={tag} />
                ))}
              </div>
            </section>
          </RevealOnScroll>
        )}

        {/* Artwork Section */}
        <RevealOnScroll delay={0.6}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[--primary-color]">Artwork</h2>
            {artworkLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[--primary-color] mx-auto mb-4"></div>
                <p className="text-[--text-color]/70">Loading artwork...</p>
              </div>
            ) : artworkError ? (
              <div className="text-center py-12">
                <p className="text-red-400">Failed to load artwork</p>
              </div>
            ) : artwork && artwork.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artwork.map((piece) => (
                  <div key={piece.id} className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
                    {piece.image && (
                      <div className="relative h-64">
                        <Image
                          src={piece.image}
                          alt={piece.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{piece.title}</h3>
                      <p className="text-[--text-color]/70">{piece.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[--text-color]/70">No artwork available yet</p>
              </div>
            )}
          </section>
        </RevealOnScroll>

        {/* Back to Artists Button */}
        <RevealOnScroll delay={0.8}>
          <div className="text-center">
            <Link href="/artists">
              <Button className="bg-[--primary-color] hover:bg-[--primary-color]/80 text-black font-bold px-8 py-4 rounded-full transition-all duration-300">
                ← Back to Artists
              </Button>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </motion.div>
  );
}
