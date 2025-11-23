'use client';

import { Button } from '@mui/material';
import { PhotoLibrary } from '@mui/icons-material';
import Link from 'next/link';

interface GooglePhotosLinkProps {
  name: string;
  url: string;
}

export default function GooglePhotosLink({ name, url }: GooglePhotosLinkProps) {
  return (
    <Button
      component={Link}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      startIcon={<PhotoLibrary />}
      sx={{
        textTransform: 'none',
        borderRadius: 2,
      }}
    >
      {name}
    </Button>
  );
}

