import { NextRequest, NextResponse } from 'next/server';

// Configure Airtable REST API with Personal Access Token
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTISTS_TABLE = process.env.AIRTABLE_ARTISTS_TABLE || 'Artists';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Build the URL with filter formula
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}`);
    url.searchParams.append('filterByFormula', `{Name} = '${slug}'`);
    url.searchParams.append('maxRecords', '1');

    // Fetch artist by slug using REST API
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch artist from Airtable', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.records.length === 0) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    const record = data.records[0];

    // Transform Airtable record to our Artist interface
    const artist = {
      id: record.id,
      name: record.fields.Name || '',
      specialty: record.fields.Specialty || '',
      location: '', // Not in your current schema
      bio: record.fields.Bio || '',
      image: record.fields.ProfileImage || '',
      slug: record.fields.Name || '', // Using Name as slug for now
      tags: Array.isArray(record.fields.Tags)
        ? record.fields.Tags
        : typeof record.fields.Tags === 'string'
          ? record.fields.Tags.split(',').map((s: string) => s.trim())
          : [],
      socialLinks: {
        instagram: record.fields.SocialLinks || '',
        twitter: '',
        website: '',
      },
      featured: record.fields.Featured || false,
      createdDate: '',
      updatedDate: '',
      // Include theme fields and generated banner image
      fields: {
        ThemePrimaryColor: record.fields.ThemePrimaryColor || '',
        ThemeBackgroundColor: record.fields.ThemeBackgroundColor || '',
        ThemeTextColor: record.fields.ThemeTextColor || '',
        GeneratedBannerImage: record.fields.GeneratedBannerImage || '',
      }
    };

    return NextResponse.json(artist);
  } catch (error) {
    console.error('Error fetching artist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artist' },
      { status: 500 }
    );
  }
} 