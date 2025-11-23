'use client';

import {
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CalendarMonth, ArrowForward } from '@mui/icons-material';
import { format } from 'date-fns';
import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const formattedDate = format(new Date(event.date), 'MMMM d, yyyy');
  const year = new Date(event.date).getFullYear();

  // Get first thumbnail or use a placeholder gradient
  const backgroundImage = event.thumbnails[0]?.url
    ? `url(${event.thumbnails[0].url})`
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '70vh', md: '60vh' },
        mb: 4,
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
        '@keyframes fadeInUp': {
          from: {
            opacity: 0,
            transform: 'translateY(30px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.2)',
          '& .event-overlay': {
            background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2))',
          },
          '& .event-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {/* Background Image */}
      <Box
        className="event-image"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.6s ease',
        }}
      />

      {/* Overlay */}
      <Box
        className="event-overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
          transition: 'background 0.6s ease',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: { xs: 3, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: { xs: '100%', md: '60%' } }}>
          {/* Date Badge */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              icon={<CalendarMonth sx={{ fontSize: '1rem' }} />}
              label={formattedDate}
              size={isMobile ? 'small' : 'medium'}
              sx={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: 500,
                '& .MuiChip-icon': {
                  color: 'white',
                },
              }}
            />
            <Chip
              label={year}
              size={isMobile ? 'small' : 'medium'}
              sx={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: 500,
              }}
            />
          </Stack>

          {/* Title */}
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            component="h2"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 2,
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {event.title}
          </Typography>

          {/* Description */}
          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            sx={{
              color: 'rgba(255,255,255,0.95)',
              mb: 3,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              lineHeight: 1.6,
              maxWidth: '600px',
            }}
          >
            {event.description}
          </Typography>

          {/* Album Links */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ flexWrap: 'wrap', gap: 1 }}
          >
            {event.albums.map((album, idx) => (
              <Button
                key={idx}
                href={album.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  color: 'primary.main',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'white',
                    transform: 'translateX(4px)',
                    boxShadow: '0 6px 30px rgba(0,0,0,0.3)',
                  },
                }}
              >
                {album.name}
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Thumbnail Grid (subtle bottom right corner) */}
      {event.thumbnails.length > 1 && !isMobile && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            zIndex: 2,
            display: 'flex',
            gap: 1,
          }}
        >
          {event.thumbnails.slice(1, 4).map((thumb, idx) => (
            <Box
              key={idx}
              sx={{
                width: 60,
                height: 60,
                borderRadius: 1.5,
                backgroundImage: `url(${thumb.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                opacity: 0.8,
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 1,
                  transform: 'scale(1.1)',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

