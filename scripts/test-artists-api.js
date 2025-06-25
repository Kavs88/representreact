// Test script to verify the artists API routes are working
require('dotenv').config();

const BASE_URL = 'http://localhost:3000';

async function testArtistsAPI() {
  console.log('🧪 Testing Artists API Routes...\n');

  try {
    // Test 1: Get all artists
    console.log('1️⃣ Testing GET /api/artists...');
    const response1 = await fetch(`${BASE_URL}/api/artists`);
    const data1 = await response1.json();
    
    if (response1.ok) {
      console.log('✅ Success! Found', data1.length, 'artists');
      if (data1.length > 0) {
        console.log('   First artist:', data1[0].name);
      }
    } else {
      console.log('❌ Error:', data1.error);
      if (data1.details) {
        console.log('   Details:', data1.details);
      }
    }

    // Test 2: Get featured artists
    console.log('\n2️⃣ Testing GET /api/artists?featured=true...');
    const response2 = await fetch(`${BASE_URL}/api/artists?featured=true`);
    const data2 = await response2.json();
    
    if (response2.ok) {
      console.log('✅ Success! Found', data2.length, 'featured artists');
      if (data2.length > 0) {
        const featuredArtist = data2[0];
        console.log('   Featured artist details:');
        console.log('   - Name:', featuredArtist.name);
        console.log('   - Tags:', JSON.stringify(featuredArtist.tags));
        console.log('   - Tags length:', featuredArtist.tags?.length || 0);
        console.log('   - Has image:', !!featuredArtist.image);
        console.log('   - Image URL:', featuredArtist.image || 'No image');
      }
    } else {
      console.log('❌ Error:', data2.error);
    }

    // Test 3: Get individual artist
    console.log('\n3️⃣ Testing GET /api/artists/alex-rivera...');
    const response3 = await fetch(`${BASE_URL}/api/artists/alex-rivera`);
    const data3 = await response3.json();
    
    if (response3.ok) {
      console.log('✅ Success! Found artist:', data3.name);
    } else {
      console.log('❌ Error:', data3.error);
    }

    console.log('\n🔍 Environment check:');
    console.log('AIRTABLE_API_KEY:', process.env.AIRTABLE_API_KEY ? '✅ Set' : '❌ Missing');
    console.log('AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID ? '✅ Set' : '❌ Missing');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testArtistsAPI(); 