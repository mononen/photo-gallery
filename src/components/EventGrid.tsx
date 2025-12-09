'use client';

import { Fragment } from 'react';
import { Typography, Box } from '@mui/material';
import { Event } from '@/types/event';
import { AboutMe } from '@/types/about';
import EventCard from './EventCard';
import AboutMeCard from './AboutMeCard';

interface EventGridProps {
  events: Event[];
  aboutMe?: AboutMe | null;
}

export default function EventGrid({ events, aboutMe }: EventGridProps) {
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
        <Fragment key={event.slug}>
          {/* First card with bounce animation (only if aboutMe exists) */}
          {index === 0 && aboutMe ? (
            <Box
              sx={{
                position: 'relative',
                height: '100vh',
                overflow: 'hidden',
                scrollSnapAlign: 'start',
                WebkitScrollSnapAlign: 'start',
                scrollSnapStop: 'always',
                WebkitScrollSnapStop: 'always',
              }}
            >
              {/* Peek preview of About Me at bottom - matches full card layout */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 'calc(100vh - 120px)',
                  left: 0,
                  right: 0,
                  height: '120px',
                  zIndex: 1,
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {/* Text section on left */}
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    pt: 3,
                    px: { xs: 3, md: 8 },
                    maxWidth: { md: '55%' },
                  }}
                >
                  <Box>
                    {aboutMe.titles.length > 0 && (
                      <Typography
                        variant="h4"
                        sx={{
                          color: 'white',
                          fontWeight: 700,
                          textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                          mb: 0.5,
                        }}
                      >
                        {aboutMe.titles[0]}
                      </Typography>
                    )}
                    {aboutMe.titles.length > 1 && (
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {aboutMe.titles[1]}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Image section on right */}
                {aboutMe.images.length > 0 && (
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      width: '45%',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${aboutMe.images[0].url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                      }}
                    />
                  </Box>
                )}
              </Box>

              {/* First event card on top - parallax animation handled internally */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '100vh',
                  zIndex: 2,
                }}
              >
                <EventCard event={event} index={index} isFirstCard />
              </Box>
            </Box>
          ) : (
            <EventCard event={event} index={index} />
          )}

          {/* Insert full AboutMe card after the first event */}
          {index === 0 && aboutMe && <AboutMeCard aboutMe={aboutMe} />}
        </Fragment>
      ))}
    </Box>
  );
}
