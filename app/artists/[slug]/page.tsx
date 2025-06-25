"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { TagBadge } from "../../../components/artist-components";
import { useArtist } from "../../../hooks/useArtists";
import { useArtwork } from "../../../hooks/useArtwork";
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

function SocialLinks({ social }: { social: any }) {
  if (!social || Object.keys(social).length === 0) {
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

export default function ArtistProfile() {
  const params = useParams();
  const slug = params.slug as string;
  const { artist, loading, error } = useArtist(slug);
  const { artwork, loading: artworkLoading, error: artworkError } = useArtwork(artist?.id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00ff9d] mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-400">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4 text-[#00ff9d]">Artist Not Found</h2>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          The artist you're looking for doesn't seem to exist. They might have moved to a different gallery or the link is incorrect.
        </p>
        <Link href="/artists">
          <Button className="bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl transition-all duration-300">
            Back to Artists
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-[#0e0e0e] text-white font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end justify-start p-8 md:p-12" style={{
        backgroundImage: `url(${artist.image || 'https://source.unsplash.com/1600x900/?abstract,art'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {artist.name}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {artist.specialty}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column: Bio & Details */}
          <div className="md:col-span-1">
            <motion.div 
              className="sticky top-24"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold mb-6 text-[#00ff9d]">Biography</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">{artist.bio || "No biography available."}</p>
              
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-2 text-white">Location</h3>
                <p className="text-gray-400">{artist.location}</p>
              </div>

              {artist.tags && artist.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4 text-white">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.tags.map((tag) => <TagBadge key={tag} tag={tag} />)}
                  </div>
                </div>
              )}
              
              <SocialLinks social={artist.social} />
            </motion.div>
          </div>

          {/* Right Column: Artwork Gallery */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#00ff9d]">Portfolio</h2>
            {artworkLoading && <p className="text-center">Loading artwork...</p>}
            {artworkError && <p className="text-center text-red-500">Error loading artwork.</p>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {!artworkLoading && !artworkError && artwork.map((art) => (
                <motion.div 
                  key={art.id} 
                  className="group relative overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img src={art.image || 'https://source.unsplash.com/800x600/?art,placeholder'} alt={art.title} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white text-lg font-bold">{art.title}</h3>
                    <p className="text-gray-300 text-sm">{art.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 