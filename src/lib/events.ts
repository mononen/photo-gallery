import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Event } from '@/types/event';

const eventsDirectory = path.join(process.cwd(), 'content', 'events');

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
      let processedContent = '';
      try {
        const result = remark().use(html).processSync(content);
        processedContent = result.toString();
      } catch (error) {
        // If markdown processing fails, use empty string
        processedContent = '';
      }

      // Combine the data with the slug and content
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        albums: data.albums || [],
        thumbnails: data.thumbnails || [],
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
    
    let processedContent = '';
    try {
      const result = remark().use(html).processSync(content);
      processedContent = result.toString();
    } catch (error) {
      processedContent = '';
    }

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      albums: data.albums || [],
      thumbnails: data.thumbnails || [],
      content: processedContent,
    } as Event;
  } catch (error) {
    return null;
  }
}

