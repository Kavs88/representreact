const fs = require('fs');
const path = require('path');

console.log('🎨 Creating Airtable template files...');

// Create a template that can be imported into Airtable
const templateData = {
  artists: [
    {
      Name: "Alex Rivera",
      Slug: "alex-rivera",
      Bio: "Contemporary digital artist specializing in neon aesthetics and cyberpunk themes. Known for vibrant color palettes and futuristic compositions.",
      ProfileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      SocialLinks: '{"instagram":"https://instagram.com/alexrivera","twitter":"https://twitter.com/alexrivera","website":"https://alexrivera.com"}',
      Specialties: "Digital Art, Neon Aesthetics, Cyberpunk",
      Featured: true,
      Email: "alex@alexrivera.com",
      Phone: "+1-555-0123"
    },
    {
      Name: "Maya Chen",
      Slug: "maya-chen",
      Bio: "Abstract expressionist painter exploring themes of identity and cultural heritage through bold brushstrokes and mixed media techniques.",
      ProfileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      SocialLinks: '{"instagram":"https://instagram.com/mayachen","website":"https://mayachen.art"}',
      Specialties: "Abstract Art, Mixed Media, Cultural Expression",
      Featured: true,
      Email: "maya@mayachen.art",
      Phone: "+1-555-0124"
    },
    {
      Name: "DJ Krypto",
      Slug: "dj-krypto",
      Bio: "Electronic music producer and visual artist creating immersive audio-visual experiences that blend blockchain aesthetics with underground culture.",
      ProfileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      SocialLinks: '{"instagram":"https://instagram.com/djkrypto","twitter":"https://twitter.com/djkrypto","soundcloud":"https://soundcloud.com/djkrypto"}',
      Specialties: "Electronic Music, Audio-Visual, Blockchain Art",
      Featured: true,
      Email: "dj@djkrypto.com",
      Phone: "+1-555-0125"
    }
  ],
  artwork: [
    {
      Title: "Neon Dreams",
      ArtistSlug: "alex-rivera",
      ImageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
      Description: "A vibrant digital composition exploring the intersection of technology and human emotion.",
      Price: 2500,
      Category: "Digital Art",
      Tags: "Neon, Cyberpunk, Digital"
    },
    {
      Title: "Cultural Fusion",
      ArtistSlug: "maya-chen",
      ImageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=400&fit=crop",
      Description: "Mixed media exploration of cultural identity through abstract expressionism.",
      Price: 3200,
      Category: "Abstract Art",
      Tags: "Cultural, Abstract, Mixed Media"
    },
    {
      Title: "Crypto Symphony",
      ArtistSlug: "dj-krypto",
      ImageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
      Description: "Audio-visual installation piece combining blockchain data with electronic music.",
      Price: 1800,
      Category: "Audio-Visual",
      Tags: "Blockchain, Electronic, Installation"
    }
  ],
  tags: [
    { Name: "Digital Art", Slug: "digital-art" },
    { Name: "Abstract Art", Slug: "abstract-art" },
    { Name: "Street Art", Slug: "street-art" },
    { Name: "Character Design", Slug: "character-design" },
    { Name: "Mixed Media", Slug: "mixed-media" },
    { Name: "Neon Aesthetics", Slug: "neon-aesthetics" },
    { Name: "Cyberpunk", Slug: "cyberpunk" },
    { Name: "Cultural Expression", Slug: "cultural-expression" },
    { Name: "Electronic Music", Slug: "electronic-music" },
    { Name: "Audio-Visual", Slug: "audio-visual" },
    { Name: "Blockchain Art", Slug: "blockchain-art" },
    { Name: "Murals", Slug: "murals" },
    { Name: "Community Art", Slug: "community-art" },
    { Name: "Digital Illustration", Slug: "digital-illustration" },
    { Name: "Gaming Art", Slug: "gaming-art" }
  ]
};

// Create CSV files for easy import
function createCSV(data, filename) {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma or newline
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  fs.writeFileSync(path.join('data', filename), csvContent);
  console.log(`✅ Created ${filename}`);
}

// Create the data directory if it doesn't exist
if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

// Generate CSV files
createCSV(templateData.artists, 'artists-template.csv');
createCSV(templateData.artwork, 'artwork-template.csv');
createCSV(templateData.tags, 'tags-template.csv');

// Create a setup guide
const setupGuide = `# 🚀 Super Quick Airtable Setup

## Option 1: Import Template (Easiest - 2 minutes)

1. **Go to [airtable.com](https://airtable.com)** and create a new base
2. **Name it**: "Represent+ Artists"
3. **Import the CSV files**:
   - Click "Import" → "Upload a CSV file"
   - Upload \`data/artists-template.csv\` → Name table "Artists"
   - Upload \`data/artwork-template.csv\` → Name table "Artwork"  
   - Upload \`data/tags-template.csv\` → Name table "Tags"
4. **Get your credentials**:
   - API Key: Account settings → API → Generate key
   - Base ID: Copy from URL (appXXXXXXXXXXXXXX part)
5. **Update .env file** with your credentials
6. **Run**: \`node scripts/setup-airtable.js\`

## Option 2: Manual Setup (5 minutes)

If import doesn't work, follow the field configuration guide in AIRTABLE_QUICK_SETUP.md

## What You Get

✅ 3 sample artists with full profiles
✅ 3 sample artwork pieces with pricing  
✅ 15 specialty tags for filtering
✅ Complete API integration ready

## Testing

After setup, test by:
1. \`npm run dev\`
2. Visit: http://localhost:3000/api/artists
3. Visit: http://localhost:3000/artists

The entire setup should take 2-5 minutes!
`;

fs.writeFileSync('QUICK_START.md', setupGuide);
console.log('✅ Created QUICK_START.md');

console.log('\n🎉 Template files created successfully!');
console.log('\n📋 Next steps:');
console.log('1. Follow the guide in QUICK_START.md');
console.log('2. Import the CSV files into Airtable');
console.log('3. Get your API credentials');
console.log('4. Run: node scripts/setup-airtable.js'); 