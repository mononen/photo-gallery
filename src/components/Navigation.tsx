'use client';

import { useState } from 'react';
import { Box, Typography, IconButton, Slide } from '@mui/material';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
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
    <>
      {/* Navigation bar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          py: 2,
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

        {/* Hamburger Menu */}
        <IconButton
          onClick={() => setMenuOpen(!menuOpen)}
          sx={{
            color: 'white',
            backgroundColor: menuOpen ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {menuOpen ? <Close /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Side Panel with Filters */}
      <Slide direction="left" in={menuOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            top: 80,
            right: { xs: 16, sm: 24 },
            zIndex: 350,
            width: { xs: 'calc(100% - 32px)', sm: '400px', md: '450px' },
          }}
        >
          <FilterBar
            events={events}
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </Box>
      </Slide>

      {/* Backdrop overlay for mobile */}
      {menuOpen && (
        <Box
          onClick={() => setMenuOpen(false)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 340,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: { xs: 'block', sm: 'none' },
          }}
        />
      )}
    </>
  );
}

