# 🎨 Stitch-Inspired Banner Generation System

This system automatically generates personalized banner images for artists using AI, creating a "Style-Aware Stitching" experience that adapts to each artist's unique aesthetic.

## 📋 Manual Airtable Setup

### Step 1: Add New Fields to Artists Table

Go to your Airtable Artists table and add these new fields:

1. **GeneratedBannerImage** (URL type)
   - This will store the AI-generated banner image URL
   - Leave empty initially

2. **ThemePrimaryColor** (Single line text type)
   - Stores the primary accent color for the artist's theme
   - Format: Hex color code (e.g., "#00ff9d")

3. **ThemeBackgroundColor** (Single line text type)
   - Stores the background color for the artist's theme
   - Format: Hex color code (e.g., "#0e0e0e")

4. **ThemeTextColor** (Single line text type)
   - Stores the text color for the artist's theme
   - Format: Hex color code (e.g., "#ffffff")

## 🔧 Environment Variables

Add these to your `.env` file:

```env
# Banner Generation Security
BANNER_GENERATION_SECRET=your-super-secret-token-here

# OpenAI API (for future AI image generation)
OPENAI_API_KEY=your-openai-api-key-here
```

## 🚀 API Endpoint

The banner generation API is available at:
```
POST /api/artists/generate-banner
```

### Request Format:
```json
{
  "artistId": "recXXXXXXXXXXXXXX"
}
```

### Headers:
```
Authorization: Bearer your-super-secret-token-here
Content-Type: application/json
```

### Response:
```json
{
  "success": true,
  "artistId": "recXXXXXXXXXXXXXX",
  "bannerUrl": "https://generated-banner-url.com/image.jpg",
  "message": "Banner generated and stored successfully"
}
```

## 🎯 How It Works

### Step 1: Analyze
- Fetches artist data from Airtable
- Extracts color palette from the artist's profile image
- **TODO**: Integrate with color extraction API (Cloudinary, etc.)

### Step 2: Generate
- Creates a dynamic prompt using extracted colors and artist info
- **TODO**: Integrate with DALL-E 3 or similar AI image generation
- Currently uses placeholder Unsplash images

### Step 3: Store
- Updates the artist's Airtable record with the generated banner URL
- The frontend automatically displays the new banner

## 🎨 Frontend Integration

The artist detail page (`app/artists/[slug]/page.tsx`) now:

1. **Checks for GeneratedBannerImage** first
2. **Falls back to theme colors** if no banner exists
3. **Uses profile image** as final fallback
4. **Applies dynamic theming** using CSS custom properties

### Conditional Display Logic:
```tsx
{artist.fields?.GeneratedBannerImage ? (
  // Use AI-generated banner
  <Image src={artist.fields.GeneratedBannerImage} />
) : (
  // Fallback to theme colors or profile image
  <div style={{ backgroundColor: artist.fields?.ThemeBackgroundColor }}>
    {/* Fallback content */}
  </div>
)}
```

## 🔒 Security

The API is protected by:
- Bearer token authentication
- Environment variable configuration
- Input validation
- Error handling

## 🧪 Testing

Run the test script:
```bash
node scripts/test-banner-generation.js
```

**Note**: Replace the `artistId` in the script with an actual artist record ID from your Airtable.

## 🔮 Future Enhancements

### Phase 1: Color Extraction
- Integrate with Cloudinary's color extraction API
- Use machine learning for intelligent color selection
- Extract dominant, complementary, and accent colors

### Phase 2: AI Image Generation
- Integrate with DALL-E 3 API
- Create sophisticated prompts based on artist style
- Generate multiple variations and select the best

### Phase 3: Advanced Theming
- Dynamic CSS generation based on extracted colors
- Automatic contrast ratio optimization
- Accessibility compliance checking

## 📱 Airtable Automation (Future)

Create an Airtable automation that:
1. **Trigger**: When ProfileImage field is updated
2. **Action**: Call the banner generation API
3. **Result**: Automatically update GeneratedBannerImage field

### Automation Script Example:
```javascript
// This would be added to Airtable automation
const response = await fetch('https://your-domain.com/api/artists/generate-banner', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${input.config.secret}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    artistId: input.config.recordId
  })
});

if (response.ok) {
  const data = await response.json();
  await table.updateRecordAsync(input.config.recordId, {
    'GeneratedBannerImage': data.bannerUrl
  });
}
```

## 🎯 Benefits

1. **Personalized Experience**: Each artist gets a unique banner
2. **Automated Workflow**: No manual design work required
3. **Consistent Branding**: Maintains platform aesthetic
4. **Scalable**: Works for any number of artists
5. **Future-Proof**: Easy to enhance with new AI capabilities

## 🚨 Troubleshooting

### Common Issues:

1. **401 Unauthorized**: Check BANNER_GENERATION_SECRET in .env
2. **404 Artist Not Found**: Verify artistId exists in Airtable
3. **500 Server Error**: Check Airtable API credentials
4. **Missing Banner**: Ensure GeneratedBannerImage field exists in Airtable

### Debug Steps:
1. Check environment variables
2. Verify Airtable field names
3. Test API endpoint manually
4. Check browser console for frontend errors

---

This system creates a truly futuristic, AI-powered experience that will impress both users and investors with its sophisticated automation and personalization capabilities. 