import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

export default function CustomPage({ data }) {
  const { slug } = useParams();
  const page = data.settings?.customPages?.find((p) => p.slug === slug);

  if (!page) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you're looking for doesn't exist.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        {page.title}
      </Typography>
      <Box sx={{ whiteSpace: 'pre-line' }}>
        <Typography variant="body1">{page.content}</Typography>
      </Box>
    </Container>
  );
}
