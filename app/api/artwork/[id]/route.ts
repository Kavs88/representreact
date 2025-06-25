import { NextRequest, NextResponse } from 'next/server';

// Configure Airtable REST API with Personal Access Token
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTWORK_TABLE = process.env.AIRTABLE_ARTWORK_TABLE || 'Artwork';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Build the URL to fetch specific artwork by ID
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTWORK_TABLE}/${id}`);

    // Fetch artwork by ID using REST API
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
        { error: 'Failed to fetch artwork from Airtable', details: errorData },
        { status: response.status }
      );
    }

    const record = await response.json();

    // Transform Airtable record to our Artwork interface
    const artwork = {
      id: record.id,
      title: record.fields.Title || '',
      artistSlug: record.fields.ArtistSlug || '',
      image: record.fields.ImageUrl || '',
      description: record.fields.Description || '',
      price: record.fields.Price || 0,
      category: record.fields.Category || '',
      tags: record.fields.Tags
        ? record.fields.Tags.split(',').map((s: string) => s.trim())
        : [],
      createdDate: record.fields['Created Date'] || '',
      updatedDate: record.fields['Updated Date'] || '',
    };

    return NextResponse.json(artwork);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artwork' },
      { status: 500 }
    );
  }
} 