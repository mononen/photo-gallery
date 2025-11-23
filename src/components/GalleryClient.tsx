'use client';

import { useState, useMemo } from 'react';
import { Box, Container } from '@mui/material';
import { Event } from '@/types/event';
import { FilterOptions, filterAndSortEvents } from '@/lib/filters';
import EventGrid from './EventGrid';
import FilterBar from './FilterBar';

interface GalleryClientProps {
  events: Event[];
}

export default function GalleryClient({ events }: GalleryClientProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    sortOrder: 'newest',
  });

  const filteredEvents = useMemo(() => {
    return filterAndSortEvents(events, filters);
  }, [events, filters]);

  return (
    <Box>
      {/* Filter bar in container */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 150 }}>
        <FilterBar events={events} filters={filters} onFiltersChange={setFilters} />
      </Container>
      
      {/* Full-width event grid with snap scrolling */}
      <Box sx={{ mt: 4 }}>
        <EventGrid events={filteredEvents} />
      </Box>
    </Box>
  );
}

