import React from "react";
import { Button } from "../../components/ui/button";
import ArtistsFilter from "../../components/ArtistsFilter";
import { getArtists } from "../../lib/airtable";

export default async function ArtistsPage() {
  const artists = await getArtists();

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

      {/* Client component for filtering and display */}
      <ArtistsFilter artists={artists} />

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