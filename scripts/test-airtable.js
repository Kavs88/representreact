require('dotenv').config();
const Airtable = require('airtable');

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

async function testConnection() {
  console.log('🔍 Testing Airtable connection...');
  console.log('Base ID:', process.env.AIRTABLE_BASE_ID);
  console.log('Token starts with:', process.env.AIRTABLE_API_KEY?.substring(0, 10) + '...');
  
  try {
    // Test reading from Artists table
    console.log('\n📖 Testing read access to Artists table...');
    const artists = await base('Artists').select({ maxRecords: 1 }).firstPage();
    console.log('✅ Successfully read from Artists table');
    console.log('Found', artists.length, 'records');
    
    // Test reading from Artwork table
    console.log('\n📖 Testing read access to Artwork table...');
    const artwork = await base('Artwork').select({ maxRecords: 1 }).firstPage();
    console.log('✅ Successfully read from Artwork table');
    console.log('Found', artwork.length, 'records');
    
    // Test reading from Tags table
    console.log('\n📖 Testing read access to Tags table...');
    const tags = await base('Tags').select({ maxRecords: 1 }).firstPage();
    console.log('✅ Successfully read from Tags table');
    console.log('Found', tags.length, 'records');
    
    console.log('\n🎉 All tests passed! Your Airtable connection is working.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    if (error.message.includes('not found')) {
      console.log('\n💡 The table might not exist. Please create the following tables in your Airtable base:');
      console.log('- Artists');
      console.log('- Artwork');
      console.log('- Tags');
    } else if (error.message.includes('not authorized')) {
      console.log('\n💡 Permission issue. Please check:');
      console.log('1. Your token has the correct scopes (data.records:read, data.records:write)');
      console.log('2. Your token has access to the specific base (not just the workspace)');
      console.log('3. You are the owner or have editor permissions for the base');
    }
  }
}

testConnection(); 