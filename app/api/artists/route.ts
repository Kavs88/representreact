import { NextRequest, NextResponse } from 'next/server';
import { getArtists } from '../../../lib/airtable';

// Configure Airtable REST API with Personal Access Token
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTISTS_TABLE = process.env.AIRTABLE_ARTISTS_TABLE || 'Artists';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Artists API called');
    console.log('Base ID:', AIRTABLE_BASE_ID);
    console.log('API Key exists:', !!AIRTABLE_API_KEY);
    console.log('Table:', ARTISTS_TABLE);

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get('featured') === 'true';
    
    console.log('Featured only:', featuredOnly);

    // Use the centralized data pipeline
    const artists = await getArtists();
    
    if (featuredOnly) {
      const featuredArtists = artists.filter(artist => artist.fields.Featured);
      console.log('Filtered to featured artists:', featuredArtists.length);
      return NextResponse.json(featuredArtists);
    }

    console.log('Returning', artists.length, 'artists');
    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 