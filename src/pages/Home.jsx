import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import QuoteBlock from '../components/QuoteBlock';
import BentoSnapshot from '../components/BentoSnapshot';
import { motion } from 'framer-motion';

const serifFont = '"Manrope", "Helvetica", "Arial", sans-serif';
const accentFont = '"Manrope", "Helvetica", "Arial", sans-serif';

function getStatIcon(label = '') {
  const l = label.toLowerCase();
  if (l.includes('certif')) return <VerifiedOutlinedIcon sx={{ fontSize: 20, color: '#555', mb: 1 }} />;
  if (l.includes('paper') || l.includes('research') || l.includes('report')) return <ArticleOutlinedIcon sx={{ fontSize: 20, color: '#555', mb: 1 }} />;
  if (l.includes('model') || l.includes('chart') || l.includes('analysis')) return <BarChartIcon sx={{ fontSize: 20, color: '#555', mb: 1 }} />;
  if (l.includes('project') || l.includes('work')) return <FolderOutlinedIcon sx={{ fontSize: 20, color: '#555', mb: 1 }} />;
  return <TrendingUpIcon sx={{ fontSize: 20, color: '#555', mb: 1 }} />;
}

/* ── Staggered entrance animation for cards ── */
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function HomePage({ data }) {
  const navigate = useNavigate();
  const { home, projects, about, contact, quotes } = data;
  const allProjects = (projects || []).filter((p) => p.status !== 'draft');
  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <Box>
      {/* ── 01 / Hero ── */}
      <motion.div {...reveal}>
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 14 }, px: { xs: 2, md: 5 } }}>
            <Grid container spacing={{ xs: 2, md: 3 }} alignItems="flex-start">
              {/* Left: headline */}
              <Grid size={{ xs: 12, md: 7 }} sx={{ borderRight: { md: '1px solid rgba(255, 255, 255, 0.35)' }, pr: { md: 4 } }}>
                <Typography
                  variant="overline"
                  sx={{ color: '#555', letterSpacing: '0.15em', mb: { xs: 1.5, md: 2 }, display: 'block', fontWeight: 500, fontFamily: accentFont, fontSize: { xs: '0.85rem', md: '1rem' } }}
                >
                  01 / Introduction
                </Typography>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontFamily: serifFont,
                    fontWeight: 700,
                    fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    whiteSpace: 'pre-line',
                    mb: 2,
                    color: '#111',
                  }}
                >
                  {home.heroTitle}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#111',
                    fontWeight: 400,
                    mb: 3,
                    maxWidth: 500,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    lineHeight: 1.6,
                  }}
                >
                  {home.heroSubtitle}
                </Typography>
                {home.introText && (
                  <Typography variant="body1" sx={{ color: '#111', maxWidth: 500, mb: 4, lineHeight: 1.7 }}>
                    {home.introText}
                  </Typography>
                )}
                {home.ctaButtons?.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flexDirection: { xs: 'column', md: 'row' } }}>
                    {home.ctaButtons.map((btn, i) => (
                      <Button
                        key={btn.id || i}
                        component={RouterLink}
                        to={btn.link}
                        variant={i === 0 ? 'contained' : 'outlined'}
                        size="large"
                        endIcon={i === 0 ? <ArrowForwardIcon /> : <ArrowOutwardIcon />}
                        sx={{
                          bgcolor: i === 0 ? '#000' : 'transparent',
                          color: i === 0 ? '#FFF' : '#111',
                          borderColor: 'rgba(255, 255, 255, 0.35)',
                          borderRadius: '100px',
                          boxShadow: 'none',
                          minHeight: 48,
                          px: { xs: 3, md: 4 },
                          width: { xs: '100%', md: 'auto' },
                          '&:hover': {
                            bgcolor: '#000',
                            color: '#FFF',
                            borderColor: '#000',
                            boxShadow: 'none',
                          },
                        }}
                      >
                        {btn.label}
                      </Button>
                    ))}
                  </Box>
                )}
              </Grid>

              {/* Right: Bento Grid snapshot */}
              <Grid size={{ xs: 12, md: 5 }}>
                <BentoSnapshot home={home} about={about} contact={contact} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </motion.div>

      {/* ── 02 / Key Metrics ── */}
      {home.stats?.length > 0 && (
        <motion.div {...reveal}>
          <Box>
            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
              <Grid container spacing={0}>
                {home.stats.map((stat, i) => (
                  <Grid
                    size={{ xs: 6, md: 3 }}
                    key={stat.id || i}
                    sx={{
                      textAlign: 'center',
                      py: 3,
                      borderRight: i < home.stats.length - 1 ? { md: '1px solid rgba(255, 255, 255, 0.35)' } : 'none',
                      borderBottom: {
                        xs: i < home.stats.length - 2 ? '1px solid rgba(255, 255, 255, 0.35)' : 'none',
                        md: 'none',
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {getStatIcon(stat.label)}
                    <Typography
                      variant="h3"
                      className="tabular-nums"
                      sx={{
                        fontFamily: serifFont,
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', md: '2.25rem' },
                        color: '#111',
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, fontSize: { xs: '0.6rem', md: '0.7rem' }, fontFamily: accentFont, mt: 0.5 }}
                    >
                      {stat.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </motion.div>
      )}

      {/* ── 03 / Featured Work ── */}
      {allProjects.length > 0 && (
        <motion.div {...reveal}>
          <Box>
            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: { xs: 3, md: 6 }, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 500, fontFamily: accentFont, fontSize: { xs: '0.85rem', md: '1rem' } }}
                  >
                    03 / Work
                  </Typography>
                  <Typography variant="h4" fontWeight={600} sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, fontFamily: serifFont, color: '#111' }}>
                    Featured Work
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {allProjects.slice(0, 6).map((project, idx) => (
                  <Grid size={{ xs: 12, md: 4 }} key={project.id}>
                    <motion.div
                      custom={idx}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      whileHover={{
                        scale: 1.02,
                        rotateX: -2,
                        rotateY: 2,
                        boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                      style={{ height: '100%', perspective: 1200, transformStyle: 'preserve-3d' }}
                    >
                      <Box
                        onClick={(e) => {
                          if (e.target.closest('a')) return;
                          navigate(`/projects/${project.slug}`);
                        }}
                        className="frame-shift"
                        sx={{
                          display: 'block',
                          textDecoration: 'none',
                          color: 'inherit',
                          cursor: 'pointer',
                          border: '1px solid rgba(255, 255, 255, 0.35)',
                          borderRadius: 'var(--radius-lg)',
                          p: { xs: 2.5, md: 4 },
                          height: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                          bgcolor: 'rgba(255, 255, 255, 0.45)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                          transition: 'background var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base)',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.6)',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                          },
                          '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                        }}
                      >
                        <Typography
                          variant="overline"
                          sx={{ color: 'var(--c-fg-secondary)', display: 'block', mb: 1, fontWeight: 500, fontFamily: accentFont }}
                        >
                          {project.category}
                        </Typography>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.15rem', md: '1.5rem' }, fontFamily: serifFont, color: 'var(--c-fg)' }}>
                          {project.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: 'var(--c-fg)' }}>
                          {project.description}
                        </Typography>
                        {project.tags?.length > 0 && (
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                            {project.tags.map((tag) => (
                              <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: 'var(--c-border)', color: 'var(--c-fg-secondary)', fontFamily: accentFont, borderRadius: 'var(--radius-sm)' }} />
                            ))}
                          </Box>
                        )}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            pt: 2,
                            borderTop: '1px solid var(--c-border)',
                          }}
                        >
                          {project.date && (
                            <Typography variant="caption" sx={{ color: 'var(--c-fg-secondary)', fontFamily: accentFont }}>
                              {project.date}
                            </Typography>
                          )}
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            {project.links?.[0]?.url && project.links[0].label && (
                              <Box
                                component="a"
                                href={project.links[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  bgcolor: 'transparent',
                                  color: '#555',
                                  fontWeight: 500,
                                  fontSize: '0.7rem',
                                  fontFamily: accentFont,
                                  px: 1.5,
                                  py: 0.4,
                                  borderRadius: '100px',
                                  border: '1px solid rgba(255, 255, 255, 0.35)',
                                  textDecoration: 'none',
                                  '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                                }}
                              >
                                {project.links[0].label}
                              </Box>
                            )}
                            <Box
                              component="span"
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                bgcolor: '#000',
                                color: '#FFF',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                fontFamily: accentFont,
                                px: 1.75,
                                py: 0.4,
                                borderRadius: '100px',
                              }}
                            >
                              Details <ArrowForwardIcon sx={{ fontSize: 11 }} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Button
                  component={RouterLink}
                  to="/projects"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: '#000', color: '#FFF', fontWeight: 600, minHeight: 48, borderRadius: '100px', boxShadow: 'none', px: 4, '&:hover': { bgcolor: '#222', boxShadow: 'none' } }}
                >
                  View all projects
                </Button>
              </Box>
            </Container>
          </Box>
        </motion.div>
      )}

      {/* ── 04 / Featured Quote ── */}
      {quotes?.length > 0 && (
        <motion.div {...reveal}>
          <Container maxWidth="lg" sx={{ px: { xs: 2, md: 5 } }}>
            <QuoteBlock quotes={quotes} mode="featured" />
          </Container>
        </motion.div>
      )}

      {/* ── 05 / Highlights ── */}
      {featuredProjects.length > 0 && (
        <motion.div {...reveal}>
          <Box>
            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
              <Typography
                variant="overline"
                sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 500, fontFamily: accentFont, fontSize: { xs: '0.85rem', md: '1rem' } }}
              >
                05 / Highlights
              </Typography>
              <Typography variant="h4" fontWeight={600} sx={{ mb: { xs: 3, md: 5 }, fontSize: { xs: '1.5rem', md: '2.5rem' }, fontFamily: serifFont, color: '#111' }}>
                Notable Work
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {featuredProjects.slice(0, 4).map((project, i) => (
                  <Grid size={{ xs: 12, md: 6 }} key={project.id}>
                    <motion.div
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      whileHover={{
                        scale: 1.02,
                        rotateX: -2,
                        rotateY: 2,
                        boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                      style={{ height: '100%', perspective: 1200, transformStyle: 'preserve-3d' }}
                    >
                      <Box
                        onClick={(e) => {
                          if (e.target.closest('a')) return;
                          navigate(`/projects/${project.slug}`);
                        }}
                        sx={{
                          display: 'block',
                          textDecoration: 'none',
                          color: 'inherit',
                          cursor: 'pointer',
                          border: '1px solid rgba(255, 255, 255, 0.35)',
                          borderRadius: 'var(--radius-lg)',
                          p: { xs: 2.5, md: 4 },
                          height: '100%',
                          bgcolor: 'rgba(255, 255, 255, 0.45)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                          transition: 'background var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base)',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.6)',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                          },
                          '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                        }}
                      >
                        <Typography variant="body1" fontWeight={700} sx={{ color: '#111', fontSize: { xs: '1.15rem', md: '1.35rem' }, fontFamily: serifFont, mb: 1 }}>
                          {project.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6, mb: 2 }}>
                          {project.subtitle || project.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid var(--c-border)' }}>
                          {project.date && (
                            <Typography variant="caption" sx={{ color: 'var(--c-fg-secondary)', fontFamily: accentFont }}>
                              {project.date}
                            </Typography>
                          )}
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            {project.links?.[0]?.url && project.links[0].label && (
                              <Box
                                component="a"
                                href={project.links[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  bgcolor: 'transparent',
                                  color: '#555',
                                  fontWeight: 500,
                                  fontSize: '0.7rem',
                                  fontFamily: accentFont,
                                  px: 1.5,
                                  py: 0.4,
                                  borderRadius: '100px',
                                  border: '1px solid rgba(255, 255, 255, 0.35)',
                                  textDecoration: 'none',
                                  '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                                }}
                              >
                                {project.links[0].label}
                              </Box>
                            )}
                            <Box
                              component="span"
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                bgcolor: '#000',
                                color: '#FFF',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                fontFamily: accentFont,
                                px: 1.75,
                                py: 0.4,
                                borderRadius: '100px',
                              }}
                            >
                              Details <ArrowForwardIcon sx={{ fontSize: 11 }} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </motion.div>
      )}

      {/* ── 06 / Custom Sections ── */}
      {home.customSections?.length > 0 && (
        <motion.div {...reveal}>
          <Box>
            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
              {home.customSections.map((section, i) => (
                <Box key={section.id || i} sx={{ mb: i < home.customSections.length - 1 ? 6 : 0 }}>
                  <Typography variant="h4" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, fontFamily: serifFont, color: '#111' }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line', maxWidth: 700, lineHeight: 1.7, color: '#111' }}>
                    {section.content}
                  </Typography>
                </Box>
              ))}
            </Container>
          </Box>
        </motion.div>
      )}

      {/* ── 07 / CTA Footer ── */}
      <motion.div {...reveal}>
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 14 }, px: { xs: 2, md: 5 }, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 1, fontWeight: 500, fontFamily: accentFont, fontSize: { xs: '0.85rem', md: '1rem' } }}
            >
              Get in touch
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontFamily: serifFont, fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '3.5rem' }, color: '#111' }}
            >
              Let&apos;s connect.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 500, mx: 'auto', lineHeight: 1.7, color: '#111' }}>
              Interested in working together, discussing markets, or just saying hello? I&apos;d love to hear from you.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'center' }, flexWrap: 'wrap', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'stretch', md: 'center' } }}>
              {contact?.email && (
                <Button
                  href={`mailto:${contact.email}`}
                  variant="contained"
                  size="large"
                  startIcon={<EmailIcon />}
                  sx={{ bgcolor: '#000', color: '#FFF', borderRadius: '8px', boxShadow: 'none', minHeight: 48, px: { xs: 3, md: 4 }, width: { xs: '100%', md: 'auto' }, '&:hover': { bgcolor: '#222', boxShadow: 'none' } }}
                >
                  Email me
                </Button>
              )}
              <Button
                component={RouterLink}
                to="/contact"
                variant="outlined"
                size="large"
                endIcon={<ArrowOutwardIcon />}
                sx={{ color: '#111', borderColor: 'rgba(255, 255, 255, 0.35)', borderRadius: '8px', boxShadow: 'none', minHeight: 48, px: { xs: 3, md: 4 }, width: { xs: '100%', md: 'auto' }, '&:hover': { borderColor: '#000', bgcolor: '#000', color: '#FFF', boxShadow: 'none' } }}
              >
                Contact page
              </Button>
            </Box>
          </Container>
        </Box>
      </motion.div>
    </Box>
  );
}
