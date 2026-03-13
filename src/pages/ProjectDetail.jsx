import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BlockRenderer from '../components/BlockRenderer';

const serifFont = '"Manrope", "Helvetica", "Arial", sans-serif';
const accentFont = '"Manrope", "Helvetica", "Arial", sans-serif';

function slugify(text) {
  return String(text).toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
}

function extractHeadings(blocks, markdownContent) {
  let mdContent = '';
  if (blocks?.length) {
    mdContent = blocks.filter(b => b.type === 'markdown').map(b => b.content).join('\n');
  } else {
    mdContent = markdownContent || '';
  }
  const headings = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(mdContent)) !== null) {
    headings.push({ level: match[1].length, text: match[2], id: slugify(match[2]) });
  }
  return headings;
}

export default function ProjectDetail({ data }) {
  const { slug } = useParams();
  const projects = data.projects || [];
  const project = projects.find((p) => p.slug === slug);
  const contentRef = useRef(null);
  const [tocOpen, setTocOpen] = useState(false);

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center', px: { xs: 2, md: 5 } }}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontFamily: serifFont }}>
          Project not found
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          The project you're looking for doesn't exist or has been removed.
        </Typography>
        <Button component={Link} to="/projects" variant="outlined" sx={{ color: '#111', borderColor: '#E0E0E0', minHeight: 48 }}>
          ← Back to Projects
        </Button>
      </Container>
    );
  }

  const headings = extractHeadings(project.blocks, project.markdownContent);
  const showToc = headings.length >= 2;

  const relatedProjects = project.relatedProjects?.length
    ? projects.filter((p) => project.relatedProjects.includes(p.slug))
    : [];

  // Determine action bar links
  const githubLink = project.links?.find((l) => l.label?.toLowerCase().includes('github'));
  const docsLink = project.links?.find((l) => l.label?.toLowerCase().includes('doc'));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 5 }, pb: { xs: 10, sm: 6 } }}>
        {/* Back navigation */}
        <Button
          component={Link}
          to="/projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, color: '#111', textTransform: 'none', minHeight: 44, display: { xs: 'none', sm: 'inline-flex' } }}
        >
          Back to Projects
        </Button>

        {/* Hero image */}
        {project.heroImage && (
          <Box
            component="img"
            src={project.heroImage}
            alt={project.title}
            sx={{
              width: '100%',
              maxHeight: { xs: 240, md: 400 },
              objectFit: 'cover',
              mb: 4,
              display: 'block',
            }}
          />
        )}

        {/* Header section */}
        <Box sx={{ mb: 4 }}>
          {project.category && (
            <Chip
              label={project.category}
              size="small"
              sx={{ mb: 1.5, bgcolor: '#000', color: '#FFF', borderRadius: 0, fontFamily: accentFont }}
            />
          )}
          <Typography variant="h3" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, fontFamily: serifFont }}>
            {project.title}
          </Typography>
          {project.subtitle && (
            <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.6 }}>
              {project.subtitle}
            </Typography>
          )}
          {project.date && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, fontWeight: 600, fontFamily: accentFont }}>
              {project.date}
            </Typography>
          )}
          {project.tags?.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 2 }}>
              {project.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: '#E0E0E0', color: '#111' }} />
              ))}
            </Box>
          )}
        </Box>

        {/* Research Paper metadata */}
        {project.category === 'Research Papers' && (
          <Box sx={{ mb: 4 }}>
            {project.abstract && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="overline" sx={{ color: '#555', letterSpacing: '0.1em', fontWeight: 500, fontFamily: accentFont }}>Abstract</Typography>
                <Typography variant="body1" sx={{ mt: 0.5, lineHeight: 1.8, color: '#111' }}>
                  {project.abstract}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
              {project.publication && (
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: accentFont }}>Publication</Typography>
                  <Typography variant="body2" fontWeight={600}>{project.publication}</Typography>
                </Box>
              )}
              {project.authors && (
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: accentFont }}>Authors</Typography>
                  <Typography variant="body2">{project.authors}</Typography>
                </Box>
              )}
              {project.year && (
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: accentFont }}>Year</Typography>
                  <Typography variant="body2">{project.year}</Typography>
                </Box>
              )}
            </Box>
            {project.keyFindings?.length > 0 && (
              <Box sx={{ mb: 3, p: 2, border: '1px solid #E0E0E0' }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, fontFamily: serifFont }}>Key Findings</Typography>
                <Box component="ul" sx={{ m: 0, pl: 3 }}>
                  {project.keyFindings.map((finding, i) => (
                    <Box component="li" key={i} sx={{ mb: 0.5 }}>
                      <Typography variant="body2">{finding}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {project.methodology && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, fontFamily: serifFont }}>Methodology</Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  {project.methodology}
                </Typography>
              </Box>
            )}
            {project.dataSources?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, fontFamily: serifFont }}>Data Sources</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.dataSources.map((ds, i) => (
                    <Button
                      key={i}
                      href={ds.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      variant="outlined"
                      sx={{ color: '#111', borderColor: '#E0E0E0', textTransform: 'none', minHeight: 36 }}
                    >
                      {ds.label}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}
            {project.pdfLink && (
              <Box sx={{ mb: 3 }}>
                <Button
                  href={project.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  startIcon={<PictureAsPdfIcon />}
                  sx={{ bgcolor: '#000', color: '#FFF', '&:hover': { bgcolor: '#000' }, minHeight: 48, textTransform: 'none', fontWeight: 600 }}
                >
                  Open PDF
                </Button>
                {project.doiLink && (
                  <Button
                    href={project.doiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                    sx={{ ml: 1, color: '#111', borderColor: '#E0E0E0', minHeight: 48, textTransform: 'none' }}
                  >
                    View DOI
                  </Button>
                )}
              </Box>
            )}
            {/* Citation block */}
            {project.citationText && (
              <Box sx={{ p: 2, border: '1px solid #E0E0E0', mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ fontFamily: serifFont }}>Citation</Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => navigator.clipboard.writeText(project.citationText)}
                    sx={{ color: '#111', textTransform: 'none', fontSize: '0.75rem' }}
                  >
                    Copy
                  </Button>
                </Box>
                <Typography variant="body2" sx={{ fontFamily: accentFont, fontSize: '0.8rem', color: '#111', lineHeight: 1.6 }}>
                  {project.citationText}
                </Typography>
                {project.bibtex && (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={600} sx={{ fontFamily: accentFont }}>BibTeX</Typography>
                      <Button
                        size="small"
                        startIcon={<ContentCopyIcon />}
                        onClick={() => navigator.clipboard.writeText(project.bibtex)}
                        sx={{ color: '#111', textTransform: 'none', fontSize: '0.7rem' }}
                      >
                        Copy
                      </Button>
                    </Box>
                    <Box sx={{ p: 1.5, bgcolor: '#FFF', border: '1px dashed #E0E0E0', fontFamily: accentFont, fontSize: '0.75rem', whiteSpace: 'pre-wrap', color: '#111' }}>
                      {project.bibtex}
                    </Box>
                  </Box>
                )}
              </Box>
            )}
            <Divider sx={{ mb: 0, borderColor: '#E0E0E0' }} />
          </Box>
        )}

        {/* Meta info row */}
        {(project.techStack?.length > 0 || project.links?.length > 0) && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                flexWrap: 'wrap',
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2,
                mb: 4,
              }}
            >
              {project.techStack?.length > 0 && (
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: accentFont }}>
                    Tech Stack
                  </Typography>
                  <Typography variant="body2">
                    {project.techStack.join(', ')}
                  </Typography>
                </Box>
              )}
              {project.links?.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.links.map((link, i) => (
                    <Button
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      variant="outlined"
                      sx={{ color: '#111', borderColor: '#E0E0E0', minHeight: 44 }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
            <Divider sx={{ mb: 4, borderColor: '#E0E0E0' }} />
          </>
        )}

        {/* Table of Contents */}
        {showToc && (
          <>
            {/* Desktop ToC */}
            <Box sx={{ display: { xs: 'none', sm: 'block' }, mb: 4 }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontFamily: serifFont }}>
                <FormatListBulleted fontSize="small" /> Table of Contents
              </Typography>
              <List dense disablePadding>
                {headings.map((h) => (
                  <ListItem key={h.id} disablePadding sx={{ pl: h.level === 3 ? 2 : 0 }}>
                    <ListItemButton
                      component="a"
                      href={`#${h.id}`}
                      sx={{ py: 0.25, borderRadius: 0 }}
                    >
                      <ListItemText
                        primary={h.text}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontSize: h.level === 3 ? '0.8rem' : '0.875rem',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Mobile ToC */}
            <Box sx={{ display: { xs: 'block', sm: 'none' }, mb: 4 }}>
              <Button
                onClick={() => setTocOpen((prev) => !prev)}
                startIcon={<FormatListBulleted />}
                endIcon={tocOpen ? <ExpandLess /> : <ExpandMore />}
                fullWidth
                sx={{
                  color: '#111',
                  borderColor: '#E0E0E0',
                  border: '1px solid #E0E0E0',
                  borderRadius: 0,
                  textTransform: 'none',
                  fontWeight: 600,
                  justifyContent: 'space-between',
                  minHeight: 44,
                }}
              >
                Table of Contents
              </Button>
              <Collapse in={tocOpen}>
                <Box sx={{ border: '1px solid #E0E0E0', borderTop: 0 }}>
                  <List dense disablePadding>
                    {headings.map((h) => (
                      <ListItem key={h.id} disablePadding sx={{ pl: h.level === 3 ? 2 : 0 }}>
                        <ListItemButton
                          component="a"
                          href={`#${h.id}`}
                          sx={{ py: 0.5, borderRadius: 0 }}
                          onClick={() => setTocOpen(false)}
                        >
                          <ListItemText
                            primary={h.text}
                            primaryTypographyProps={{
                              variant: 'body2',
                              fontSize: h.level === 3 ? '0.8rem' : '0.875rem',
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Collapse>
            </Box>
          </>
        )}

        {/* Main content */}
        <Box ref={contentRef} sx={{ mb: 4 }}>
          <BlockRenderer
            blocks={project.blocks}
            markdownContent={project.markdownContent}
            embeds={project.embeds}
            config={data.config}
          />
        </Box>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <>
            <Divider sx={{ mb: 4, borderColor: '#E0E0E0' }} />
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3, fontSize: { xs: '1.15rem', md: '1.5rem' }, fontFamily: serifFont }}>
              Related Projects
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {relatedProjects.map((rp) => (
                <Grid size={{ xs: 12, md: 6 }} key={rp.id}>
                  <Card
                    variant="outlined"
                    component={Link}
                    to={`/projects/${rp.slug}`}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      border: '1px solid #E0E0E0',
                      '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      {rp.category && (
                        <Typography variant="overline" sx={{ fontWeight: 700, fontFamily: accentFont }}>
                          {rp.category}
                        </Typography>
                      )}
                      <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, fontFamily: serifFont }}>
                        {rp.title}
                      </Typography>
                      {rp.description && (
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {rp.description}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
      </motion.div>

      {/* Sticky bottom action bar — mobile only */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: '#FFF',
          borderTop: '1px solid #E0E0E0',
          px: 2,
          py: 1.5,
          gap: 1,
          zIndex: 1200,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          component={Link}
          to="/projects"
          size="small"
          sx={{
            color: '#111',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.8rem',
            minHeight: 44,
            px: 1.5,
          }}
        >
          ← Projects
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {githubLink && (
            <Button
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              sx={{
                color: '#111',
                borderColor: '#E0E0E0',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                minHeight: 44,
                px: 1.5,
              }}
            >
              GitHub
            </Button>
          )}
          {docsLink && (
            <Button
              href={docsLink.url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              sx={{
                color: '#111',
                borderColor: '#E0E0E0',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                minHeight: 44,
                px: 1.5,
              }}
            >
              Docs
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
