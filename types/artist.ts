// Attachment interface for Airtable attachments
export interface Attachment {
  id: string;
  url: string;
  filename: string;
}

export interface Artist {
  id: string;
  fields: {
    Name?: string;
    Specialty?: string;
    Bio?: string;
    ProfileImage?: Attachment[];
    Instagram?: string;
    Specialties?: string[] | string;
    Featured?: boolean;
    ThemePrimaryColor?: string;
    ThemeBackgroundColor?: string;
    ThemeTextColor?: string;
    GeneratedBannerImage?: Attachment[];
    Artwork?: Attachment[];
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