import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Event, Thumbnail } from '@/types/event';

const eventsDirectory = path.join(process.cwd(), 'content', 'events');

/**
 * Parses Google Photos URL to extract dimensions and determine orientation
 * @param url - Google Photos URL containing width and height parameters (e.g., w1986-h1324)
 * @returns orientation - 'portrait', 'landscape', 'square', or undefined if dimensions can't be parsed
 */
function detectThumbnailOrientation(url: string): 'portrait' | 'landscape' | 'square' | undefined {
  try {
    // Google Photos URLs contain dimensions in format: w{width}-h{height}
    const widthMatch = url.match(/w(\d+)-h(\d+)/);
    
    if (!widthMatch) {
      return undefined;
    }
    
    const width = parseInt(widthMatch[1], 10);
    const height = parseInt(widthMatch[2], 10);
    
    if (isNaN(width) || isNaN(height)) {
      return undefined;
    }
    
    // Calculate aspect ratio to determine orientation
    const aspectRatio = width / height;
    const threshold = 0.05; // 5% threshold for considering square
    
    if (Math.abs(aspectRatio - 1) < threshold) {
      return 'square';
    } else if (aspectRatio > 1) {
      return 'landscape';
    } else {
      return 'portrait';
    }
  } catch (error) {
    return undefined;
  }
}

/**
 * Processes thumbnails to add orientation metadata
 * @param thumbnails - Array of thumbnail objects with URLs
 * @returns Array of thumbnails with orientation field populated
 */
function processThumbnails(thumbnails: Thumbnail[]): Thumbnail[] {
  return thumbnails.map(thumbnail => ({
    ...thumbnail,
    orientation: detectThumbnailOrientation(thumbnail.url),
  }));
}

/**
 * Processes markdown text to HTML
 * @param text - Markdown text to process
 * @returns HTML string with links opening in new tabs
 */
function processMarkdown(text: string): string {
  if (!text) return '';
  try {
    // Convert single newlines to double newlines for proper paragraph breaks
    const normalizedText = text.replace(/\n/g, '\n\n');
    const result = remark().use(html).processSync(normalizedText);
    // Add target="_blank" and rel="noopener noreferrer" to all links
    return result.toString().replace(/<a href="/g, '<a target="_blank" rel="noopener noreferrer" href="');
  } catch (error) {
    return text;
  }
}

export function getAllEvents(): Event[] {
  // Check if directory exists
  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }

  // Get all markdown files from the events directory
  const fileNames = fs.readdirSync(eventsDirectory);
  const allEventsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      // Remove .md extension to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Process markdown content to HTML
      const processedContent = processMarkdown(content);
      const processedDescription = processMarkdown(data.description || '');

      // Combine the data with the slug and content
      return {
        slug,
        title: data.title || '',
        event: data.event || '',
        date: data.date || '',
        description: processedDescription,
        albums: data.albums || [],
        thumbnails: processThumbnails(data.thumbnails || []),
        content: processedContent,
      } as Event;
    });

  // Sort events by date (newest first)
  return allEventsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getEventBySlug(slug: string): Event | null {
  try {
    const fullPath = path.join(eventsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = processMarkdown(content);
    const processedDescription = processMarkdown(data.description || '');

    return {
      slug,
      title: data.title || '',
      event: data.event || '',
      date: data.date || '',
      description: processedDescription,
      albums: data.albums || [],
      thumbnails: processThumbnails(data.thumbnails || []),
      content: processedContent,
    } as Event;
  } catch (error) {
    return null;
  }
}

