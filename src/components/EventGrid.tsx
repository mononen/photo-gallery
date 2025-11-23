'use client';

import { Typography, Box } from '@mui/material';
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
          py: 12,
          px: 3,
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 500,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            No events found matching your filters.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              mt: 1,
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}
    >
      {events.map((event, index) => (
        <EventCard key={event.slug} event={event} index={index} />
      ))}
    </Box>
  );
}

