"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArtistCard } from "../artist-components";

interface ArtistFilterableGridProps {
  artists: any[];
  allTags: string[];
}

export default function ArtistFilterableGrid({ artists, allTags }: ArtistFilterableGridProps) {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Filter artists based on selected tags and search term
  const filteredArtists = React.useMemo(() => {
    if (!artists || !Array.isArray(artists)) {
      return [];
    }

    let filtered = artists;
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(artist => {
        if (!artist || !artist.fields) return false;
        
        const artistSpecialties = Array.isArray(artist.fields.Specialties) 
          ? artist.fields.Specialties 
          : typeof artist.fields.Specialties === 'string'
            ? artist.fields.Specialties.split(',').map(s => s.trim())
            : [];
        
        return selectedTags.some(tag => artistSpecialties.includes(tag));
      });
    }
    
    if (searchTerm) {
      filtered = filtered.filter(artist => {
        if (!artist || !artist.fields) return false;
        
        const name = artist.fields.Name || '';
        const specialty = artist.fields.Specialty || '';
        
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               specialty.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    
    return filtered;
  }, [artists, selectedTags, searchTerm]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
    setSearchTerm("");
  };

  // Show loading state if artists is not available
  if (!artists || !Array.isArray(artists)) {
    return (
      <section className="py-20 bg-[#0e0e0e]">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00ff9d] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading artists...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Filter Panel */}
      <section className="py-8 bg-[#0e0e0e]">
        <div className="container mx-auto px-6">
          <div className="bg-[#101010] p-6 rounded-2xl border border-gray-800 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-white mb-2 sm:mb-0">Filter Artists</h3>
              {(selectedTags.length > 0 || searchTerm) && (
                <button
                  onClick={handleClearAll}
                  className="text-sm text-[#00ff9d] hover:text-[#39FF14] transition-colors duration-300"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search artists by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#00ff9d] focus:ring-[#00ff9d] focus:ring-2"
              />
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
                    onChange={() => handleTagToggle(tag)}
                    className="w-4 h-4 text-[#00ff9d] bg-gray-800 border-gray-600 rounded focus:ring-[#00ff9d] focus:ring-2"
                  />
                  <span className="text-sm text-gray-300">{tag}</span>
                </label>
              ))}
            </div>
            {(selectedTags.length > 0 || searchTerm) && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400">
                  Showing {filteredArtists.length} of {artists.length} artists
                  {selectedTags.length > 0 && (
                    <span> with: <span className="text-[#00ff9d] font-medium">{selectedTags.join(', ')}</span></span>
                  )}
                </p>
              </div>
            )}
          </div>
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
        </div>
      </section>
    </>
  );
} 