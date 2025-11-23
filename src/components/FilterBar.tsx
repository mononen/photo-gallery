'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  Stack,
  IconButton,
  Collapse,
  Chip,
  InputAdornment,
} from '@mui/material';
import { Search, FilterList, Close } from '@mui/icons-material';
import { Event } from '@/types/event';
import { FilterOptions, SortOrder, getEventTypes, getYears } from '@/lib/filters';

interface FilterBarProps {
  events: Event[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function FilterBar({
  events,
  filters,
  onFiltersChange,
}: FilterBarProps) {
  const [expanded, setExpanded] = useState(true);
  const eventTypes = getEventTypes(events);
  const years = getYears(events);

  const handleEventTypeChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      eventType: event.target.value || undefined,
    });
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    onFiltersChange({
      ...filters,
      year: event.target.value ? Number(event.target.value) : undefined,
    });
  };

  const handleSortChange = (event: SelectChangeEvent<SortOrder>) => {
    onFiltersChange({
      ...filters,
      sortOrder: event.target.value as SortOrder,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: event.target.value || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({ sortOrder: 'newest' });
  };

  const hasActiveFilters = filters.eventType || filters.year || filters.searchQuery;
  const activeFilterCount = [filters.eventType, filters.year, filters.searchQuery].filter(Boolean).length;

  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
        {/* Compact search bar */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ p: 1.5 }}
        >
          <TextField
            fullWidth
            variant="standard"
            placeholder="Search events..."
            value={filters.searchQuery || ''}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'rgba(0,0,0,0.4)' }} />
                </InputAdornment>
              ),
              disableUnderline: true,
              sx: {
                fontSize: '0.95rem',
                '& input': {
                  py: 0.5,
                },
              },
            }}
            sx={{ flexGrow: 1 }}
          />

          {hasActiveFilters && (
            <Chip
              label={activeFilterCount}
              size="small"
              color="primary"
              sx={{ 
                height: 24, 
                minWidth: 24,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          )}

          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{
              color: expanded ? 'primary.main' : 'rgba(0,0,0,0.5)',
              transition: 'all 0.2s',
            }}
          >
            <FilterList />
          </IconButton>

          {hasActiveFilters && (
            <IconButton
              size="small"
              onClick={clearFilters}
              sx={{ color: 'rgba(0,0,0,0.5)' }}
            >
              <Close fontSize="small" />
            </IconButton>
          )}
        </Stack>

        {/* Expandable filters */}
        <Collapse in={expanded}>
          <Box sx={{ px: 2, pb: 2, pt: 0 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 1 }}
            >
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select
                  value={filters.eventType || ''}
                  onChange={handleEventTypeChange}
                  displayEmpty
                  variant="standard"
                  disableUnderline
                  sx={{
                    fontSize: '0.9rem',
                    '& .MuiSelect-select': {
                      py: 0.5,
                      color: filters.eventType ? 'text.primary' : 'rgba(0,0,0,0.5)',
                    },
                  }}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {eventTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={filters.year || ''}
                  onChange={handleYearChange}
                  displayEmpty
                  variant="standard"
                  disableUnderline
                  sx={{
                    fontSize: '0.9rem',
                    '& .MuiSelect-select': {
                      py: 0.5,
                      color: filters.year ? 'text.primary' : 'rgba(0,0,0,0.5)',
                    },
                  }}
                >
                  <MenuItem value="">All Years</MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <Select
                  value={filters.sortOrder || 'newest'}
                  onChange={handleSortChange}
                  variant="standard"
                  disableUnderline
                  sx={{
                    fontSize: '0.9rem',
                    '& .MuiSelect-select': {
                      py: 0.5,
                    },
                  }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </Collapse>
    </Box>
  );
}

