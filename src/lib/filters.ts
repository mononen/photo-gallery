import { Event } from '@/types/event';

export type SortOrder = 'newest' | 'oldest';

export interface FilterOptions {
  eventType?: string;
  year?: number;
  searchQuery?: string;
  sortOrder?: SortOrder;
}

/**
 * Infers event type from event name by removing year and common suffixes
 * Examples:
 * - "Wedding 2024" -> "Wedding"
 * - "Concert 2023" -> "Concert"
 * - "Birthday Party - 2024" -> "Birthday Party"
 */
export function inferEventType(title: string): string {
  // Remove year patterns (4 digits, possibly with dashes/spaces around)
  let type = title.replace(/\s*-?\s*\d{4}\s*-?\s*/g, '').trim();
  
  // Remove common suffixes
  type = type.replace(/\s*-\s*.*$/, '').trim();
  
  // If nothing left, return original title
  return type || title;
}

/**
 * Extract all unique event types from events
 */
export function getEventTypes(events: Event[]): string[] {
  const types = new Set<string>();
  events.forEach((event) => {
    types.add(inferEventType(event.title));
  });
  return Array.from(types).sort();
}

/**
 * Extract all unique years from events
 */
export function getYears(events: Event[]): number[] {
  const years = new Set<number>();
  events.forEach((event) => {
    const year = new Date(event.date).getFullYear();
    if (!isNaN(year)) {
      years.add(year);
    }
  });
  return Array.from(years).sort((a, b) => b - a);
}

/**
 * Filter and sort events based on options
 */
export function filterAndSortEvents(
  events: Event[],
  options: FilterOptions
): Event[] {
  let filtered = [...events];

  // Filter by event type
  if (options.eventType) {
    filtered = filtered.filter(
      (event) => inferEventType(event.title) === options.eventType
    );
  }

  // Filter by year
  if (options.year) {
    filtered = filtered.filter((event) => {
      const eventYear = new Date(event.date).getFullYear();
      return eventYear === options.year;
    });
  }

  // Filter by search query
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
    );
  }

  // Sort by date
  const sortOrder = options.sortOrder || 'newest';
  filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return filtered;
}

