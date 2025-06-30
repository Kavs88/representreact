import { getArtists, getAllTags } from "@/lib/airtable";
import NewArtistGrid from "@/components/artists/NewArtistGrid";
import { Suspense } from "react";

export default async function ShowcasePage() {
  // Fetch data server-side in parallel
  const [artists, allTags] = await Promise.all([
    getArtists({}),
    getAllTags(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Artist Showcase
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover talented artists and creators from around the world
          </p>
        </div>
      </div>

      {/* Artists Grid with Suspense */}
      <Suspense fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <NewArtistGrid initialArtists={artists} allTags={allTags} />
      </Suspense>
    </div>
  );
} 