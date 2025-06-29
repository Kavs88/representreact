require('dotenv').config();

async function testArtistPages() {
  console.log('🎨 Testing Artist Banner System...');
  console.log('Dev server should be running on: http://localhost:3002');
  console.log('');
  
  // Test the artists API endpoint
  try {
    console.log('🔍 Testing Artists API...');
    
    // Use built-in https module for Node.js
    const https = require('https');
    const http = require('http');
    
    const makeRequest = (url) => {
      return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            try {
              resolve({ status: res.statusCode, data: JSON.parse(data) });
            } catch (e) {
              resolve({ status: res.statusCode, data: data });
            }
          });
        }).on('error', reject);
      });
    };
    
    const response = await makeRequest('http://localhost:3002/api/artists');
    
    if (response.status === 200 && response.data.length > 0) {
      console.log('✅ Artists API working! Found', response.data.length, 'artists');
      console.log('');
      
      console.log('📋 Available Artists:');
      response.data.forEach((artist, index) => {
        console.log(`${index + 1}. ${artist.name} - ${artist.specialty}`);
        console.log(`   Theme: ${artist.fields?.ThemePrimaryColor || 'Default'}`);
        console.log(`   Banner: ${artist.fields?.GeneratedBannerImage ? '✅ Generated' : '❌ Not set'}`);
        console.log(`   URL: http://localhost:3002/artists/${encodeURIComponent(artist.name)}`);
        console.log('');
      });
      
      console.log('🎯 TEST INSTRUCTIONS:');
      console.log('1. Open your browser and visit: http://localhost:3002');
      console.log('2. Go to the Artists page');
      console.log('3. Click on any artist to see their personalized banner and theme');
      console.log('4. Notice how each artist has different colors and banner images');
      console.log('');
      
      console.log('🎨 EXPECTED RESULTS:');
      console.log('- Each artist page should show their unique banner image');
      console.log('- Colors should change based on their theme (primary, background, text)');
      console.log('- Smooth transitions when navigating between artists');
      console.log('- Graceful fallbacks if banner images are missing');
      
    } else {
      console.log('❌ Artists API failed:', response.status);
      console.log('Response:', response.data);
    }
  } catch (error) {
    console.log('❌ Error testing artists API:', error.message);
  }
}

// Test banner generation API
async function testBannerAPI() {
  console.log('');
  console.log('🔧 Testing Banner Generation API...');
  
  try {
    const https = require('https');
    const http = require('http');
    
    const makePostRequest = (url, data) => {
      return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        const postData = JSON.stringify(data);
        
        const options = {
          hostname: 'localhost',
          port: 3002,
          path: '/api/artists/generate-banner',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BANNER_GENERATION_SECRET || 'test-secret'}`,
            'Content-Length': Buffer.byteLength(postData)
          }
        };
        
        const req = client.request(options, (res) => {
          let responseData = '';
          res.on('data', (chunk) => responseData += chunk);
          res.on('end', () => {
            try {
              resolve({ status: res.statusCode, data: JSON.parse(responseData) });
            } catch (e) {
              resolve({ status: res.statusCode, data: responseData });
            }
          });
        });
        
        req.on('error', reject);
        req.write(postData);
        req.end();
      });
    };
    
    const response = await makePostRequest('http://localhost:3002/api/artists/generate-banner', {
      artistId: 'test-id'
    });
    
    if (response.status === 401) {
      console.log('✅ Banner API is protected (good security!)');
      console.log('   Status: 401 Unauthorized (expected without valid artist ID)');
    } else if (response.status === 404) {
      console.log('✅ Banner API is working!');
      console.log('   Status: 404 Artist not found (expected with test ID)');
    } else {
      console.log('⚠️  Banner API response:', response.status);
      console.log('Response:', response.data);
    }
  } catch (error) {
    console.log('❌ Banner API error:', error.message);
  }
}

// Run tests
async function runTests() {
  await testArtistPages();
  await testBannerAPI();
  
  console.log('');
  console.log('🎉 TESTING COMPLETE!');
  console.log('');
  console.log('📱 NEXT STEPS:');
  console.log('1. Visit http://localhost:3002 in your browser');
  console.log('2. Navigate to different artist pages');
  console.log('3. Observe the dynamic theming and banner system');
  console.log('4. Test on mobile to see responsive design');
}

runTests(); 