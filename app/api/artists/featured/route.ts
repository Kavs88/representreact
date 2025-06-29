import { NextResponse } from 'next/server';
import { getArtists } from '../../../../lib/airtable';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🔍 Featured Artists API called');
    
    // Use the centralized data pipeline
    const artists = await getArtists();
    
    // Filter for featured artists
    const featuredArtists = artists.filter(artist => artist.fields.Featured);
    
    console.log('Returning', featuredArtists.length, 'featured artists');
    return NextResponse.json(featuredArtists);
  } catch (error) {
    console.error('Error fetching featured artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured artists', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 