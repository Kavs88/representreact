"use client";

import React, { useState, useMemo } from 'react';
import { Artist } from '@/types/artist';
import { ArtistCard } from '@/components/artist-components';

interface Props {
  initialArtists: Artist[];
  allTags: string[];
}

export default function NewArtistGrid({ initialArtists, allTags }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredArtists = useMemo(() => {
    return initialArtists.filter(artist => {
      const nameMatch = artist.fields.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      
      // Handle specialties filtering
      const artistSpecialties = Array.isArray(artist.fields.Specialties) 
        ? artist.fields.Specialties 
        : typeof artist.fields.Specialties === 'string'
          ? artist.fields.Specialties.split(',').map(s => s.trim())
          : [];
      
      const tagMatch = selectedTags.length === 0 || 
        selectedTags.every(tag => artistSpecialties.includes(tag));
      
      return nameMatch && tagMatch;
    });
  }, [searchTerm, selectedTags, initialArtists]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-6">
        {/* Search Input */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search artists by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent bg-white/5 backdrop-blur-sm text-white placeholder-gray-400"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-[#00ff9d] text-black shadow-lg shadow-[#00ff9d]/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-gray-400 text-sm">
          Showing {filteredArtists.length} of {initialArtists.length} artists
        </div>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArtists.length > 0 ? (
          filteredArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No artists found</div>
            <div className="text-gray-500 text-sm">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 