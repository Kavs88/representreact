const fs = require('fs');
const path = require('path');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  console.log('Current contents:');
  console.log(fs.readFileSync(envPath, 'utf8'));
} else {
  console.log('❌ .env file not found');
  console.log('\n📝 Please create a .env file in your project root with the following content:');
  console.log('\n# Airtable Configuration');
  console.log('# Use Personal Access Token (PAT) instead of legacy API key');
  console.log('AIRTABLE_API_KEY=your_personal_access_token_here');
  console.log('AIRTABLE_BASE_ID=your_base_id_here');
  console.log('AIRTABLE_ARTISTS_TABLE=Artists');
  console.log('AIRTABLE_ARTWORK_TABLE=Artwork');
  console.log('AIRTABLE_TAGS_TABLE=Tags');
  console.log('\n🔑 Replace "your_personal_access_token_here" with your actual Personal Access Token');
  console.log('🔗 Replace "your_base_id_here" with your actual Airtable Base ID');
  console.log('\n📖 See AIRTABLE_SETUP_GUIDE.md for detailed instructions on getting these values');
}

console.log('\n🔍 Checking environment variables...');
console.log('AIRTABLE_API_KEY:', process.env.AIRTABLE_API_KEY ? '✅ Set' : '❌ Not set');
console.log('AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID ? '✅ Set' : '❌ Not set');
console.log('AIRTABLE_ARTISTS_TABLE:', process.env.AIRTABLE_ARTISTS_TABLE || 'Artists (default)'); 