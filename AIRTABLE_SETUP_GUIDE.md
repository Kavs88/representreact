# Airtable Setup Guide for Represent+

This guide provides multiple options for setting up your Airtable base for the Represent+ artist platform.

## Option 1: Automated Setup Script (Recommended)

### Prerequisites
1. Install dependencies:
```bash
npm install airtable dotenv
```

2. Create a `.env` file in your project root:
```env
AIRTABLE_API_KEY=your_personal_access_token_here
AIRTABLE_BASE_ID=your_base_id_here
```

### Steps
1. **Create Airtable Base**: Go to [airtable.com](https://airtable.com) and create a new base
2. **Get Personal Access Token**: Go to your Airtable account settings → Personal access tokens → Create new token
3. **Get Base ID**: From your base URL: `https://airtable.com/appXXXXXXXXXXXXXX/...` - the `appXXXXXXXXXXXXXX` part is your Base ID
4. **Create Tables Manually** (required - API can't create tables):
   - Create table named "Artists"
   - Create table named "Artwork" 
   - Create table named "Tags"
5. **Run Setup Script**:
```bash
node scripts/setup-airtable.js
```

## Option 2: Manual Setup with CSV Import

### Step 1: Create Base Structure

#### Artists Table
Create a table named "Artists" with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| Name | Single line text | - |
| Slug | Single line text | - |
| Bio | Long text | - |
| ProfileImage | URL | - |
| SocialLinks | Long text | - |
| Specialties | Multiple select | See specialties list below |
| Featured | Checkbox | - |
| Email | Email | - |
| Phone | Phone number | - |

#### Artwork Table
Create a table named "Artwork" with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| Title | Single line text | - |
| ArtistSlug | Single line text | - |
| ImageUrl | URL | - |
| Description | Long text | - |
| Price | Currency | - |
| Category | Single select | See categories list below |
| Tags | Multiple select | See tags list below |

#### Tags Table
Create a table named "Tags" with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| Name | Single line text | - |
| Slug | Single line text | - |

### Step 2: Import Sample Data

Use the CSV files in the `data/` folder to import sample data:

1. **artists.csv** - Import to Artists table
2. **artwork.csv** - Import to Artwork table  
3. **tags.csv** - Import to Tags table

## Option 3: Complete Manual Setup

### Step 1: Create Base and Tables
1. Go to [airtable.com](https://airtable.com)
2. Create new base named "Represent+ Artists"
3. Create three tables: "Artists", "Artwork", "Tags"

### Step 2: Set Up Artists Table
1. **Rename first field** to "Name" (Single line text)
2. **Add fields**:
   - Slug (Single line text)
   - Bio (Long text)
   - ProfileImage (URL)
   - SocialLinks (Long text)
   - Specialties (Multiple select)
   - Featured (Checkbox)
   - Email (Email)
   - Phone (Phone number)

3. **Configure Specialties options**:
   - Digital Art
   - Abstract Art
   - Street Art
   - Character Design
   - Mixed Media
   - Neon Aesthetics
   - Cyberpunk
   - Cultural Expression
   - Electronic Music
   - Audio-Visual
   - Blockchain Art
   - Murals
   - Community Art
   - Digital Illustration
   - Gaming Art

### Step 3: Set Up Artwork Table
1. **Rename first field** to "Title" (Single line text)
2. **Add fields**:
   - ArtistSlug (Single line text)
   - ImageUrl (URL)
   - Description (Long text)
   - Price (Currency)
   - Category (Single select)
   - Tags (Multiple select)

3. **Configure Category options**:
   - Digital Art
   - Abstract Art
   - Street Art
   - Character Design
   - Audio-Visual

4. **Configure Tags options**:
   - Neon
   - Cyberpunk
   - Digital
   - Cultural
   - Abstract
   - Mixed Media
   - Blockchain
   - Electronic
   - Installation
   - Mural
   - Community
   - Urban
   - Gaming
   - Characters

### Step 4: Set Up Tags Table
1. **Rename first field** to "Name" (Single line text)
2. **Add field**: Slug (Single line text)

### Step 5: Add Sample Data

#### Artists Sample Data
| Name | Slug | Bio | ProfileImage | SocialLinks | Specialties | Featured | Email | Phone |
|------|------|-----|--------------|-------------|-------------|----------|-------|-------|
| Alex Rivera | alex-rivera | Contemporary digital artist specializing in neon aesthetics and cyberpunk themes. | https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face | {"instagram":"https://instagram.com/alexrivera","twitter":"https://twitter.com/alexrivera","website":"https://alexrivera.com"} | Digital Art, Neon Aesthetics, Cyberpunk | ✓ | alex@alexrivera.com | +1-555-0123 |
| Maya Chen | maya-chen | Abstract expressionist painter exploring themes of identity and cultural heritage. | https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face | {"instagram":"https://instagram.com/mayachen","website":"https://mayachen.art"} | Abstract Art, Mixed Media, Cultural Expression | ✓ | maya@mayachen.art | +1-555-0124 |
| DJ Krypto | dj-krypto | Electronic music producer and visual artist creating immersive audio-visual experiences. | https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face | {"instagram":"https://instagram.com/djkrypto","twitter":"https://twitter.com/djkrypto","soundcloud":"https://soundcloud.com/djkrypto"} | Electronic Music, Audio-Visual, Blockchain Art | ✓ | dj@djkrypto.com | +1-555-0125 |

#### Artwork Sample Data
| Title | ArtistSlug | ImageUrl | Description | Price | Category | Tags |
|-------|------------|----------|-------------|-------|----------|------|
| Neon Dreams | alex-rivera | https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop | A vibrant digital composition exploring the intersection of technology and human emotion. | $2,500 | Digital Art | Neon, Cyberpunk, Digital |
| Cultural Fusion | maya-chen | https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=400&fit=crop | Mixed media exploration of cultural identity through abstract expressionism. | $3,200 | Abstract Art | Cultural, Abstract, Mixed Media |
| Crypto Symphony | dj-krypto | https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop | Audio-visual installation piece combining blockchain data with electronic music. | $1,800 | Audio-Visual | Blockchain, Electronic, Installation |

#### Tags Sample Data
| Name | Slug |
|------|------|
| Digital Art | digital-art |
| Abstract Art | abstract-art |
| Street Art | street-art |
| Character Design | character-design |
| Mixed Media | mixed-media |
| Neon Aesthetics | neon-aesthetics |
| Cyberpunk | cyberpunk |
| Cultural Expression | cultural-expression |
| Electronic Music | electronic-music |
| Audio-Visual | audio-visual |
| Blockchain Art | blockchain-art |
| Murals | murals |
| Community Art | community-art |
| Digital Illustration | digital-illustration |
| Gaming Art | gaming-art |

## API Integration

### Environment Variables
Add to your `.env` file:
```env
AIRTABLE_API_KEY=your_personal_access_token_here
AIRTABLE_BASE_ID=your_base_id_here
```

### Testing the Setup
1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3000/api/artists` - should return artists data
3. Visit: `http://localhost:3000/api/artists/alex-rivera` - should return specific artist
4. Visit: `http://localhost:3000/artists` - should show artists with filtering

## Troubleshooting

### Common Issues
1. **"Table not found"** - Make sure table names are exactly "Artists", "Artwork", "Tags"
2. **"Field not found"** - Check field names match exactly (case-sensitive)
3. **"API key invalid"** - Regenerate API key in Airtable account settings
4. **"Base ID invalid"** - Check the base URL for the correct ID

### Field Type Requirements
- **Multiple select fields** must be configured with the exact options listed
- **URL fields** should accept any valid URL format
- **Currency fields** should be set to your preferred currency (USD recommended)
- **Email fields** should validate email format
- **Phone fields** should accept international formats

## Next Steps

After setup:
1. Test the API endpoints
2. Customize the sample data with your actual artists
3. Add more specialties and tags as needed
4. Configure any additional fields specific to your needs
5. Set up proper access controls and sharing settings in Airtable 