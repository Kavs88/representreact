require('dotenv').config();
const fetch = require('node-fetch');

// Test the banner generation API
async function testBannerGeneration() {
  // You can use any of these artist IDs from your Airtable:
  // - Anya Volkov (Digital Illustrator)
  // - Leo Martinez (Landscape Photographer) 
  // - Kenji Tanaka (3D Generalist)
  // - Sofia Rossi (Composer)
  
  // Replace this with an actual artist record ID from your Airtable
  const artistId = 'recXXXXXXXXXXXXXX'; // Get this from Airtable
  const secret = process.env.BANNER_GENERATION_SECRET || 'test-secret';

  try {
    console.log('🔍 Testing Banner Generation API...');
    console.log('Artist ID:', artistId);
    console.log('Secret:', secret ? 'Set' : 'Missing');
    console.log('');
    
    const response = await fetch('http://localhost:3001/api/artists/generate-banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secret}`
      },
      body: JSON.stringify({
        artistId: artistId
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Banner generation successful!');
      console.log('Artist ID:', data.artistId);
      console.log('Banner URL:', data.bannerUrl);
      console.log('Message:', data.message);
    } else {
      console.log('❌ Banner generation failed:');
      console.log('Status:', response.status);
      console.log('Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Error testing banner generation:', error.message);
  }
}

// Instructions for getting artist IDs
console.log('🎯 HOW TO GET ARTIST IDs FROM AIRTABLE:');
console.log('1. Go to your Airtable Artists table');
console.log('2. Click on any artist record');
console.log('3. Look at the URL - it will show something like:');
console.log('   https://airtable.com/appMdoYKPGsnzVnEZ/tblXXXXXXXXXXXXXX/viwXXXXXXXXXXXXXX/recXXXXXXXXXXXXXX');
console.log('4. Copy the "recXXXXXXXXXXXXXX" part (the record ID)');
console.log('5. Replace the artistId in this script with that ID');
console.log('');

// Check environment variables
if (!process.env.BANNER_GENERATION_SECRET) {
  console.log('⚠️  BANNER_GENERATION_SECRET not set in environment variables');
  console.log('Please add it to your .env file and try again');
  console.log('Example: BANNER_GENERATION_SECRET=your-super-secret-token-here');
} else {
  console.log('✅ BANNER_GENERATION_SECRET is set');
  console.log('');
  console.log('🚀 Ready to test! Update the artistId above and run this script again.');
}

// Don't run the test automatically - let user update the ID first
if (process.argv.includes('--run-test')) {
  testBannerGeneration();
} else {
  console.log('💡 To run the test, update the artistId above and run:');
  console.log('   node scripts/test-banner-generation.js --run-test');
} 