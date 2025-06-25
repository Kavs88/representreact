// Simple test to debug artists API
require('dotenv').config();

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

async function testArtists() {
  console.log('🔍 Testing Artists API directly...\n');
  
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Artists`;
    console.log('URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Found', data.records.length, 'artists');
      console.log('First artist:', data.records[0]?.fields?.Name);
    } else {
      const error = await response.json();
      console.log('❌ Error:', error);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

testArtists(); 