import { useState, useEffect } from 'react';
import { Artist } from '../types/artist';

export function useArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        
        // Fetch artists from Airtable API
        const response = await fetch('/api/artists');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArtists(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch artists');
        console.error('Error fetching artists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artists, loading, error };
}

export function useArtist(slug: string) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        
        // Fetch artist from Airtable API
        const response = await fetch(`/api/artists/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Artist not found');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArtist(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch artist');
        console.error('Error fetching artist:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArtist();
    }
  }, [slug]);

  return { artist, loading, error };
}

export function useFeaturedArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedArtists = async () => {
      try {
        setLoading(true);
        
        // Fetch featured artists from new API endpoint
        const response = await fetch('/api/artists/featured');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArtists(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured artists');
        console.error('Error fetching featured artists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArtists();
  }, []);

  return { artists, loading, error };
}

// Helper function to get all unique tags from artists
export function useAllTags() {
  const { artists } = useArtists();
  
  const allTags = artists
    .flatMap(artist => artist.tags)
    .filter((tag, index, array) => array.indexOf(tag) === index)
    .sort();

  return allTags;
} 