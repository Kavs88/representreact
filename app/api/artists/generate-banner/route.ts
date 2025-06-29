import { NextRequest, NextResponse } from 'next/server';

// Configure Airtable REST API with Personal Access Token
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTISTS_TABLE = process.env.AIRTABLE_ARTISTS_TABLE || 'Artists';

// Helper function to get artist by ID from Airtable
async function getArtistById(artistId: string) {
  const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}`);
  url.searchParams.append('filterByFormula', `RECORD_ID() = '${artistId}'`);
  url.searchParams.append('maxRecords', '1');

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch artist: ${response.status}`);
  }

  const data = await response.json();
  return data.records[0];
}

// Helper function to update artist record in Airtable
async function updateArtistRecord(artistId: string, fields: any) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}/${artistId}`;
  
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to update artist: ${response.status}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a trusted source
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.BANNER_GENERATION_SECRET;
    
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { artistId } = await request.json();

    if (!artistId) {
      return NextResponse.json(
        { error: 'artistId is required' },
        { status: 400 }
      );
    }

    // Step 1: Fetch artist data
    const artistRecord = await getArtistById(artistId);
    if (!artistRecord) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    const artistName = artistRecord.fields.Name || 'Artist';
    const artistSpecialty = artistRecord.fields.Specialty || 'Creative Professional';
    const profileImageUrl = artistRecord.fields.ProfileImage;

    if (!profileImageUrl) {
      return NextResponse.json(
        { error: 'Artist profile image not found' },
        { status: 400 }
      );
    }

    // Step 2: Analyze - Extract color palette from profile image
    // TODO: Call Palette Extraction API here that fetches a color palette from the image URL
    // This would typically call a service like Cloudinary's color extraction or a custom ML service
    const extractedColors = {
      primary: '#00ff9d',
      secondary: '#008f57', 
      background: '#0e0e0e',
      accent: '#39FF14'
    };

    // Step 3: Generate - Create banner image using AI
    // TODO: Call Image Generation API (e.g., DALL-E 3) here. This section will build a dynamic text prompt using the extracted colors and send the request.
    const prompt = `Create a stunning, minimalist banner image for an artist named "${artistName}" who specializes in "${artistSpecialty}". 
    The banner should feature:
    - A sophisticated, modern design with a 16:6 aspect ratio
    - Primary color: ${extractedColors.primary}
    - Secondary color: ${extractedColors.secondary}
    - Background color: ${extractedColors.background}
    - Accent color: ${extractedColors.accent}
    - Subtle geometric patterns or abstract elements
    - Clean typography space for the artist's name
    - Professional, gallery-worthy aesthetic
    - No text overlay - just the visual design
    Style: Contemporary, artistic, professional, minimalist`;

    // Placeholder for the generated banner URL
    // In a real implementation, this would be the result from DALL-E 3 or similar AI image generation
    const generatedBannerUrl = `https://source.unsplash.com/1600x600/?abstract,art,${encodeURIComponent(artistName)}`;

    // Step 4: Store - Update Airtable record
    // TODO: Update Airtable record. This will take the URL of the newly generated banner and update the GeneratedBannerImage field for the correct artist in Airtable.
    await updateArtistRecord(artistId, {
      GeneratedBannerImage: generatedBannerUrl
    });

    return NextResponse.json({
      success: true,
      artistId,
      bannerUrl: generatedBannerUrl,
      message: 'Banner generated and stored successfully'
    });

  } catch (error) {
    console.error('Error generating banner:', error);
    return NextResponse.json(
      { error: 'Failed to generate banner' },
      { status: 500 }
    );
  }
} 