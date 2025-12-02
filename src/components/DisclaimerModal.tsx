'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

export default function DisclaimerModal() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Check if user has already accepted the disclaimer
    const hasAccepted = localStorage.getItem('disclaimerAccepted');
    if (!hasAccepted) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,245,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          pt: 4,
          pb: 2,
          px: { xs: 3, sm: 4 },
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <InfoOutlined
          sx={{
            fontSize: { xs: 28, sm: 32 },
            color: 'primary.main',
          }}
        />
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h2"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '-0.02em',
          }}
        >
          Photo Usage Terms
        </Typography>
      </DialogTitle>
      
      <DialogContent
        sx={{
          px: { xs: 3, sm: 4 },
          pb: 3,
        }}
      >
        <Box sx={{ mb: 2.5 }}>
          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            sx={{
              color: 'text.primary',
              lineHeight: 1.7,
              mb: 2,
            }}
          >
            Before viewing and accessing the photos in this gallery, please read and accept the following terms:
          </Typography>
          
          <Box
            component="ul"
            sx={{
              pl: 2.5,
              mb: 2,
              '& li': {
                mb: 1.5,
                color: 'text.primary',
              },
            }}
          >
            <li>
              <Typography
                variant={isMobile ? 'body2' : 'body1'}
                sx={{ lineHeight: 1.7 }}
              >
                <strong>Personal Use Only:</strong> These photos are provided solely for your personal viewing and enjoyment. Any use, reproduction, distribution, or exploitation beyond personal use is strictly prohibited without the prior written consent of the photographer.
              </Typography>
            </li>
            <li>
              <Typography
                variant={isMobile ? 'body2' : 'body1'}
                sx={{ lineHeight: 1.7 }}
              >
                <strong>No AI Training:</strong> You may not use these photos to train, fine-tune, or develop any artificial intelligence models, machine learning systems, or automated image recognition systems.
              </Typography>
            </li>
            <li>
              <Typography
                variant={isMobile ? 'body2' : 'body1'}
                sx={{ lineHeight: 1.7 }}
              >
                <strong>Attribution Required:</strong> If you share or post these photos elsewhere, you must provide proper credit to the photographer.
              </Typography>
            </li>
          </Box>

          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              lineHeight: 1.7,
            }}
          >
            By clicking "I Accept the Terms" below, you acknowledge that you have read and agree to abide by these terms.
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions
        sx={{
          px: { xs: 3, sm: 4 },
          pb: { xs: 3, sm: 4 },
          pt: 2,
        }}
      >
        <Button
          onClick={handleAccept}
          variant="contained"
          size={isMobile ? 'medium' : 'large'}
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: 600,
            fontSize: isMobile ? '1rem' : '1.1rem',
            textTransform: 'none',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 30px rgba(25, 118, 210, 0.4)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          I Accept the Terms
        </Button>
      </DialogActions>
    </Dialog>
  );
}
