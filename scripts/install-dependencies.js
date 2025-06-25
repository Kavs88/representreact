const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Installing Airtable dependencies...');

try {
  // Install airtable package
  console.log('📦 Installing airtable...');
  execSync('npm install airtable', { stdio: 'inherit' });
  
  // Install dotenv if not already installed
  console.log('📦 Installing dotenv...');
  execSync('npm install dotenv', { stdio: 'inherit' });
  
  // Create .env file if it doesn't exist
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file...');
    const envContent = `# Airtable Configuration
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file with template variables');
  } else {
    console.log('ℹ️  .env file already exists');
  }
  
  console.log('✅ Dependencies installed successfully!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Update your .env file with your Airtable API key and Base ID');
  console.log('2. Follow the setup guide in AIRTABLE_SETUP_GUIDE.md');
  console.log('3. Run: node scripts/setup-airtable.js');
  
} catch (error) {
  console.error('❌ Installation failed:', error.message);
  process.exit(1);
} 