# Represent+ Artist Platform

A modern, responsive Next.js 14+ application showcasing contemporary artists with a premium editorial aesthetic inspired by kavsulting.com.

## Features

### 🎨 Artist Management
- **Dynamic Artist Profiles**: Individual artist pages with bio, social links, and artwork galleries
- **Tag-Based System**: Artists are categorized with specialty tags (e.g., "Painter", "Sculptor", "Digital", "Contemporary")
- **Tag Badges**: Visual tag badges displayed on artist images across the platform
- **Advanced Filtering**: Search and filter artists by specialty tags on the artists listing page

### 🏠 Homepage
- **Featured Artists Section**: Showcases top artists with tag badges and direct navigation to individual profiles
- **Animated Artwork Carousel**: Dynamic showcase of contemporary artwork
- **Premium Design**: Dark theme with neon green accents and modern typography

### 👥 Artists Page
- **Comprehensive Artist Listing**: Grid layout with artist cards featuring tag badges
- **Real-time Filtering**: Filter artists by one or multiple specialty tags
- **Clear All Filters**: Easy reset functionality for search criteria
- **Loading States**: Smooth loading animations and error handling

### 🎭 Artist Profile Pages
- **Rich Artist Information**: Detailed bios, social media links, and location data
- **Artwork Gallery**: Curated selection of artist's work with hover effects
- **Tag Display**: Prominent display of artist's specialty tags
- **Contact Integration**: Direct contact options for artist inquiries

### 🎨 Design System
- **Neon Green Theme**: #39FF14 and #00ff9d color palette
- **Dark Mode**: Sophisticated dark backgrounds with high contrast
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: ShadCN UI integration
- **TypeScript**: Full type safety for all components and data
- **State Management**: React hooks for client-side state
- **Data Layer**: Custom hooks for artist data (ready for Airtable integration)

## Project Structure

```
represent-react/
├── app/                    # Next.js App Router pages
│   ├── artists/           # Artist listing and profile pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── testimonials/      # Testimonials page
│   └── shop/              # Shop page
├── components/            # Reusable UI components
│   ├── ui/               # ShadCN UI components
│   └── artist-components.tsx  # Shared artist components
├── hooks/                 # Custom React hooks
│   └── useArtists.ts     # Artist data management
├── types/                 # TypeScript type definitions
│   └── artist.ts         # Artist data types
└── globals.css           # Global styles and animations
```

## Key Components

### TagBadge Component
- Displays artist specialty tags with consistent styling
- Black background with neon green text and borders
- Accessible with ARIA labels
- Used across all artist displays

### ArtistCard Components
- **ArtistCard**: For artists listing page (dark theme)
- **FeaturedArtistCard**: For homepage featured section (light theme)
- Both include tag badges and navigation to individual profiles

### FilterPanel Component
- Checkbox-based filtering by artist tags
- Real-time filtering without page reload
- Clear all functionality
- Shows active filter count

## Data Integration

The application is designed to integrate with Airtable for artist data management:

- Artist profiles with bio, location, and social links
- Tag-based categorization system
- Artwork galleries and portfolio management
- Real-time data updates

### Custom Hooks

- `useArtists()`: Fetches all artists with loading and error states
- `useArtist(slug)`: Fetches individual artist by slug
- `useAllTags()`: Extracts unique tags from artist data

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Homepage: http://localhost:3000
   - Artists: http://localhost:3000/artists
   - Individual Artist: http://localhost:3000/artists/[slug]

## Features in Action

### Tag-Based Filtering
1. Navigate to `/artists`
2. Use the filter panel to select one or multiple tags
3. Artists are filtered in real-time
4. Use "Clear All" to reset filters

### Artist Navigation
1. Click "View Profile" on any artist card
2. Navigate to individual artist profile page
3. View tag badges, bio, social links, and artwork
4. Use "View All Artists" to return to listing

### Featured Artists
1. Homepage showcases featured artists with tag badges
2. Click "View Profile" to navigate to individual pages
3. Consistent navigation experience across the platform

## Design Philosophy

The platform emphasizes:
- **Premium Aesthetics**: Sophisticated dark theme with neon accents
- **User Experience**: Intuitive navigation and filtering
- **Artist Discovery**: Tag-based categorization for easy exploration
- **Professional Presentation**: High-quality artist profiles and portfolios
- **Accessibility**: Inclusive design for all users

## Future Enhancements

- Airtable integration for dynamic data management
- Advanced search functionality
- Artist application system
- E-commerce integration for artwork sales
- Admin dashboard for content management
- Multi-language support
- Advanced analytics and insights

## Contributing

This project uses modern React patterns and TypeScript for type safety. All components are designed to be reusable and maintainable.

---

Built with ❤️ for the contemporary art community 