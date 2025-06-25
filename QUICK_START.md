# 🚀 Super Quick Airtable Setup

## Option 1: Import Template (Easiest - 2 minutes)

1. **Go to [airtable.com](https://airtable.com)** and create a new base
2. **Name it**: "Represent+ Artists"
3. **Import the CSV files**:
   - Click "Import" → "Upload a CSV file"
   - Upload `data/artists-template.csv` → Name table "Artists"
   - Upload `data/artwork-template.csv` → Name table "Artwork"  
   - Upload `data/tags-template.csv` → Name table "Tags"
4. **Get your credentials**:
   - **Personal Access Token**: Account → Personal access tokens → Create new token
   - **Base ID**: Copy from URL (appXXXXXXXXXXXXXX part)
5. **Update .env file** with your credentials
6. **Run**: `node scripts/setup-airtable.js`

## Option 2: Manual Setup (5 minutes)

If import doesn't work, follow the field configuration guide in AIRTABLE_QUICK_SETUP.md

## What You Get

✅ 3 sample artists with full profiles
✅ 3 sample artwork pieces with pricing  
✅ 15 specialty tags for filtering
✅ Complete API integration ready

## Testing

After setup, test by:
1. `npm run dev`
2. Visit: http://localhost:3000/api/artists
3. Visit: http://localhost:3000/artists

The entire setup should take 2-5 minutes!
