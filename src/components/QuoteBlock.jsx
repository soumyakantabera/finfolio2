import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function QuoteBlock({ quotes, mode = 'featured' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayQuotes = mode === 'featured'
    ? (quotes || []).filter((q) => q.featured)
    : (quotes || []).sort((a, b) => (a.order || 0) - (b.order || 0));

  useEffect(() => {
    if (mode === 'rotating' && displayQuotes.length > 1) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % displayQuotes.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [mode, displayQuotes.length]);

  if (displayQuotes.length === 0) return null;

  const quote = mode === 'rotating' ? displayQuotes[activeIndex] : displayQuotes[0];
  if (!quote) return null;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      sx={{
        py: { xs: 4, md: 6 },
        borderTop: '1px solid #E0E0E0',
        borderBottom: '1px solid #E0E0E0',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        component="blockquote"
        sx={{
          fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          fontStyle: 'normal',
          letterSpacing: '-0.01em',
          lineHeight: 1.4,
          maxWidth: 700,
          mx: 'auto',
          px: { xs: 1, sm: 2 },
          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' },
          color: '#111',
          '&::before': { content: '"\\201C"', display: 'block', fontSize: { xs: '3rem', md: '5rem' }, fontWeight: 900, lineHeight: 1, color: '#DDD', mb: 1 },
        }}
      >
        {quote.text}
      </Typography>
      {quote.attribution && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 2,
            color: '#555',
            fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          — {quote.attribution}
        </Typography>
      )}
      {mode === 'rotating' && displayQuotes.length > 1 && (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 3 }}>
          {displayQuotes.map((_, i) => (
            <Box
              key={i}
              onClick={() => setActiveIndex(i)}
              sx={{
                width: 8,
                height: 8,
                bgcolor: i === activeIndex ? '#000' : '#FFFFFF',
                border: '1px solid #E0E0E0',
                cursor: 'pointer',
                transition: 'none',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
