'use client';

import { useMemo } from 'react';
import { Box } from '@mui/material';
import { Event } from '@/types/event';
import { AboutMe } from '@/types/about';
import { FilterOptions, filterAndSortEvents } from '@/lib/filters';
import EventGrid from './EventGrid';

interface GalleryClientProps {
  events: Event[];
  filters: FilterOptions;
  aboutMe?: AboutMe | null;
}

export default function GalleryClient({ events, filters, aboutMe }: GalleryClientProps) {
  const filteredEvents = useMemo(() => {
    return filterAndSortEvents(events, filters);
  }, [events, filters]);

  return (
    <Box>
      {/* Full-width event grid with snap scrolling */}
      <EventGrid events={filteredEvents} aboutMe={aboutMe} />
    </Box>
  );
}
