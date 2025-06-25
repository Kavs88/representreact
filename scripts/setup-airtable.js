const Airtable = require('airtable');
require('dotenv').config();

// Configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY) {
  console.error('❌ AIRTABLE_API_KEY not found in environment variables');
  console.log('Please add AIRTABLE_API_KEY=your_personal_access_token to your .env file');
  console.log('Get your token from: Account → Personal access tokens → Create new token');
  process.exit(1);
}

if (!BASE_ID) {
  console.error('❌ AIRTABLE_BASE_ID not found in environment variables');
  console.log('Please add AIRTABLE_BASE_ID=your_base_id to your .env file');
  console.log('Get your Base ID from the URL: https://airtable.com/appXXXXXXXXXXXXXX/...');
  process.exit(1);
}

// Validate token format (Personal Access Tokens start with 'pat')
if (!AIRTABLE_API_KEY.startsWith('pat')) {
  console.error('❌ Invalid Personal Access Token format');
  console.log('Personal Access Tokens should start with "pat"');
  console.log('Get your token from: Account → Personal access tokens → Create new token');
  process.exit(1);
}

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID);

// Sample data for artists
const sampleArtists = [
  {
    name: "Alex Rivera",
    slug: "alex-rivera",
    bio: "Contemporary digital artist specializing in neon aesthetics and cyberpunk themes. Known for vibrant color palettes and futuristic compositions.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    socialLinks: JSON.stringify({
      instagram: "https://instagram.com/alexrivera",
      twitter: "https://twitter.com/alexrivera",
      website: "https://alexrivera.com"
    }),
    specialties: ["Digital Art", "Neon Aesthetics", "Cyberpunk"],
    featured: true,
    email: "alex@alexrivera.com",
    phone: "+1-555-0123"
  },
  {
    name: "Maya Chen",
    slug: "maya-chen",
    bio: "Abstract expressionist painter exploring themes of identity and cultural heritage through bold brushstrokes and mixed media techniques.",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    socialLinks: JSON.stringify({
      instagram: "https://instagram.com/mayachen",
      website: "https://mayachen.art"
    }),
    specialties: ["Abstract Art", "Mixed Media", "Cultural Expression"],
    featured: true,
    email: "maya@mayachen.art",
    phone: "+1-555-0124"
  },
  {
    name: "DJ Krypto",
    slug: "dj-krypto",
    bio: "Electronic music producer and visual artist creating immersive audio-visual experiences that blend blockchain aesthetics with underground culture.",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    socialLinks: JSON.stringify({
      instagram: "https://instagram.com/djkrypto",
      twitter: "https://twitter.com/djkrypto",
      soundcloud: "https://soundcloud.com/djkrypto"
    }),
    specialties: ["Electronic Music", "Audio-Visual", "Blockchain Art"],
    featured: true,
    email: "dj@djkrypto.com",
    phone: "+1-555-0125"
  },
  {
    name: "Zara Thompson",
    slug: "zara-thompson",
    bio: "Street art and mural specialist bringing urban culture to life through large-scale installations and community-driven projects.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    socialLinks: JSON.stringify({
      instagram: "https://instagram.com/zarathompson",
      website: "https://zarathompson.com"
    }),
    specialties: ["Street Art", "Murals", "Community Art"],
    featured: false,
    email: "zara@zarathompson.com",
    phone: "+1-555-0126"
  },
  {
    name: "Marcus \"Pixel\" Johnson",
    slug: "marcus-pixel-johnson",
    bio: "Digital illustrator and character designer creating vibrant, stylized artwork for gaming, animation, and commercial projects.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    socialLinks: JSON.stringify({
      instagram: "https://instagram.com/marcuspixel",
      twitter: "https://twitter.com/marcuspixel",
      artstation: "https://artstation.com/marcuspixel"
    }),
    specialties: ["Digital Illustration", "Character Design", "Gaming Art"],
    featured: false,
    email: "marcus@marcuspixel.com",
    phone: "+1-555-0127"
  }
];

