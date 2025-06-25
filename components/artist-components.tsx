import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Artist, TagBadgeProps, ArtistCardProps, PressFeature } from "../types/artist";

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <motion.span 
      className="inline-block px-2 py-1 text-xs font-semibold bg-black text-[#39FF14] rounded-md border border-[#39FF14]"
      aria-label={`Specialty: ${tag}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {tag}
    </motion.span>
  );
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-[#0e0e0e] border border-gray-800 hover:border-[#00ff9d] transition-all duration-500 transform hover:-translate-y-2 shadow-lg"
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 40px rgba(0, 255, 157, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative h-80 overflow-hidden bg-gray-900 flex items-center justify-center">
          {artist.image ? (
            <motion.img 
              src={artist.image} 
              alt={artist.name} 
              className="w-full h-full object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className="hidden w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-4xl font-bold">
            {artist.name.charAt(0).toUpperCase()}
          </div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Tag Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[calc(100%-24px)]">
            {artist.tags.slice(0, 3).map((tag: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <TagBadge tag={tag} />
              </motion.div>
            ))}
            {artist.tags.length > 3 && (
              <motion.span 
                className="inline-block px-2 py-1 text-xs font-semibold bg-black/80 text-white rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                +{artist.tags.length - 3}
              </motion.span>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold mb-2 text-white group-hover:text-[#00ff9d] transition-colors duration-300"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {artist.name}
          </motion.h3>
          <p className="text-gray-400 mb-2">{artist.specialty}</p>
          <p className="text-sm text-gray-500 mb-4">{artist.location}</p>
          <Link href={`/artists/${artist.slug}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-gray-800 hover:bg-gradient-to-r hover:from-[#00ff9d] hover:to-[#008f57] text-white font-semibold py-3 rounded-lg transition-all duration-300">
                View Profile
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeaturedArtistCard({ artist }: ArtistCardProps) {
  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-white border-2 border-black hover:shadow-[0_8px_0_0_rgba(0,0,0,1)] transition-all duration-500 transform hover:-translate-y-1"
        whileHover={{ 
          y: -4,
          boxShadow: "0 8px 0 0 rgba(0,0,0,1), 0 20px 40px rgba(0,0,0,0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative h-80 overflow-hidden bg-gray-100 flex items-center justify-center">
          {artist.image ? (
            <motion.img 
              src={artist.image} 
              alt={artist.name} 
              className="w-full h-full object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className="hidden w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-4xl font-bold">
            {artist.name.charAt(0).toUpperCase()}
          </div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Tag Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[calc(100%-24px)]">
            {artist.tags.slice(0, 3).map((tag: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <TagBadge tag={tag} />
              </motion.div>
            ))}
            {artist.tags.length > 3 && (
              <motion.span 
                className="inline-block px-2 py-1 text-xs font-semibold bg-black/80 text-white rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                +{artist.tags.length - 3}
              </motion.span>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold mb-2 text-black group-hover:text-[#008f57] transition-colors duration-300"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {artist.name}
          </motion.h3>
          <p className="text-black/70 mb-4 font-medium">{artist.specialty}</p>
          <Link href={`/artists/${artist.slug}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-black hover:bg-black/80 text-white font-bold py-3 rounded-lg transition-all duration-300 border-2 border-black hover:shadow-lg">
                View Profile
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PressFeatureCard({ pressFeature }: { pressFeature: PressFeature }) {
  return (
    <motion.div 
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-[#101010] border border-gray-800 hover:border-[#00ff9d] transition-all duration-500 transform hover:-translate-y-1"
        whileHover={{ 
          y: -4,
          boxShadow: "0 20px 40px rgba(0, 255, 157, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {pressFeature.thumbnail && (
          <div className="aspect-[16/9] overflow-hidden">
            <motion.img 
              src={pressFeature.thumbnail} 
              alt={pressFeature.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <motion.span 
              className="text-sm font-semibold text-[#00ff9d] uppercase tracking-wide"
              whileHover={{ scale: 1.05 }}
            >
              {pressFeature.publication}
            </motion.span>
            {pressFeature.date && (
              <span className="text-xs text-gray-500">{pressFeature.date}</span>
            )}
          </div>
          
          <motion.h3 
            className="text-lg font-bold text-white mb-3 group-hover:text-[#00ff9d] transition-colors duration-300 line-clamp-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {pressFeature.title}
          </motion.h3>
          
          {pressFeature.excerpt && (
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
              "{pressFeature.excerpt}"
            </p>
          )}
          
          <motion.a 
            href={pressFeature.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#00ff9d] hover:text-[#39FF14] font-semibold text-sm transition-colors duration-300"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Read Article
            <motion.svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </motion.svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
} 