import { Container, Typography, Box } from '@mui/material';
import { getAllEvents } from '@/lib/events';
import GalleryClient from '@/components/GalleryClient';

export default function Home() {
  const events = getAllEvents();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          py: { xs: 3, md: 6 },
        }}
      >
        {/* Header */}
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center', pt: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 800,
              mb: 1.5,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
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
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Events and Albums
          </Typography>
        </Box>

        <GalleryClient events={events} />
      </Container>

      {/* Scroll indicator (optional, appears only on first load) */}
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
    </Box>
  );
}

