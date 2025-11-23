'use client';

import { Grid, Typography, Box } from '@mui/material';
import { Event } from '@/types/event';
import EventCard from './EventCard';

interface EventGridProps {
  events: Event[];
}

export default function EventGrid({ events }: EventGridProps) {
  if (events.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No events found matching your filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {events.map((event) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={event.slug}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
}

