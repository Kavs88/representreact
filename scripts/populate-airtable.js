require('dotenv').config();
const Airtable = require('airtable');

// Configure Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

const ARTISTS_TABLE = 'Artists';
const ARTWORK_TABLE = 'Artwork';

// Sample artist data based on the user's schema
const sampleArtists = [
  {
    Name: "Elena Rodriguez",
    Bio: "Elena Rodriguez is a contemporary digital artist whose work explores the intersection of technology and human emotion. Based in Barcelona, she creates immersive digital experiences that challenge our perception of reality. Her work has been featured in international galleries and digital art festivals across Europe. Elena's signature style combines photorealistic elements with abstract digital manipulation, creating dreamlike landscapes that invite viewers to question the boundaries between the physical and virtual worlds.",
    SocialLinks: JSON.stringify({
      instagram: "https://instagram.com/elenarodriguez_art",
      website: "https://elenarodriguez.com",
      twitter: "https://twitter.com/elenarodriguez"
    }),
    Tags: ["Digital Art", "Neon Aesthetics", "Cyberpunk", "Contemporary", "Mixed Media"],
    Featured: true,
    Email: "elena@elenarodriguez.com",
    Phone: "+34-555-0123"
  },
  {
    Name: "Marcus Chen",
    Bio: "Marcus Chen is a classical portrait photographer whose work captures the essence of human character through masterful lighting and composition. With over 15 years of experience, Marcus has photographed celebrities, business leaders, and everyday people, always finding the unique story in each subject. His work is characterized by its timeless elegance and emotional depth, drawing inspiration from the great portrait masters of the 20th century. Based in New York, Marcus's studio work and street photography have earned him recognition in prestigious photography awards.",
    SocialLinks: JSON.stringify({
      instagram: "https://instagram.com/marcuschen_photography",
      website: "https://marcuschen.com",
      linkedin: "https://linkedin.com/in/marcuschen"
    }),
    Tags: ["Portrait Photography", "Classical", "Black and White", "Studio", "Celebrity"],
    Featured: true,
    Email: "marcus@marcuschen.com",
    Phone: "+1-555-0124"
  },
  {
    Name: "Sofia Petrov",
    Bio: "Sofia Petrov is an abstract expressionist painter whose bold, gestural works explore themes of identity, memory, and emotional transformation. Born in Moscow and now based in Berlin, Sofia's work reflects her journey across cultures and her deep interest in human psychology. Her large-scale canvases feature dynamic brushstrokes, vibrant color palettes, and layers of texture that create immersive visual experiences. Sofia's work has been exhibited in major galleries across Europe and has been collected by both private collectors and public institutions.",
    SocialLinks: JSON.stringify({
      instagram: "https://instagram.com/sofiapetrov_art",
      website: "https://sofiapetrov.com",
      facebook: "https://facebook.com/sofiapetrovart"
    }),
    Tags: ["Abstract Art", "Expressionism", "Contemporary", "Large Scale", "Emotional"],
    Featured: true,
    Email: "sofia@sofiapetrov.com",
    Phone: "+49-555-0125"
  },
  {
    Name: "David Kim",
    Bio: "David Kim is a mixed media sculptor whose innovative work combines traditional sculptural techniques with cutting-edge technology. Based in Seoul, David creates interactive installations that respond to viewer movement and environmental conditions. His work explores themes of human connection, environmental sustainability, and the relationship between nature and technology. David's sculptures have been featured in major art biennales and his public installations can be found in cities across Asia and Europe.",
    SocialLinks: JSON.stringify({
      instagram: "https://instagram.com/davidkim_sculpture",
      website: "https://davidkim.com",
      youtube: "https://youtube.com/davidkimart"
    }),
    Tags: ["Mixed Media", "Sculpture", "Interactive", "Installation", "Technology"],
    Featured: false,
    Email: "david@davidkim.com",
    Phone: "+82-555-0126"
  },
  {
    Name: "Aisha Thompson",
    Bio: "Aisha Thompson is a street art photographer whose work documents the vibrant urban art scene and captures the stories behind the murals and graffiti that transform city landscapes. Based in Los Angeles, Aisha travels the world documenting street art and the artists who create it. Her photographs not only showcase the visual impact of street art but also tell the cultural and social stories that inspire these works. Aisha's work has been published in major art magazines and her photographs have been exhibited in galleries worldwide.",
    SocialLinks: JSON.stringify({
      instagram: "https://instagram.com/aishathompson_photography",
      website: "https://aishathompson.com",
      twitter: "https://twitter.com/aishathompson"
    }),
    Tags: ["Street Art", "Photography", "Urban", "Documentary", "Cultural Expression"],
    Featured: false,
    Email: "aisha@aishathompson.com",
    Phone: "+1-555-0127"
  }
];

