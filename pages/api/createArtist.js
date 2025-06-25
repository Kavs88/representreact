// Next.js API route for creating a new artist record in Airtable
// Uses Airtable REST API with Personal Access Token (PAT) authentication

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed' 
    });
  }

  try {
    // Get the Personal Access Token from environment variables
    const airtablePAT = process.env.AIRTABLE_API_KEY;
    
    // Check if the token exists
    if (!airtablePAT) {
      return res.status(500).json({ 
        error: 'Configuration error',
        message: 'AIRTABLE_API_KEY environment variable is not set' 
      });
    }

    // Extract data from request body
    const { name, bio } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ 
        error: 'Validation error',
        message: 'Name field is required and must be a non-empty string' 
      });
    }

    // Prepare the record data for Airtable
    const recordData = {
      fields: {
        Name: name.trim(),
        ...(bio && { Bio: bio.trim() })
      }
    };

    // Make the API request to Airtable using Personal Access Token
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Artists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${airtablePAT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recordData)
    });

    const result = await response.json();

    // Handle Airtable API response
    if (!response.ok) {
      console.error('Airtable API error:', result);
      return res.status(response.status).json({
        error: 'Airtable API error',
        message: result.error?.message || 'Failed to create artist record',
        details: result
      });
    }

    // Return the created record
    return res.status(201).json({
      success: true,
      message: 'Artist created successfully',
      record: result
    });

  } catch (error) {
    console.error('API route error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred while creating the artist record'
    });
  }
} 