import { z } from 'zod';

// Artist schema for validation - matches actual Airtable table structure
const artistSchema = z.object({
  id: z.string(),
  fields: z.object({
    Name: z.string().optional(),
    Specialty: z.string().optional(),
    Bio: z.string().optional(),
    ProfileImage: z.array(z.object({ url: z.string() })).optional(),
    Instagram: z.string().optional(),
    Specialties: z.union([z.array(z.string()), z.string()]).optional(),
    Featured: z.boolean().optional(),
    ThemePrimaryColor: z.string().optional(),
    ThemeBackgroundColor: z.string().optional(),
    ThemeTextColor: z.string().optional(),
    GeneratedBannerImage: z.string().optional(),
  }),
});

export type Artist = z.infer<typeof artistSchema>;

// Airtable configuration
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTISTS_TABLE = process.env.AIRTABLE_ARTISTS_TABLE || 'Artists';

export const getArtistById = async (id: string): Promise<Artist | null> => {
  try {
    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
      console.error('Missing Airtable configuration');
      return null;
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}/${id}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Artist with ID ${id} not found`);
        return null;
      }
      console.error(`Airtable API error: ${response.status}`);
      return null;
    }

    const record = await response.json();
    
    const validatedData = artistSchema.safeParse(record);
    if (!validatedData.success) {
      console.error("Zod validation error for single artist:", validatedData.error);
      return null;
    }
    
    return validatedData.data;
  } catch (error) {
    console.error(`Error fetching artist by ID ${id}:`, error);
    return null;
  }
};

// Since there's no Slug field, we'll use the Name field for routing
export const getArtistByName = async (name: string): Promise<Artist | null> => {
  try {
    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
      console.error('Missing Airtable configuration');
      return null;
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}?filterByFormula={Name}="${name}"`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Airtable API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (!data.records || data.records.length === 0) {
      console.log(`Artist with name ${name} not found`);
      return null;
    }

    const record = data.records[0];
    
    const validatedData = artistSchema.safeParse(record);
    if (!validatedData.success) {
      console.error("Zod validation error for single artist:", validatedData.error);
      return null;
    }
    
    return validatedData.data;
  } catch (error) {
    console.error(`Error fetching artist by name ${name}:`, error);
    return null;
  }
}; 