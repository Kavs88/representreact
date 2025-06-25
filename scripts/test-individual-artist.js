const testIndividualArtist = async () => {
  console.log('🧪 Testing Individual Artist API...\n');

  try {
    // First, get all artists to find a valid slug
    console.log('1️⃣ Getting all artists to find a valid slug...');
    const allResponse = await fetch('http://localhost:3000/api/artists');
    const allArtists = await allResponse.json();
    
    if (allArtists.length === 0) {
      console.log('❌ No artists found');
      return;
    }
    
    const firstArtist = allArtists[0];
    console.log(`✅ Found artist: ${firstArtist.name} with slug: ${firstArtist.slug}`);
    
    // Test individual artist API
    console.log(`\n2️⃣ Testing GET /api/artists/${firstArtist.slug}...`);
    const individualResponse = await fetch(`http://localhost:3000/api/artists/${firstArtist.slug}`);
    
    if (!individualResponse.ok) {
      console.log(`❌ Individual artist API failed with status: ${individualResponse.status}`);
      const errorText = await individualResponse.text();
      console.log('Error response:', errorText);
      return;
    }
    
    const individualArtist = await individualResponse.json();
    console.log('✅ Individual artist API success!');
    console.log(`   Name: ${individualArtist.name}`);
    console.log(`   Specialty: ${individualArtist.specialty}`);
    console.log(`   Location: ${individualArtist.location}`);
    console.log(`   Tags: ${individualArtist.tags.join(', ')}`);
    console.log(`   Has image: ${!!individualArtist.image}`);
    console.log(`   Featured: ${individualArtist.featured}`);
    
    // Test with invalid slug
    console.log('\n3️⃣ Testing with invalid slug...');
    const invalidResponse = await fetch('http://localhost:3000/api/artists/invalid-slug');
    console.log(`   Invalid slug response status: ${invalidResponse.status}`);
    
    if (invalidResponse.status === 404) {
      console.log('✅ Invalid slug correctly returns 404');
    } else {
      console.log('❌ Invalid slug should return 404');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testIndividualArtist(); 