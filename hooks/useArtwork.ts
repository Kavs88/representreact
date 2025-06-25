import { useState, useEffect } from 'react';
import { Artwork } from '../types/artist';

export function useArtwork(artistSlug?: string) {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        
        // Build URL with optional artist filter
        const url = artistSlug 
          ? `/api/artwork?artistSlug=${encodeURIComponent(artistSlug)}`
          : '/api/artwork';
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArtwork(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch artwork');
        console.error('Error fetching artwork:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [artistSlug]);

  return { artwork, loading, error };
}

export function useArtworkByCategory(category?: string) {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        
        // Build URL with optional category filter
        const url = category 
          ? `/api/artwork?category=${encodeURIComponent(category)}`
          : '/api/artwork';
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArtwork(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch artwork');
        console.error('Error fetching artwork:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [category]);

  return { artwork, loading, error };
} 