export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTISTS_TABLE = process.env.AIRTABLE_ARTISTS_TABLE || 'Artists';

export async function GET() {
  try {
    console.log('🔍 Featured Artists API called');
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}`);
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
        { error: 'Failed to fetch artists from Airtable', details: errorData },
        { status: response.status }
      );
    }
    const data = await response.json();
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
    // Always filter for featured artists
    artists = artists.filter(artist => artist.featured);
    return NextResponse.json(artists);
  } catch (error: any) {
    console.error('Error fetching featured artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured artists', details: error.message },
      { status: 500 }
    );
  }
} 