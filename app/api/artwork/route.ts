import { NextRequest, NextResponse } from 'next/server';

// Configure Airtable REST API with Personal Access Token
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTWORK_TABLE = process.env.AIRTABLE_ARTWORK_TABLE || 'Artwork';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const artistSlug = searchParams.get('artistSlug');
    const category = searchParams.get('category');
    const tags = searchParams.get('tags');

    // Build filter formula
    let filterFormula = '';
    const conditions: string[] = [];

    if (artistSlug) {
      conditions.push(`{ArtistSlug} = '${artistSlug}'`);
    }

    if (category) {
      conditions.push(`{Category} = '${category}'`);
    }

    if (tags) {
      const tagArray = tags.split(',');
      const tagConditions = tagArray.map(tag => `SEARCH('${tag.trim()}', {Tags})`);
      conditions.push(`OR(${tagConditions.join(',')})`);
    }

    if (conditions.length > 0) {
      filterFormula = `AND(${conditions.join(',')})`;
    }

    // Build the URL with query parameters
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTWORK_TABLE}`);
    if (filterFormula) {
      url.searchParams.append('filterByFormula', filterFormula);
    }
    url.searchParams.append('sort[0][field]', 'Title');
    url.searchParams.append('sort[0][direction]', 'asc');

    // Fetch records from Airtable using REST API
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

    const data = await response.json();

    // Transform Airtable records to our Artwork interface
    const artwork = data.records.map((record: any) => ({
      id: record.id,
      title: record.fields.Title || '',
      artistSlug: record.fields.ArtistSlug || '',
      image: record.fields.ImageUrl || '',
      description: record.fields.Description || '',
      price: record.fields.Price || 0,
      category: record.fields.Category || '',
      tags: Array.isArray(record.fields.Tags)
        ? record.fields.Tags
        : typeof record.fields.Tags === 'string'
          ? record.fields.Tags.split(',').map((s: string) => s.trim())
          : [],
      createdDate: record.fields['Created Date'] || '',
      updatedDate: record.fields['Updated Date'] || '',
    }));

    return NextResponse.json(artwork);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artwork' },
      { status: 500 }
    );
  }
} 