'use client';

import { Box, ImageList, ImageListItem } from '@mui/material';
import Image from 'next/image';
import { Event } from '@/types/event';

interface ThumbnailGalleryProps {
  thumbnails: Event['thumbnails'];
  backgroundImage?: boolean;
}

export default function ThumbnailGallery({
  thumbnails,
  backgroundImage = false,
}: ThumbnailGalleryProps) {
  if (thumbnails.length === 0) {
    return null;
  }

  if (backgroundImage && thumbnails.length > 0) {
    // Use first thumbnail as background
    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: 200,
          backgroundImage: `url(${thumbnails[0].url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
            backdropFilter: 'blur(2px)',
          },
        }}
      />
    );
  }

  return (
    <ImageList
      cols={thumbnails.length > 1 ? 2 : 1}
      gap={8}
      sx={{
        m: 0,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {thumbnails.map((thumbnail, index) => (
        <ImageListItem key={index} sx={{ position: 'relative' }}>
          <Image
            src={thumbnail.url}
            alt={`Thumbnail ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

