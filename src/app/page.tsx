import { Typography, Box, Container } from '@mui/material';
import { getAllEvents } from '@/lib/events';
import GalleryClient from '@/components/GalleryClient';
import { Fragment } from 'react';

export default function Home() {
  const events = getAllEvents();

  return (
    <Fragment>
      {/* Fixed background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          zIndex: -2,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* Header - Fixed at top */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: 'linear-gradient(180deg, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.8) 70%, transparent 100%)',
          backdropFilter: 'blur(10px)',
          py: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                textShadow: '0 4px 20px rgba(0,0,0,0.4)',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Photo Gallery
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Spacer for fixed header */}
      <Box 
        sx={{ 
          height: { xs: 80, md: 100 },
          scrollSnapAlign: 'none',
        }} 
      />

      <GalleryClient events={events} />

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 100%': {
              transform: 'translateX(-50%) translateY(0)',
            },
            '50%': {
              transform: 'translateX(-50%) translateY(-10px)',
            },
          },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 50,
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: 15,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 8,
              left: '50%',
              width: 6,
              height: 6,
              background: 'white',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              animation: 'scroll 2s infinite',
              '@keyframes scroll': {
                '0%': { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
                '100%': { opacity: 0, transform: 'translateX(-50%) translateY(20px)' },
              },
            },
          }}
        />
      </Box>
    </Fragment>
  );
}

