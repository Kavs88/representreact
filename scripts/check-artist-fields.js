// Script to check all available fields in the Artists table
require('dotenv').config();

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const ARTISTS_TABLE = process.env.AIRTABLE_ARTISTS_TABLE || 'Artists';

async function checkArtistFields() {
  try {
    console.log('🔍 Checking Artists Table Fields...\n');
    
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${ARTISTS_TABLE}`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Found', data.records.length, 'artist records\n');
      
      data.records.forEach((record, index) => {
        console.log(`Artist ${index + 1}: ${record.fields.Name || 'No Name'}`);
        console.log('Available fields:', Object.keys(record.fields));
        
        // Check for image field variations
        const imageFields = Object.keys(record.fields).filter(field => 
          field.toLowerCase().includes('image') || 
          field.toLowerCase().includes('photo') || 
          field.toLowerCase().includes('picture')
        );
        
        if (imageFields.length > 0) {
          console.log('Image-related fields:', imageFields);
        } else {
          console.log('No image-related fields found');
        }
        
        console.log('---');
      });
    } else {
      const errorData = await response.json();
      console.log('❌ Error:', errorData);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

checkArtistFields(); 