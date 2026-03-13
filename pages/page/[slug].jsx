import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../../src/components/Navbar';
import { defaultData, loadData } from '../../src/data/portfolioData';

export default function CustomPage({ initialData }) {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(initialData || defaultData);

  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
  }, []);

  if (router.isFallback) {
    return null;
  }

  const page = data.settings?.customPages?.find((p) => p.slug === slug);

  return (
    <>
      <Head>
        <title>{page ? `${page.title} | FinFolio` : 'Page Not Found | FinFolio'}</title>
      </Head>
      <Navbar data={data} />
      {!page ? (
        <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The page you&apos;re looking for doesn&apos;t exist.
          </Typography>
        </Container>
      ) : (
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            {page.title}
          </Typography>
          <Box sx={{ whiteSpace: 'pre-line' }}>
            <Typography variant="body1">{page.content}</Typography>
          </Box>
        </Container>
      )}
    </>
  );
}

export function getStaticPaths() {
  const pages = defaultData.settings?.customPages || [];
  const paths = pages.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export function getStaticProps() {
  return { props: { initialData: defaultData } };
}
