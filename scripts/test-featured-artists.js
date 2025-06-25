const testFeaturedArtists = async () => {
  console.log('🧪 Testing Featured Artists API...\n');

  try {
    // Test 1: Get all artists
    console.log('1️⃣ Testing: Get all artists');
    const allResponse = await fetch('http://localhost:3000/api/artists');
    const allArtists = await allResponse.json();
    console.log(`✅ All artists: ${allArtists.length} found`);
    
    // Test 2: Get featured artists only
    console.log('\n2️⃣ Testing: Get featured artists only');
    const featuredResponse = await fetch('http://localhost:3000/api/artists?featured=true');
    const featuredArtists = await featuredResponse.json();
    console.log(`✅ Featured artists: ${featuredArtists.length} found`);
    
    // Test 3: Compare results
    console.log('\n3️⃣ Analysis:');
    console.log(`📊 Total artists: ${allArtists.length}`);
    console.log(`⭐ Featured artists: ${featuredArtists.length}`);
    console.log(`📈 Featured percentage: ${((featuredArtists.length / allArtists.length) * 100).toFixed(1)}%`);
    
    // Test 4: Show featured artist details
    if (featuredArtists.length > 0) {
      console.log('\n4️⃣ Featured Artist Details:');
      featuredArtists.forEach((artist, index) => {
        console.log(`   ${index + 1}. ${artist.name} - ${artist.specialty}`);
        console.log(`      Tags: ${artist.tags.join(', ')}`);
        console.log(`      Featured: ${artist.featured}`);
        console.log('');
      });
    }
    
    // Test 5: Verify featured flag
    console.log('5️⃣ Verifying featured flag consistency:');
    const featuredFromAll = allArtists.filter(artist => artist.featured);
    console.log(`✅ Artists with featured=true in all results: ${featuredFromAll.length}`);
    console.log(`✅ Featured API returned: ${featuredArtists.length}`);
    
    if (featuredFromAll.length === featuredArtists.length) {
      console.log('✅ Featured filtering is working correctly!');
    } else {
      console.log('❌ Featured filtering may have issues');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testFeaturedArtists(); 