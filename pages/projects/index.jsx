import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Typography, Chip, Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from '../../src/components/Navbar';
import { defaultData, loadData } from '../../src/data/portfolioData';

const serifFont = '"Manrope", "Helvetica", "Arial", sans-serif';
const accentFont = '"Manrope", "Helvetica", "Arial", sans-serif';

export default function ProjectsPage({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
  }, []);

  const projects = (data.projects || []).filter((p) => p.status !== 'draft');
  const [activeTab, setActiveTab] = useState('All');

  const categories = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category).filter(Boolean))];
    return ['All', ...cats];
  }, [projects]);

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter((p) => p.category === activeTab);

  const isResearchTab = activeTab === 'Research Papers';

  return (
    <>
      <Head><title>Projects | FinFolio</title></Head>
      <Navbar data={data} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
          {/* Section numbering */}
          <Typography
            sx={{
              fontFamily: accentFont,
              fontSize: { xs: '0.85rem', md: '1rem' },
              color: '#555',
              letterSpacing: '0.1em',
              mb: 1,
            }}
          >
            01 / Gallery
          </Typography>

          {/* Page title */}
          <Typography
            variant="h2"
            sx={{
              fontFamily: serifFont,
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '4.5rem' },
              color: '#111',
              mb: { xs: 3, md: 4 },
              lineHeight: 1.1,
            }}
          >
            Projects
          </Typography>

          {/* Filter tabs */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              mb: { xs: 3, md: 5 },
              borderBottom: '1px solid #E0E0E0',
              pb: 2,
            }}
          >
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setActiveTab(cat)}
                sx={{
                  fontFamily: accentFont,
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: activeTab === cat ? '#FFF' : '#111',
                  bgcolor: activeTab === cat ? '#000' : 'transparent',
                  border: activeTab === cat ? '1px solid #000' : '1px solid #E0E0E0',
                  borderRadius: '8px',
                  px: 2,
                  py: 0.75,
                  minHeight: 36,
                  '&:hover': {
                    bgcolor: '#000',
                    color: '#FFF',
                  },
                }}
              >
                {cat}
              </Button>
            ))}
          </Box>

          {/* Project grid */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {filteredProjects.map((project, index) => (
              <Grid size={{ xs: 12, md: isResearchTab ? 6 : 4 }} key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.06 }}
                  whileHover={{
                    scale: 1.02,
                    rotateX: -2,
                    rotateY: 2,
                    boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: '100%', perspective: 1200, transformStyle: 'preserve-3d' }}
                >
                  <Box
                    sx={{
                      border: '1px solid #E0E0E0',
                      borderRadius: 'var(--radius-lg)',
                      p: { xs: 2.5, md: 3 },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'var(--c-surface)',
                      transition: 'background var(--transition-base), border-color var(--transition-base)',
                      '&:hover': {
                        bgcolor: 'var(--c-surface-hover)',
                        borderColor: 'var(--c-fg-muted)',
                      },
                      '&:focus-within': { outline: '2px solid #000', outlineOffset: '2px' },
                    }}
                  >
                    {/* Category */}
                    {project.category && (
                      <Typography
                        sx={{
                          fontFamily: accentFont,
                          fontSize: '0.7rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#555',
                          fontWeight: 500,
                          mb: 1,
                        }}
                      >
                        {project.category}
                        {project.featured && ' · Featured'}
                      </Typography>
                    )}

                    {/* Title */}
                    <Typography
                      sx={{
                        fontFamily: serifFont,
                        fontWeight: 700,
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        lineHeight: 1.2,
                        color: '#111',
                        mb: 1,
                      }}
                    >
                      {project.title}
                    </Typography>

                    {/* Description */}
                    {(project.description || project.subtitle) && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#111',
                          lineHeight: 1.6,
                          mb: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {project.description || project.subtitle}
                      </Typography>
                    )}

                    {/* Research paper metadata */}
                    {project.category === 'Research Papers' && (
                      <Box sx={{ mb: 1.5 }}>
                        {project.publication && (
                          <Typography
                            sx={{
                              fontFamily: accentFont,
                              fontSize: '0.75rem',
                              fontStyle: 'italic',
                              color: '#555',
                            }}
                          >
                            {project.publication}{project.year ? ` (${project.year})` : ''}
                          </Typography>
                        )}
                        {project.authors && (
                          <Typography
                            sx={{
                              fontFamily: accentFont,
                              fontSize: '0.75rem',
                              color: '#555',
                            }}
                          >
                            {project.authors}
                          </Typography>
                        )}
                      </Box>
                    )}

                    {/* Tags */}
                    {project.tags?.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                        {project.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontFamily: accentFont,
                              fontSize: '0.65rem',
                              borderColor: '#E0E0E0',
                              color: '#555',
                              borderRadius: '999px',
                              height: 22,
                            }}
                          />
                        ))}
                      </Box>
                    )}

                    {/* Footer: date + actions */}
                    <Box
                      sx={{
                        mt: 'auto',
                        pt: 2,
                        borderTop: '1px solid #E0E0E0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}
                    >
                      {(project.date || project.year) && (
                        <Typography
                          variant="caption"
                          sx={{ color: '#555', fontFamily: accentFont, fontWeight: 600 }}
                        >
                          {project.date || project.year}
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {/* DOI button for research papers */}
                        {project.category === 'Research Papers' && project.doiLink && (
                          <Button
                            href={project.doiLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            variant="outlined"
                            sx={{
                              color: '#111',
                              borderColor: '#E0E0E0',
                              borderRadius: '8px',
                              fontSize: '0.7rem',
                              fontFamily: accentFont,
                              textTransform: 'none',
                              py: 0.25,
                              px: 1.5,
                              minHeight: 28,
                              '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                            }}
                          >
                            DOI
                          </Button>
                        )}
                        {project.links?.[0]?.url && project.links[0].label && (
                          <Button
                            href={project.links[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            variant="outlined"
                            sx={{
                              color: '#111',
                              borderColor: '#E0E0E0',
                              borderRadius: '8px',
                              fontSize: '0.7rem',
                              fontFamily: accentFont,
                              textTransform: 'none',
                              py: 0.25,
                              px: 1.5,
                              minHeight: 28,
                              '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                            }}
                          >
                            {project.links[0].label}
                          </Button>
                        )}
                        <Button
                          component={Link}
                          href={`/projects/${project.slug}`}
                          size="small"
                          variant="contained"
                          sx={{
                            bgcolor: '#000',
                            color: '#FFF',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            fontFamily: accentFont,
                            textTransform: 'none',
                            minHeight: 28,
                            px: 1.5,
                            borderRadius: '8px',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#222', boxShadow: 'none' },
                          }}
                        >
                          Details →
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {filteredProjects.length === 0 && (
            <Typography
              sx={{
                mt: 4,
                textAlign: 'center',
                fontFamily: accentFont,
                color: '#111',
              }}
            >
              No projects found.
            </Typography>
          )}
        </Container>
      </motion.div>
    </>
  );
}

export function getStaticProps() {
  return { props: { initialData: defaultData } };
}
