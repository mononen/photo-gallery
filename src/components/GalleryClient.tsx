'use client';

import { useMemo } from 'react';
import { Box } from '@mui/material';
import { Event } from '@/types/event';
import { FilterOptions, filterAndSortEvents } from '@/lib/filters';
import EventGrid from './EventGrid';

interface GalleryClientProps {
  events: Event[];
  filters: FilterOptions;
}

export default function GalleryClient({ events, filters }: GalleryClientProps) {
  const filteredEvents = useMemo(() => {
    return filterAndSortEvents(events, filters);
  }, [events, filters]);

  return (
    <Box>
      {/* Full-width event grid with snap scrolling */}
      <EventGrid events={filteredEvents} />
    </Box>
  );
}

