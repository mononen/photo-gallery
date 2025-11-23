export interface Album {
  name: string;
  url: string;
}

export interface Thumbnail {
  url: string;
}

export interface Event {
  title: string;
  date: string;
  description: string;
  albums: Album[];
  thumbnails: Thumbnail[];
  content?: string; // Markdown content
  slug: string; // Filename without extension
}

