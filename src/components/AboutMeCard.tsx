'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { AboutMe } from '@/types/about';

interface AboutMeCardProps {
  aboutMe: AboutMe;
  isPeek?: boolean;
}

export default function AboutMeCard({ aboutMe, isPeek = false }: AboutMeCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Rotate images every 10 seconds
  useEffect(() => {
    if (aboutMe.images.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % aboutMe.images.length);
        setIsTransitioning(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [aboutMe.images.length]);

  const currentImage = aboutMe.images[currentImageIndex]?.url;

  // Portrait / Mobile Layout - Full background with overlay text
  if (isMobile) {
    return (
      <Box
        component="section"
        sx={{
          position: 'relative',
          width: '100vw',
          minHeight: '100vh',
          height: '100vh',
          ...(!isPeek && {
            scrollSnapAlign: 'start',
            WebkitScrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            WebkitScrollSnapStop: 'always',
          }),
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Full-screen Background Image */}
        {currentImage && (
          <Box
            key={currentImageIndex}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${currentImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              opacity: isTransitioning ? 0 : 1,
              transition: 'opacity 1s ease-in-out',
              zIndex: 0,
            }}
          />
        )}

        {/* Gradient overlay for text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            zIndex: 1,
          }}
        />

        {/* Content Overlay - Positioned at bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            p: 3,
            pb: 4,
            maxHeight: '60vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '2px',
            },
          }}
        >
          {/* Titles */}
          {aboutMe.titles.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {aboutMe.titles.map((title, idx) => (
                <Typography
                  key={idx}
                  variant={idx === 0 ? 'h4' : 'subtitle1'}
                  component={idx === 0 ? 'h2' : 'p'}
                  sx={{
                    color: idx === 0 ? 'white' : 'rgba(255, 255, 255, 0.8)',
                    fontWeight: idx === 0 ? 700 : 400,
                    mb: idx === 0 ? 0.5 : 0.25,
                    textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.5)',
                    letterSpacing: idx === 0 ? '-0.02em' : '0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </Typography>
              ))}
            </Box>
          )}

          {/* Markdown Content */}
          <Box
            dangerouslySetInnerHTML={{ __html: aboutMe.content }}
            sx={{
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 1px 8px rgba(0,0,0,0.7)',
              lineHeight: 1.7,
              fontSize: '0.9rem',
              '& p': {
                margin: 0,
                marginBottom: 1.5,
                '&:last-child': {
                  marginBottom: 0,
                },
              },
              '& a': {
                color: 'rgba(255,255,255,1)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 0.8,
                },
              },
              '& ul, & ol': {
                paddingLeft: 2.5,
                marginBottom: 1.5,
              },
              '& li': {
                marginBottom: 0.25,
              },
              '& strong': {
                color: 'white',
                fontWeight: 600,
              },
              '& em': {
                fontStyle: 'italic',
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                color: 'white',
                marginTop: 2,
                marginBottom: 1,
                fontWeight: 600,
                textShadow: '0 2px 16px rgba(0,0,0,0.8)',
              },
              '& h2': {
                fontSize: '1.1rem',
              },
              '& h3': {
                fontSize: '1rem',
              },
            }}
          />
        </Box>

        {/* Image indicators */}
        {aboutMe.images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              display: 'flex',
              gap: 1,
              zIndex: 3,
            }}
          >
            {aboutMe.images.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentImageIndex(idx);
                    setIsTransitioning(false);
                  }, 500);
                }}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    idx === currentImageIndex
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    transform: 'scale(1.2)',
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    );
  }

  // Landscape / Desktop Layout - Side by side with 65% image
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        height: '100vh',
        ...(!isPeek && {
          scrollSnapAlign: 'start',
          WebkitScrollSnapAlign: 'start',
          scrollSnapStop: 'always',
          WebkitScrollSnapStop: 'always',
        }),
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    >
      {/* Content Section - 35% width */}
      <Box
        sx={{
          width: '35%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          p: 6,
          pl: 8,
        }}
      >
        <Box sx={{ maxWidth: '500px' }}>
          {/* Titles */}
          {aboutMe.titles.length > 0 && (
            <Box sx={{ mb: 3 }}>
              {aboutMe.titles.map((title, idx) => (
                <Typography
                  key={idx}
                  variant={idx === 0 ? 'h3' : 'h6'}
                  component={idx === 0 ? 'h2' : 'p'}
                  sx={{
                    color: idx === 0 ? 'white' : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: idx === 0 ? 700 : 400,
                    mb: idx === 0 ? 1 : 0.5,
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    letterSpacing: idx === 0 ? '-0.02em' : 'normal',
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </Typography>
              ))}
            </Box>
          )}

          {/* Markdown Content */}
          <Box
            dangerouslySetInnerHTML={{ __html: aboutMe.content }}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              lineHeight: 1.8,
              fontSize: '1.05rem',
              '& p': {
                margin: 0,
                marginBottom: 2,
                '&:last-child': {
                  marginBottom: 0,
                },
              },
              '& a': {
                color: 'rgba(255,255,255,1)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 0.8,
                },
              },
              '& ul, & ol': {
                paddingLeft: 3,
                marginBottom: 2,
              },
              '& li': {
                marginBottom: 0.5,
              },
              '& strong': {
                color: 'white',
                fontWeight: 600,
              },
              '& em': {
                fontStyle: 'italic',
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                color: 'white',
                marginTop: 3,
                marginBottom: 1.5,
                fontWeight: 600,
              },
            }}
          />
        </Box>
      </Box>

      {/* Image Section - 65% width */}
      <Box
        sx={{
          position: 'relative',
          width: '65%',
          height: '100%',
        }}
      >
        {currentImage && (
          <Box
            key={currentImageIndex}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${currentImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isTransitioning ? 0 : 1,
              transition: 'opacity 1s ease-in-out',
            }}
          />
        )}

        {/* Soft edge blend on left side */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '120px',
            background: 'linear-gradient(to right, #16213e 0%, transparent 100%)',
            zIndex: 1,
          }}
        />

        {/* Image indicators */}
        {aboutMe.images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 32,
              right: 32,
              display: 'flex',
              gap: 1,
              zIndex: 2,
            }}
          >
            {aboutMe.images.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentImageIndex(idx);
                    setIsTransitioning(false);
                  }, 500);
                }}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    idx === currentImageIndex
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    transform: 'scale(1.2)',
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

