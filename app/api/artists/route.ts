import { NextRequest, NextResponse } from 'next/server';

// Configure Airtable REST API with Personal Access Token
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTISTS_TABLE = process.env.AIRTABLE_ARTISTS_TABLE || 'Artists';

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

    // Always fetch all artists first, then filter if needed
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}`);
    console.log('Fetching from:', url.toString());

    // Fetch records from Airtable using REST API
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch artists from Airtable', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Records found:', data.records.length);

    // Transform records to Artist objects
    let artists = data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name || '',
      specialty: record.fields.Specialty || '',
      location: record.fields.Location || '',
      bio: record.fields.Bio || '',
      image: record.fields.ProfileImage?.[0]?.url || '',
      slug: record.fields.Slug || '',
      tags: Array.isArray(record.fields.Specialties)
        ? record.fields.Specialties
        : typeof record.fields.Specialties === 'string'
          ? record.fields.Specialties.split(',').map((s: string) => s.trim())
          : [],
      socialLinks: {
        instagram: record.fields.Instagram || '',
        twitter: record.fields.Twitter || '',
        website: record.fields.Website || ''
      },
      featured: record.fields.Featured || false,
      createdDate: record.fields['Created Date'] || '',
      updatedDate: record.fields['Updated Date'] || '',
    }));

    // Filter for featured artists if requested
    if (featuredOnly) {
      artists = artists.filter(artist => artist.featured);
      console.log('Filtered to featured artists:', artists.length);
    }

    console.log('Returning', artists.length, 'artists');
    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists', details: error.message },
      { status: 500 }
    );
  }
} 