'use client';

import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Event } from '@/types/event';
import { FilterOptions } from '@/lib/filters';
import FilterBar from './FilterBar';

interface NavigationProps {
  events: Event[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function Navigation({ events, filters, onFiltersChange }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
      }}
    >
      {/* Navigation bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          py: 2,
          overflowX: 'hidden',
          overflowY: 'visible',
        }}
      >
        {/* Page Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: 'white',
            fontWeight: 800,
            fontSize: { xs: '1.5rem', md: '2rem' },
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

        {/* FilterBar + Hamburger Menu Container */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* FilterBar content - slides in by width change */}
          <Box
            sx={{
              width: menuOpen ? { xs: '250px', sm: '300px', md: '350px' } : '0px',
              opacity: menuOpen ? 1 : 0,
              transition: 'width 0.3s ease, opacity 0.3s ease',
              pointerEvents: menuOpen ? 'auto' : 'none',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ width: { xs: '250px', sm: '300px', md: '350px' } }}>
              <FilterBar
                events={events}
                filters={filters}
                onFiltersChange={onFiltersChange}
              />
            </Box>
          </Box>

          {/* Hamburger Menu Button - integrated into background */}
          <IconButton
            onClick={() => setMenuOpen(!menuOpen)}
            sx={{
              color: 'rgba(0, 0, 0, 0.7)',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
              transition: 'all 0.3s ease',
              flexShrink: 0,
              m: 0.5,
            }}
          >
            <MenuIcon
              sx={{
                transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

