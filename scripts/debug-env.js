// Debug script to check environment variables and API connectivity
require('dotenv').config();

console.log('🔍 Environment Variables Debug:\n');

// Check if environment variables are loaded
console.log('Environment Variables:');
console.log('- AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID ? '✅ Set' : '❌ Missing');
console.log('- AIRTABLE_API_KEY:', process.env.AIRTABLE_API_KEY ? '✅ Set' : '❌ Missing');
console.log('- AIRTABLE_ARTISTS_TABLE:', process.env.AIRTABLE_ARTISTS_TABLE || 'Artists (default)');
console.log('- AIRTABLE_ARTWORK_TABLE:', process.env.AIRTABLE_ARTWORK_TABLE || 'Artwork (default)');
console.log('- AIRTABLE_TAGS_TABLE:', process.env.AIRTABLE_TAGS_TABLE || 'Tags (default)');

console.log('\n🔍 Testing Direct Airtable API Call:\n');

// Test direct Airtable API call
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTISTS_TABLE = process.env.AIRTABLE_ARTISTS_TABLE || 'Artists';

if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
  console.log('❌ Missing required environment variables');
  process.exit(1);
}

async function testDirectAirtable() {
  try {
    console.log('Testing direct Airtable API call...');
    console.log('URL:', `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}`);
    
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Direct Airtable API: Success!');
      console.log('   Records found:', data.records.length);
      if (data.records.length > 0) {
        console.log('   First record fields:', Object.keys(data.records[0].fields));
      }
    } else {
      const errorData = await response.json();
      console.log('❌ Direct Airtable API Error:', errorData);
    }
  } catch (error) {
    console.log('❌ Direct Airtable API Error:', error.message);
  }
}

testDirectAirtable(); 