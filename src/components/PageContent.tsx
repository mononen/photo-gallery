'use client';

import { Fragment, useState } from 'react';
import { Event } from '@/types/event';
import { FilterOptions } from '@/lib/filters';
import Navigation from './Navigation';
import GalleryClient from './GalleryClient';

interface PageContentProps {
  events: Event[];
}

export default function PageContent({ events }: PageContentProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    sortOrder: 'newest',
  });

  return (
    <Fragment>
      {/* Navigation */}
      <Navigation events={events} filters={filters} onFiltersChange={setFilters} />

      <GalleryClient events={events} filters={filters} />
    </Fragment>
  );
}

