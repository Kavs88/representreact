import { NextRequest, NextResponse } from 'next/server';

// Configure Airtable REST API with Personal Access Token
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const TAGS_TABLE = process.env.AIRTABLE_TAGS_TABLE || 'Tags';

export async function GET(request: NextRequest) {
  try {
    // Build the URL with query parameters
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TAGS_TABLE}`);
    url.searchParams.append('sort[0][field]', 'Name');
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
        { error: 'Failed to fetch tags from Airtable', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform Airtable records to our Tag interface
    const tags = data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name || '',
      slug: record.fields.Slug || '',
      createdDate: record.fields['Created Date'] || '',
      updatedDate: record.fields['Updated Date'] || '',
    }));

    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
} 