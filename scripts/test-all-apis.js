// Test script to verify all API routes are working
require('dotenv').config();

const BASE_URL = 'http://localhost:3000';

async function testAllAPIs() {
  console.log('🧪 Testing All API Routes...\n');

  try {
    // Test 1: Artists API
    console.log('1️⃣ Testing Artists API...');
    const artistsResponse = await fetch(`${BASE_URL}/api/artists`);
    const artistsData = await artistsResponse.json();
    
    if (artistsResponse.ok) {
      console.log('✅ Artists API: Success! Found', artistsData.length, 'artists');
      if (artistsData.length > 0) {
        const artist = artistsData[0];
        console.log('   Sample artist fields:');
        console.log('   - Name:', artist.name);
        console.log('   - Image:', artist.image ? '✅ Has image' : '❌ No image');
        console.log('   - Tags/Specialties:', artist.tags.length > 0 ? artist.tags.join(', ') : 'None');
      }
    } else {
      console.log('❌ Artists API Error:', artistsData.error);
    }

    // Test 2: Featured Artists
    console.log('\n2️⃣ Testing Featured Artists...');
    const featuredResponse = await fetch(`${BASE_URL}/api/artists?featured=true`);
    const featuredData = await featuredResponse.json();
    
    if (featuredResponse.ok) {
      console.log('✅ Featured Artists: Success! Found', featuredData.length, 'featured artists');
    } else {
      console.log('❌ Featured Artists Error:', featuredData.error);
    }

    // Test 3: Artwork API
    console.log('\n3️⃣ Testing Artwork API...');
    const artworkResponse = await fetch(`${BASE_URL}/api/artwork`);
    const artworkData = await artworkResponse.json();
    
    if (artworkResponse.ok) {
      console.log('✅ Artwork API: Success! Found', artworkData.length, 'artwork pieces');
      if (artworkData.length > 0) {
        const piece = artworkData[0];
        console.log('   Sample artwork fields:');
        console.log('   - Title:', piece.title);
        console.log('   - Artist Slug:', piece.artistSlug);
        console.log('   - Category:', piece.category);
        console.log('   - Tags:', piece.tags.length > 0 ? piece.tags.join(', ') : 'None');
      }
    } else {
      console.log('❌ Artwork API Error:', artworkData.error);
    }

    // Test 4: Tags API
    console.log('\n4️⃣ Testing Tags API...');
    const tagsResponse = await fetch(`${BASE_URL}/api/tags`);
    const tagsData = await tagsResponse.json();
    
    if (tagsResponse.ok) {
      console.log('✅ Tags API: Success! Found', tagsData.length, 'tags');
      if (tagsData.length > 0) {
        console.log('   Available tags:', tagsData.map(tag => tag.name).join(', '));
      }
    } else {
      console.log('❌ Tags API Error:', tagsData.error);
    }

    console.log('\n🎉 API Testing Complete!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAllAPIs(); 