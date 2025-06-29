import { getArtistByName } from '../../../lib/airtable';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ArtistProfileClient from './artist-profile-client';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = await getArtistByName(params.slug);
  
  if (!artist) {
    return {
      title: 'Artist Not Found',
      description: 'The artist you are looking for could not be found.',
    };
  }

  return {
    title: `${artist.fields.Name || 'Artist'} - Represent+`,
    description: artist.fields.Bio || `Discover the work of ${artist.fields.Name || 'this artist'} on Represent+.`,
    openGraph: {
      title: `${artist.fields.Name || 'Artist'} - Represent+`,
      description: artist.fields.Bio || `Discover the work of ${artist.fields.Name || 'this artist'} on Represent+.`,
      images: artist.fields.ProfileImage?.[0]?.url ? [artist.fields.ProfileImage[0].url] : [],
    },
  };
}

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = await getArtistByName(params.slug);

  if (!artist) {
    notFound();
  }

  return <ArtistProfileClient artist={artist} />;
} 