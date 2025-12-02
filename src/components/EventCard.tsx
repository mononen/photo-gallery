'use client';

import { useMemo, useState, useEffect } from 'react';
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

  // Track viewport orientation
  const [viewportOrientation, setViewportOrientation] = useState<'portrait' | 'landscape'>('landscape');
  
  // Track selected thumbnail index (in the full thumbnails array)
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number>(0);

  // Get the orientation-matched thumbnail pool
  const getOrientationMatchedThumbnails = useMemo(() => {
    if (event.thumbnails.length === 0) return [];

    // Filter thumbnails by matching orientation
    const matchingThumbnails = event.thumbnails.filter(
      thumb => thumb.orientation === viewportOrientation || thumb.orientation === 'square'
    );

    // Use matching thumbnails if available, otherwise fall back to all thumbnails
    return matchingThumbnails.length > 0 ? matchingThumbnails : event.thumbnails;
  }, [event.thumbnails, viewportOrientation]);

  // Auto-select initial thumbnail and when orientation changes
  useEffect(() => {
    if (getOrientationMatchedThumbnails.length > 0) {
      setSelectedThumbnailIndex(prevIndex => {
        // Check if the currently selected thumbnail is already orientation-appropriate
        const currentThumbnail = event.thumbnails[prevIndex];
        const isCurrentThumbnailAppropriate = getOrientationMatchedThumbnails.some(
          t => t.url === currentThumbnail?.url
        );
        
        // Only auto-select a new thumbnail if current one doesn't match the orientation
        if (!isCurrentThumbnailAppropriate) {
          // Find a random orientation-matched thumbnail and get its index in the full array
          const randomMatchedThumb = getOrientationMatchedThumbnails[
            Math.floor(Math.random() * getOrientationMatchedThumbnails.length)
          ];
          const fullArrayIndex = event.thumbnails.findIndex(t => t.url === randomMatchedThumb.url);
          return fullArrayIndex !== -1 ? fullArrayIndex : prevIndex;
        }
        
        // Keep the current selection if it's appropriate
        return prevIndex;
      });
    }
  }, [getOrientationMatchedThumbnails, viewportOrientation, event.thumbnails]);

  useEffect(() => {
    // Function to detect viewport orientation
    const updateOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setViewportOrientation(isPortrait ? 'portrait' : 'landscape');
    };

    // Set initial orientation
    updateOrientation();

    // Listen for window resize and orientation changes
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  // Get the background image based on selected thumbnail
  const backgroundImage = useMemo(() => {
    if (event.thumbnails.length === 0) {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    const selectedThumbnail = event.thumbnails[selectedThumbnailIndex] || event.thumbnails[0];
    return `url(${selectedThumbnail.url})`;
  }, [event.thumbnails, selectedThumbnailIndex]);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        height: '100vh',
        scrollSnapAlign: 'start',
        WebkitScrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        WebkitScrollSnapStop: 'always',
        overflow: 'hidden',
        flexShrink: 0,
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
      }}
    >
      {/* Background Image */}
      <Box
        className="event-image"
        key={selectedThumbnailIndex}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'opacity 0.5s ease-in-out, transform 0.6s ease',
          animation: 'fadeIn 0.5s ease-in-out',
          '@keyframes fadeIn': {
            from: {
              opacity: 0.7,
            },
            to: {
              opacity: 1,
            },
          },
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
          justifyContent: 'center',
          alignItems: 'flex-start',
          p: { xs: 3, md: 8 },
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        <Box sx={{ maxWidth: { xs: '100%', md: '70%' } }}>
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
      {event.thumbnails.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 16, md: 32 },
            right: { xs: 16, md: 32 },
            zIndex: 2,
            display: 'flex',
            gap: { xs: 1, md: 1.5 },
          }}
        >
          {event.thumbnails.slice(0, Math.min(4, event.thumbnails.length)).map((thumb, idx) => {
            // Check if this thumbnail is the currently selected one
            const isSelected = selectedThumbnailIndex === idx;
            
            return (
              <Box
                key={idx}
                onClick={() => {
                  console.log('Thumbnail clicked:', idx);
                  setSelectedThumbnailIndex(idx);
                }}
                sx={{
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  borderRadius: { xs: 1.5, md: 2 },
                  backgroundImage: `url(${thumb.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: isSelected 
                    ? { xs: '2px solid rgba(255,255,255,1)', md: '3px solid rgba(255,255,255,1)' }
                    : { xs: '2px solid rgba(255,255,255,0.4)', md: '3px solid rgba(255,255,255,0.4)' },
                  boxShadow: isSelected
                    ? '0 8px 32px rgba(255,255,255,0.3)'
                    : '0 8px 24px rgba(0,0,0,0.4)',
                  opacity: isSelected ? 1 : 0.6,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    transform: { xs: 'scale(1.1)', md: 'scale(1.15) translateY(-4px)' },
                    border: { xs: '2px solid rgba(255,255,255,0.9)', md: '3px solid rgba(255,255,255,0.9)' },
                  },
                }}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}

