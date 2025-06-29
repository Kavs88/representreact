require('dotenv').config();
const fetch = require('node-fetch');

// Airtable configuration
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTISTS_TABLE = process.env.AIRTABLE_ARTISTS_TABLE || 'Artists';

// Fields to add
const NEW_FIELDS = [
  {
    name: 'GeneratedBannerImage',
    type: 'url',
    description: 'AI-generated banner image URL for the artist'
  },
  {
    name: 'ThemePrimaryColor',
    type: 'singleLineText',
    description: 'Primary accent color for artist theme (hex format)'
  },
  {
    name: 'ThemeBackgroundColor',
    type: 'singleLineText',
    description: 'Background color for artist theme (hex format)'
  },
  {
    name: 'ThemeTextColor',
    type: 'singleLineText',
    description: 'Text color for artist theme (hex format)'
  }
];

async function setupBannerFields() {
  try {
    console.log('🎨 Setting up Airtable banner generation fields...');
    console.log('Base ID:', AIRTABLE_BASE_ID);
    console.log('Table:', ARTISTS_TABLE);
    console.log('');

    // First, let's get the current table schema
    const schemaUrl = `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`;
    const schemaResponse = await fetch(schemaUrl, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!schemaResponse.ok) {
      throw new Error(`Failed to fetch table schema: ${schemaResponse.status}`);
    }

    const schemaData = await schemaResponse.json();
    const artistsTable = schemaData.tables.find(table => table.name === ARTISTS_TABLE);

    if (!artistsTable) {
      throw new Error(`Table "${ARTISTS_TABLE}" not found in base`);
    }

    console.log('📋 Current table fields:');
    artistsTable.fields.forEach(field => {
      console.log(`  - ${field.name} (${field.type})`);
    });
    console.log('');

    // Check which fields already exist
    const existingFields = artistsTable.fields.map(field => field.name);
    const fieldsToAdd = NEW_FIELDS.filter(field => !existingFields.includes(field.name));

    if (fieldsToAdd.length === 0) {
      console.log('✅ All required fields already exist!');
      return;
    }

    console.log('🔧 Adding new fields:');
    fieldsToAdd.forEach(field => {
      console.log(`  - ${field.name} (${field.type})`);
    });
    console.log('');

    // Add new fields to the table
    const updatedFields = [
      ...artistsTable.fields,
      ...fieldsToAdd.map(field => ({
        name: field.name,
        type: field.type,
        description: field.description
      }))
    ];

    const updateUrl = `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables/${artistsTable.id}`;
    const updateResponse = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: updatedFields
      })
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(`Failed to update table: ${updateResponse.status} - ${JSON.stringify(errorData)}`);
    }

    console.log('✅ Successfully added banner generation fields!');
    console.log('');
    console.log('🎯 Next steps:');
    console.log('1. Add BANNER_GENERATION_SECRET to your .env file');
    console.log('2. Test the banner generation API');
    console.log('3. Visit an artist page to see the new banner system');

  } catch (error) {
    console.error('❌ Error setting up Airtable fields:', error.message);
    console.log('');
    console.log('🔧 Manual Setup Instructions:');
    console.log('If the automatic setup fails, manually add these fields to your Airtable Artists table:');
    NEW_FIELDS.forEach(field => {
      console.log(`  - ${field.name} (${field.type})`);
    });
  }
}

// Check environment variables
if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
  console.log('❌ Missing environment variables:');
  console.log('Please ensure AIRTABLE_BASE_ID and AIRTABLE_API_KEY are set in your .env file');
  console.log('Current values:');
  console.log('AIRTABLE_BASE_ID:', AIRTABLE_BASE_ID ? 'Set' : 'Missing');
  console.log('AIRTABLE_API_KEY:', AIRTABLE_API_KEY ? 'Set' : 'Missing');
  process.exit(1);
}

// Run the setup
setupBannerFields(); 