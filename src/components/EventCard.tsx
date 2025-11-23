'use client';

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import { format } from 'date-fns';
import { Event } from '@/types/event';
import GooglePhotosLink from './GooglePhotosLink';
import ThumbnailGallery from './ThumbnailGallery';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = format(new Date(event.date), 'MMMM d, yyyy');
  const year = new Date(event.date).getFullYear();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', minHeight: 200 }}>
        <ThumbnailGallery thumbnails={event.thumbnails} backgroundImage />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            zIndex: 1,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              mb: 0.5,
            }}
          >
            {event.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {formattedDate}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {event.description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Chip label={year} size="small" variant="outlined" />
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, flexWrap: 'wrap', gap: 1 }}>
        {event.albums.map((album, index) => (
          <GooglePhotosLink key={index} name={album.name} url={album.url} />
        ))}
      </CardActions>
    </Card>
  );
}

