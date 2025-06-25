"use client";
import React, { useState, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { ArtistCard } from "../../components/artist-components";
import { FilterPanelProps } from "../../types/artist";
import { useArtists } from "../../hooks/useArtists";

function FilterPanel({ allTags, selectedTags, onTagToggle, onClearAll }: FilterPanelProps) {
  return (
    <div className="bg-[#101010] p-6 rounded-2xl border border-gray-800 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 className="text-lg font-semibold text-white mb-2 sm:mb-0">Filter by Specialty</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-[#00ff9d] hover:text-[#39FF14] transition-colors duration-300"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <label
            key={tag}
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          >
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => onTagToggle(tag)}
              className="w-4 h-4 text-[#00ff9d] bg-gray-800 border-gray-600 rounded focus:ring-[#00ff9d] focus:ring-2"
            />
            <span className="text-sm text-gray-300">{tag}</span>
          </label>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Showing artists with: <span className="text-[#00ff9d] font-medium">{selectedTags.join(', ')}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default function ArtistsPage() {
  const { artists, loading, error } = useArtists();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from artists
  const allTags = useMemo(() => {
    const tags = artists.flatMap(artist => artist.tags);
    return Array.from(new Set(tags)).sort();
  }, [artists]);

  // Filter artists based on selected tags
  const filteredArtists = useMemo(() => {
    if (selectedTags.length === 0) {
      return artists;
    }
    return artists.filter(artist => 
      selectedTags.some(tag => artist.tags.includes(tag))
    );
  }, [artists, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00ff9d] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading artists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Artists</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold px-6 py-3 rounded-full transition-all duration-300"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#0e0e0e] via-[#101010] to-[#0a0a0a]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="text-white">OUR</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#008f57]">
              ARTISTS
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover exceptional talent from around the world. Each artist brings a unique perspective to contemporary art.
          </p>
        </div>
      </section>

      {/* Filter Panel */}
      <section className="py-8 bg-[#0e0e0e]">
        <div className="container mx-auto px-6">
          <FilterPanel
            allTags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearAll}
          />
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-20 bg-[#0e0e0e]">
        <div className="container mx-auto px-6">
          {filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-4">No artists found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filter criteria</p>
              <Button 
                onClick={handleClearAll}
                className="bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold px-6 py-3 rounded-full transition-all duration-300"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-400">
                  Showing {filteredArtists.length} of {artists.length} artists
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </>
          )}
          
          {/* Load More Button */}
          <div className="text-center mt-16">
            <Button className="bg-gradient-to-r from-[#00ff9d] to-[#008f57] hover:from-[#00e68a] hover:to-[#007a4a] text-black font-bold px-8 py-4 rounded-full transition-all duration-300">
              Load More Artists
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#39FF14] text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Are You an Artist?
          </h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Join our platform and showcase your work to a global audience of collectors and art enthusiasts.
          </p>
          <Button className="bg-black hover:bg-black/80 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 border-2 border-black">
            Apply to Join
          </Button>
        </div>
      </section>
    </div>
  );
} 