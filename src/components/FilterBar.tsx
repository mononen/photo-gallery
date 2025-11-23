'use client';

import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Stack,
  Paper,
} from '@mui/material';
import { Search } from '@mui/icons-material';
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

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={filters.searchQuery || ''}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ flexGrow: 1 }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Event Type</InputLabel>
          <Select
            value={filters.eventType || ''}
            onChange={handleEventTypeChange}
            label="Event Type"
          >
            <MenuItem value="">All Types</MenuItem>
            {eventTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={filters.year || ''}
            onChange={handleYearChange}
            label="Year"
          >
            <MenuItem value="">All Years</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={filters.sortOrder || 'newest'}
            onChange={handleSortChange}
            label="Sort"
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}

