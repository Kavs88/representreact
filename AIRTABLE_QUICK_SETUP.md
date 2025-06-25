# Airtable Quick Setup Reference

## Field Configurations

### Artists Table Fields
| Field Name | Type | Options/Notes |
|------------|------|---------------|
| Name | Single line text | - |
| Slug | Single line text | - |
| Bio | Long text | - |
| ProfileImage | URL | - |
| SocialLinks | Long text | JSON format |
| Specialties | Multiple select | See list below |
| Featured | Checkbox | - |
| Email | Email | - |
| Phone | Phone number | - |

### Artwork Table Fields
| Field Name | Type | Options/Notes |
|------------|------|---------------|
| Title | Single line text | - |
| ArtistSlug | Single line text | - |
| ImageUrl | URL | - |
| Description | Long text | - |
| Price | Currency | USD |
| Category | Single select | See list below |
| Tags | Multiple select | See list below |

### Tags Table Fields
| Field Name | Type | Options/Notes |
|------------|------|---------------|
| Name | Single line text | - |
| Slug | Single line text | - |

## Multiple Select Options

### Specialties (Artists table)
- Digital Art
- Abstract Art
- Street Art
- Character Design
- Mixed Media
- Neon Aesthetics
- Cyberpunk
- Cultural Expression
- Electronic Music
- Audio-Visual
- Blockchain Art
- Murals
- Community Art
- Digital Illustration
- Gaming Art

### Categories (Artwork table)
- Digital Art
- Abstract Art
- Street Art
- Character Design
- Audio-Visual

### Tags (Artwork table)
- Neon
- Cyberpunk
- Digital
- Cultural
- Abstract
- Mixed Media
- Blockchain
- Electronic
- Installation
- Mural
- Community
- Urban
- Gaming
- Characters

## Quick Setup Steps

1. **Create base**: "Represent+ Artists"
2. **Create 3 tables**: Artists, Artwork, Tags
3. **Configure fields** as shown above
4. **Get API key** from account settings
5. **Get Base ID** from URL
6. **Update .env file**
7. **Run**: `node scripts/setup-airtable.js` 