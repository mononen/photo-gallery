'use client';

import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
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
      <Box sx={{ mb: 4 }}>
        <FilterBar events={events} filters={filters} onFiltersChange={setFilters} />
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <EventGrid events={filteredEvents} />
      </Box>
    </Box>
  );
}

