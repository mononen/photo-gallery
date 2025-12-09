import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { AboutMe } from '@/types/about';

const aboutFilePath = path.join(process.cwd(), 'content', 'about.md');

/**
 * Processes markdown text to HTML
 * @param text - Markdown text to process
 * @returns HTML string with links opening in new tabs
 */
function processMarkdown(text: string): string {
  if (!text) return '';
  try {
    const result = remark().use(html).processSync(text);
    // Add target="_blank" and rel="noopener noreferrer" to all links
    return result.toString().replace(/<a href="/g, '<a target="_blank" rel="noopener noreferrer" href="');
  } catch (error) {
    return text;
  }
}

export function getAboutMe(): AboutMe | null {
  try {
    if (!fs.existsSync(aboutFilePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(aboutFilePath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = processMarkdown(content);

    return {
      titles: data.titles || [],
      images: data.images || [],
      content: processedContent,
    };
  } catch (error) {
    console.error('Error reading about.md:', error);
    return null;
  }
}

