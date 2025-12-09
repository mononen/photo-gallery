import { Box } from '@mui/material';
import { getAllEvents } from '@/lib/events';
import { getAboutMe } from '@/lib/about';
import PageContent from '@/components/PageContent';
import { Fragment } from 'react';

export default function Home() {
  const events = getAllEvents();
  const aboutMe = getAboutMe();

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

      <PageContent events={events} aboutMe={aboutMe} />

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
