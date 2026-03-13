import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { motion } from 'framer-motion';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CodeIcon from '@mui/icons-material/Code';
import TranslateIcon from '@mui/icons-material/Translate';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const fontStack = '"Manrope", "Helvetica", "Arial", sans-serif';

const TILE_ICONS = {
  name: PersonOutlineIcon,
  role: WorkOutlineIcon,
  course: SchoolOutlinedIcon,
  programming: CodeIcon,
  languages: TranslateIcon,
  location: LocationOnOutlinedIcon,
  availability: EventAvailableOutlinedIcon,
};

const tileVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

function BentoTile({ children, gridArea, index, sx = {} }) {
  return (
    <motion.div
      custom={index}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{
        scale: 1.02,
        rotateX: -2,
        rotateY: 2,
        boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        gridArea,
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      <Box
        sx={{
          height: '100%',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          borderRadius: 'var(--radius-lg)',
          bgcolor: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          p: { xs: 2, md: 2.5 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'background var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.6)',
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          ...sx,
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
}

export default function BentoSnapshot({ home, about, contact }) {
  const snapshotItems = [
    { key: 'name', label: 'Name', value: about?.name, area: 'name', featured: true },
    { key: 'role', label: 'Role', value: home?.snapshotRole || about?.introTitle, area: 'role', featured: true },
    {
      key: 'course',
      label: 'Last Course',
      value: about?.education?.[0]
        ? `${about.education[0].degree}, ${about.education[0].institution}`
        : undefined,
      area: 'course',
    },
    { key: 'programming', label: 'Programming', value: about?.programmingLanguages, area: 'prog' },
    { key: 'languages', label: 'Languages', value: about?.languagesKnown, area: 'lang' },
    { key: 'location', label: 'Location', value: home?.snapshotLocation || about?.address, area: 'loc' },
    { key: 'availability', label: 'Availability', value: home?.snapshotAvailability, area: 'avail' },
  ].filter((item) => item.value);

  const hasLinks = contact?.linkedin || contact?.github || contact?.email;

  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          color: 'var(--c-fg-secondary)',
          letterSpacing: '0.15em',
          mb: 2,
          display: 'block',
          fontWeight: 500,
          fontFamily: fontStack,
          fontSize: '0.85rem',
        }}
      >
        Snapshot
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gridTemplateAreas: {
            xs: `
              "name name"
              "role role"
              "course course"
              "prog lang"
              "loc avail"
              ${hasLinks ? '"links links"' : ''}
            `,
            md: `
              "name name role"
              "course course prog"
              "lang loc avail"
              ${hasLinks ? '"links links links"' : ''}
            `,
          },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {snapshotItems.map((item, i) => {
          const Icon = TILE_ICONS[item.key];
          return (
            <BentoTile key={item.key} gridArea={item.area} index={i}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
                {Icon && (
                  <Icon sx={{ fontSize: 13, color: 'var(--c-fg-muted)', flexShrink: 0 }} />
                )}
                <Typography
                  variant="caption"
                  sx={{
                    color: 'var(--c-fg-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                    fontFamily: fontStack,
                    fontSize: '0.6rem',
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
              <Typography
                variant={item.featured ? 'body1' : 'body2'}
                sx={{
                  fontWeight: item.featured ? 600 : 500,
                  color: 'var(--c-fg)',
                  lineHeight: 1.5,
                  fontSize: item.featured ? { xs: '0.95rem', md: '1.05rem' } : undefined,
                }}
              >
                {item.value}
              </Typography>
            </BentoTile>
          );
        })}

        {hasLinks && (
          <BentoTile gridArea="links" index={snapshotItems.length}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
              <EmailOutlinedIcon sx={{ fontSize: 13, color: 'var(--c-fg-muted)' }} />
              <Typography
                variant="caption"
                sx={{
                  color: 'var(--c-fg-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  fontFamily: fontStack,
                  fontSize: '0.6rem',
                  lineHeight: 1,
                }}
              >
                Connect
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              {contact?.email && (
                <IconButton
                  component="a"
                  href={`mailto:${contact.email}`}
                  aria-label="Email"
                  size="small"
                  sx={{
                    color: 'var(--c-fg)',
                    border: '1px solid var(--c-border)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    transition: 'background 0.15s, color 0.15s',
                    '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                  }}
                >
                  <EmailOutlinedIcon sx={{ fontSize: 17 }} />
                </IconButton>
              )}
              {contact?.linkedin && (
                <IconButton
                  component="a"
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  size="small"
                  sx={{
                    color: 'var(--c-fg)',
                    border: '1px solid var(--c-border)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    transition: 'background 0.15s, color 0.15s',
                    '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: 17 }} />
                </IconButton>
              )}
              {contact?.github && (
                <IconButton
                  component="a"
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  size="small"
                  sx={{
                    color: 'var(--c-fg)',
                    border: '1px solid var(--c-border)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    transition: 'background 0.15s, color 0.15s',
                    '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: 17 }} />
                </IconButton>
              )}
            </Box>
          </BentoTile>
        )}
      </Box>
    </Box>
  );
}