// Sample artwork data
const sampleArtwork = [
  {
    Title: "Digital Dreams",
    "Artist Slug": "elena-rodriguez",
    Image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
    Description: "A vibrant digital composition exploring the intersection of technology and human emotion through neon aesthetics and cyberpunk themes.",
    Price: 2500,
    Category: "Digital Art",
    Tags: ["Neon Aesthetics", "Cyberpunk", "Digital"]
  },
  {
    Title: "Cultural Fusion",
    "Artist Slug": "marcus-chen",
    Image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=400&fit=crop",
    Description: "Mixed media exploration of cultural identity through abstract expressionism and bold brushstrokes.",
    Price: 3200,
    Category: "Abstract Art",
    Tags: ["Cultural Expression", "Abstract", "Mixed Media"]
  },
  {
    Title: "Neon Symphony",
    "Artist Slug": "sofia-petrov",
    Image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    Description: "Large-scale abstract expressionist painting featuring dynamic brushstrokes and vibrant color palettes.",
    Price: 4500,
    Category: "Abstract Art",
    Tags: ["Expressionism", "Large Scale", "Emotional"]
  },
  {
    Title: "Interactive Echo",
    "Artist Slug": "david-kim",
    Image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    Description: "Interactive installation piece combining traditional sculpture with cutting-edge technology.",
    Price: 1800,
    Category: "Mixed Media",
    Tags: ["Interactive", "Installation", "Technology"]
  },
  {
    Title: "Urban Canvas",
    "Artist Slug": "aisha-thompson",
    Image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    Description: "Street art photography capturing the vibrant urban art scene and cultural stories behind city murals.",
    Price: 1200,
    Category: "Street Art",
    Tags: ["Urban", "Documentary", "Cultural Expression"]
  }
];

async function populateArtists() {
  console.log('🎨 Starting to populate Airtable with sample artists...');
  
  try {
    for (const artist of sampleArtists) {
      console.log(`📝 Adding artist: ${artist.Name}`);
      
      await base(ARTISTS_TABLE).create([{ fields: artist }]);
      console.log(`✅ Successfully added ${artist.Name}`);
    }
    
    console.log('🎉 All sample artists have been added to Airtable!');
    console.log('📊 Summary:');
    console.log(`   - Total artists added: ${sampleArtists.length}`);
    console.log(`   - Featured artists: ${sampleArtists.filter(a => a.Featured).length}`);
    console.log(`   - Regular artists: ${sampleArtists.filter(a => !a.Featured).length}`);
    
  } catch (error) {
    console.error('❌ Error populating artists:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

async function populateArtwork() {
  console.log('🖼️ Starting to populate Airtable with sample artwork...');
  
  try {
    for (const artwork of sampleArtwork) {
      console.log(`📝 Adding artwork: ${artwork.Title}`);
      
      await base(ARTWORK_TABLE).create([{ fields: artwork }]);
      console.log(`✅ Successfully added ${artwork.Title}`);
    }
    
    console.log('🎉 All sample artwork has been added to Airtable!');
    console.log(`📊 Total artwork pieces added: ${sampleArtwork.length}`);
    
  } catch (error) {
    console.error('❌ Error populating artwork:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

async function populateAll() {
  console.log('🚀 Starting to populate Airtable with sample content...\n');
  
  await populateArtists();
  
  console.log('\n🎉 Airtable population complete!');
  console.log('Your RepresentPlus platform now has sample artists to showcase.');
  console.log('Note: Artwork table population was skipped due to permission issues.');
}

// Check if environment variables are set
if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  console.error('❌ Missing environment variables:');
  console.error('   - AIRTABLE_API_KEY');
  console.error('   - AIRTABLE_BASE_ID');
  console.error('Please set these in your .env file');
  process.exit(1);
}

// Run the population script
populateAll(); 