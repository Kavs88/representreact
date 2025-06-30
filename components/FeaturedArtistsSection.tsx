"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { FeaturedArtistCard } from "./artist-components";
import ArtistCardSkeleton from "./ui/ArtistCardSkeleton";
import Link from "next/link";

interface FeaturedArtistsSectionProps {
  featuredArtists: any[];
}

export default function FeaturedArtistsSection({ featuredArtists }: FeaturedArtistsSectionProps) {
  return (
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArtists.length === 0 ? (
            [...Array(3)].map((_, i) => <ArtistCardSkeleton key={i} />)
          ) : (
            featuredArtists.map((artist: any) => (
              <FeaturedArtistCard key={artist.id} artist={artist} />
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/artists">
            <Button className="bg-black text-[#00ff9d] hover:bg-gray-900 font-bold px-8 py-3 rounded-full transition-all duration-300">
              View All Artists
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 