'use client';

import { useState } from 'react';
import { Box, Typography, IconButton, Collapse, Container } from '@mui/material';
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
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Dropdown Menu with Filters */}
      <Collapse in={menuOpen}>
        <Box
          sx={{
            px: { xs: 2, md: 4 },
            pb: 2,
          }}
        >
          <FilterBar
            events={events}
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </Box>
      </Collapse>
    </Box>
  );
}

