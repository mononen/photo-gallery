import { Container, Typography, Box } from '@mui/material';
import { getAllEvents } from '@/lib/events';
import GalleryClient from '@/components/GalleryClient';

export default function Home() {
  const events = getAllEvents();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 2,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            Photo Gallery
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            Events and Albums
          </Typography>
        </Box>

        <GalleryClient events={events} />
      </Container>
    </Box>
  );
}

