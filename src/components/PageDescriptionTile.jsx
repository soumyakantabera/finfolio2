import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const accentFont = '"Manrope", "Helvetica", "Arial", sans-serif';

export default function PageDescriptionTile({ description }) {
  if (!description) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Box
        sx={{
          border: '1px solid rgba(255, 255, 255, 0.35)',
          borderRadius: 'var(--radius)',
          bgcolor: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          px: { xs: 2.5, md: 3 },
          py: { xs: 1.5, md: 2 },
          mb: { xs: 3, md: 5 },
          maxWidth: 720,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#555',
            lineHeight: 1.7,
            fontFamily: accentFont,
            fontSize: { xs: '0.85rem', md: '0.9rem' },
          }}
        >
          {description}
        </Typography>
      </Box>
    </motion.div>
  );
}
