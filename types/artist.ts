export interface Artist {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio?: string;
  image: string;
  slug: string;
  tags: string[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  featured?: boolean;
  createdDate?: string;
  updatedDate?: string;
  artwork?: string[];
  layoutConfig?: ArtistLayoutConfig;
  pressFeatures?: PressFeature[];
  fields?: {
    ThemePrimaryColor?: string;
    ThemeBackgroundColor?: string;
    ThemeTextColor?: string;
    GeneratedBannerImage?: string;
  };
}

export interface Artwork {
  id: string;
  title: string;
  artistSlug: string;
  image: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  createdDate?: string;
  updatedDate?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdDate?: string;
  updatedDate?: string;
}

export interface ArtistCardProps {
  artist: Artist;
}

export interface TagBadgeProps {
  tag: string;
}

export interface FilterPanelProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export interface PressFeature {
  id: string;
  title: string;
  publication: string;
  excerpt?: string;
  url: string;
  thumbnail?: string;
  date?: string;
  featured?: boolean;
}

export interface ArtistLayoutConfig {
  heroStyle?: 'default' | 'minimal' | 'dramatic' | 'split' | 'fullscreen';
  heroBackground?: string;
  heroTextColor?: string;
  
  galleryLayout?: 'grid' | 'masonry' | 'carousel' | 'masonry-grid';
  galleryColumns?: 2 | 3 | 4;
  
  titleFont?: 'default' | 'serif' | 'monospace' | 'display';
  bodyFont?: 'default' | 'serif' | 'monospace';
  
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  
  showExhibitions?: boolean;
  showActivities?: boolean;
  showPressFeatures?: boolean;
  showArtworkGallery?: boolean;
  
  customCSS?: string;
} 