// Sample artwork data
const sampleArtwork = [
  {
    title: "Neon Dreams",
    artistSlug: "alex-rivera",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
    description: "A vibrant digital composition exploring the intersection of technology and human emotion.",
    price: 2500,
    category: "Digital Art",
    tags: ["Neon", "Cyberpunk", "Digital"]
  },
  {
    title: "Cultural Fusion",
    artistSlug: "maya-chen",
    imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=400&fit=crop",
    description: "Mixed media exploration of cultural identity through abstract expressionism.",
    price: 3200,
    category: "Abstract Art",
    tags: ["Cultural", "Abstract", "Mixed Media"]
  },
  {
    title: "Crypto Symphony",
    artistSlug: "dj-krypto",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    description: "Audio-visual installation piece combining blockchain data with electronic music.",
    price: 1800,
    category: "Audio-Visual",
    tags: ["Blockchain", "Electronic", "Installation"]
  },
  {
    title: "Urban Pulse",
    artistSlug: "zara-thompson",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    description: "Large-scale mural celebrating community and urban culture.",
    price: 4500,
    category: "Street Art",
    tags: ["Mural", "Community", "Urban"]
  },
  {
    title: "Pixel Warriors",
    artistSlug: "marcus-pixel-johnson",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    description: "Character design series for an upcoming indie game project.",
    price: 1200,
    category: "Character Design",
    tags: ["Gaming", "Characters", "Digital"]
  }
];

async function setupAirtable() {
  console.log('🚀 Starting Airtable setup...');
  
  try {
    // Step 1: Create Artists table and populate
    console.log('📝 Creating Artists table...');
    await createArtistsTable();
    
    // Step 2: Create Artwork table and populate
    console.log('🎨 Creating Artwork table...');
    await createArtworkTable();
    
    // Step 3: Create Tags table and populate
    console.log('🏷️ Creating Tags table...');
    await createTagsTable();
    
    console.log('✅ Airtable setup completed successfully!');
    console.log('📋 Next steps:');
    console.log('1. Verify your data in Airtable');
    console.log('2. Update your .env file with the correct BASE_ID');
    console.log('3. Test the API endpoints');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

async function createArtistsTable() {
  // Note: Airtable API doesn't support creating tables via API
  // This function assumes the table already exists and populates it
  
  console.log('   Adding sample artists...');
  
  for (const artist of sampleArtists) {
    try {
      await base('Artists').create([
        {
          fields: {
            Name: artist.name,
            Slug: artist.slug,
            Bio: artist.bio,
            ProfileImage: artist.profileImage,
            SocialLinks: artist.socialLinks,
            Specialties: artist.specialties,
            Featured: artist.featured,
            Email: artist.email,
            Phone: artist.phone
          }
        }
      ]);
      console.log(`   ✅ Added artist: ${artist.name}`);
    } catch (error) {
      console.log(`   ⚠️  Artist ${artist.name} might already exist: ${error.message}`);
    }
  }
}

async function createArtworkTable() {
  console.log('   Adding sample artwork...');
  
  for (const piece of sampleArtwork) {
    try {
      await base('Artwork').create([
        {
          fields: {
            Title: piece.title,
            ArtistSlug: piece.artistSlug,
            ImageUrl: piece.imageUrl,
            Description: piece.description,
            Price: piece.price,
            Category: piece.category,
            Tags: piece.tags
          }
        }
      ]);
      console.log(`   ✅ Added artwork: ${piece.title}`);
    } catch (error) {
      console.log(`   ⚠️  Artwork ${piece.title} might already exist: ${error.message}`);
    }
  }
}

async function createTagsTable() {
  // Extract unique tags from artists and artwork
  const allTags = new Set();
  
  sampleArtists.forEach(artist => {
    artist.specialties.forEach(tag => allTags.add(tag));
  });
  
  sampleArtwork.forEach(piece => {
    piece.tags.forEach(tag => allTags.add(tag));
  });
  
  console.log('   Adding tags...');
  
  for (const tag of Array.from(allTags)) {
    try {
      await base('Tags').create([
        {
          fields: {
            Name: tag,
            Slug: tag.toLowerCase().replace(/\s+/g, '-')
          }
        }
      ]);
      console.log(`   ✅ Added tag: ${tag}`);
    } catch (error) {
      console.log(`   ⚠️  Tag ${tag} might already exist: ${error.message}`);
    }
  }
}

// Run the setup
setupAirtable(); 