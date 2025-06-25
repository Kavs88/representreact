const debugFeaturedAPI = async () => {
  console.log('🔍 Debugging Featured Artists API...\n');

  try {
    // Test featured artists endpoint
    console.log('Testing: /api/artists?featured=true');
    const response = await fetch('http://localhost:3000/api/artists?featured=true');
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Raw response:', text);
    
    try {
      const data = JSON.parse(text);
      console.log('Parsed data:', data);
    } catch (parseError) {
      console.log('Failed to parse JSON:', parseError.message);
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
};

debugFeaturedAPI(); 