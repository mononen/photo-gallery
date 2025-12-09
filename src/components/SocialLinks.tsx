'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

interface SocialLinksProps {
  facebookUrl?: string;
  instagramUrl?: string;
}

export default function SocialLinks({
  facebookUrl = 'https://facebook.com',
  instagramUrl = 'https://instagram.com',
}: SocialLinksProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Tooltip title="Facebook" placement="right" arrow>
        <IconButton
          component="a"
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            width: 44,
            height: 44,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: 'rgba(66, 103, 178, 0.9)',
              color: 'white',
              transform: 'translateY(-2px) scale(1.05)',
              boxShadow: '0 8px 25px rgba(66, 103, 178, 0.4)',
              border: '1px solid rgba(66, 103, 178, 0.5)',
            },
          }}
        >
          <FacebookIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Instagram" placement="right" arrow>
        <IconButton
          component="a"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            width: 44,
            height: 44,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: 'white',
              transform: 'translateY(-2px) scale(1.05)',
              boxShadow: '0 8px 25px rgba(225, 48, 108, 0.4)',
              border: '1px solid rgba(225, 48, 108, 0.5)',
            },
          }}
        >
          <InstagramIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

