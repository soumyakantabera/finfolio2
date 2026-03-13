import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const fontStack = '"Manrope", "Helvetica", "Arial", sans-serif';

const corePages = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'projects', label: 'Projects', path: '/projects' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'contact', label: 'Contact', path: '/contact' },
];

export default function Navbar({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const closeBtnRef = useRef(null);
  const openBtnRef = useRef(null);

  const visiblePages = data?.settings?.visiblePages || {};
  const customPages = data?.settings?.customPages || [];
  const siteTitle = data?.settings?.siteTitle || 'FinFolio';
  const about = data?.about || {};

  const navLinks = corePages.filter((p) => visiblePages[p.key] !== false);
  const customLinks = customPages.map((cp) => ({ label: cp.title, path: `/page/${cp.slug}` }));
  const allLinks = [
    ...navLinks,
    ...customLinks.map((cl, i) => ({ key: `custom-${i}`, ...cl })),
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) closeBtnRef.current?.focus();
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      openBtnRef.current?.focus();
      return;
    }
    if (e.key === 'Tab' && menuRef.current) {
      const focusable = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [menuOpen, handleKeyDown]);

  const socialLinks = [
    about.email && { href: `mailto:${about.email}`, icon: <EmailIcon sx={{ fontSize: 15 }} />, label: 'Email' },
    about.linkedin && { href: about.linkedin, icon: <LinkedInIcon sx={{ fontSize: 15 }} />, label: 'LinkedIn', external: true },
    about.github && { href: about.github, icon: <GitHubIcon sx={{ fontSize: 15 }} />, label: 'GitHub', external: true },
  ].filter(Boolean);

  return (
    <>
      {/* ── App Bar ── */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: scrolled ? 'rgba(250,250,250,0.94)' : '#FAFAFA',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          color: '#111',
          boxShadow: scrolled ? '0 1px 0 0 rgba(0,0,0,0.08)' : 'none',
          borderBottom: scrolled ? 'none' : '1px solid #EBEBEB',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: '20px', sm: '32px', md: '40px' },
            minHeight: { xs: 60, md: 70 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr auto', md: '1fr auto 1fr' },
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* ── Logo ── */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 800,
              color: '#0A0A0A',
              textDecoration: 'none',
              fontFamily: fontStack,
              fontSize: { xs: '1.15rem', md: '1.2rem' },
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            {siteTitle}
          </Typography>

          {/* ── Desktop center pill nav ── */}
          <Box
            component="nav"
            aria-label="Primary navigation"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: '3px',
              bgcolor: '#F0F0F0',
              borderRadius: '100px',
              p: '5px',
            }}
          >
            {allLinks.map((item) => (
              <Box
                key={item.key || item.path}
                component={Link}
                to={item.path}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: '16px',
                  py: '8px',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#fff' : '#555',
                  bgcolor: isActive(item.path) ? '#0A0A0A' : 'transparent',
                  fontFamily: fontStack,
                  fontWeight: isActive(item.path) ? 600 : 500,
                  fontSize: '0.875rem',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  transition: 'color 0.18s ease, background-color 0.18s ease',
                  '&:hover': {
                    color: isActive(item.path) ? '#fff' : '#0A0A0A',
                    bgcolor: isActive(item.path) ? '#0A0A0A' : '#E2E2E2',
                  },
                  '&:focus-visible': { outline: '2px solid #0A0A0A', outlineOffset: '3px' },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>

          {/* ── Desktop right CTA ── */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Box
              component={Link}
              to="/contact"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: '20px',
                py: '10px',
                bgcolor: '#0A0A0A',
                color: '#fff',
                borderRadius: '100px',
                textDecoration: 'none',
                fontFamily: fontStack,
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                transition: 'opacity 0.18s ease, transform 0.18s ease',
                '&:hover': { opacity: 0.75 },
                '&:focus-visible': { outline: '2px solid #0A0A0A', outlineOffset: '3px' },
              }}
            >
              Get in touch
            </Box>
          </Box>

          {/* ── Mobile hamburger (2-bar) ── */}
          <Box
            ref={openBtnRef}
            component="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: '5px',
              width: 44,
              height: 44,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '10px',
              px: '11px',
              boxSizing: 'border-box',
              transition: 'background-color 0.15s ease',
              '&:hover': { bgcolor: '#F0F0F0' },
              '&:focus-visible': { outline: '2px solid #0A0A0A', outlineOffset: '2px' },
            }}
          >
            <Box sx={{ width: 20, height: 1.5, bgcolor: '#0A0A0A', borderRadius: '2px' }} />
            <Box sx={{ width: 13, height: 1.5, bgcolor: '#0A0A0A', borderRadius: '2px' }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Full-screen dark overlay (mobile) ── */}
      <Box
        id="mobile-nav-overlay"
        ref={menuRef}
        role="dialog"
        aria-modal={menuOpen ? 'true' : undefined}
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        sx={{
          position: 'fixed',
          inset: 0,
          bgcolor: '#0A0A0A',
          zIndex: 1400,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.45s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Overlay header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: '20px',
            minHeight: 60,
            borderBottom: '1px solid rgba(255,255,255,0.09)',
            flexShrink: 0,
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            onClick={() => setMenuOpen(false)}
            sx={{
              fontWeight: 800,
              color: '#fff',
              textDecoration: 'none',
              fontFamily: fontStack,
              fontSize: '1.15rem',
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            {siteTitle}
          </Typography>

          {/* Close button */}
          <Box
            ref={closeBtnRef}
            component="button"
            onClick={() => { setMenuOpen(false); openBtnRef.current?.focus(); }}
            aria-label="Close navigation menu"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              bgcolor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '50%',
              cursor: 'pointer',
              color: '#fff',
              transition: 'background-color 0.15s ease',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' },
              '&:focus-visible': { outline: '2px solid rgba(255,255,255,0.6)', outlineOffset: '2px' },
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Box>
        </Box>

        {/* Nav links — large editorial type */}
        <Box
          component="nav"
          aria-label="Primary navigation"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { xs: '28px', sm: '48px' },
            py: '32px',
          }}
        >
          {allLinks.map((item, i) => (
            <Box
              key={item.key || item.path}
              component={Link}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '20px',
                py: { xs: '16px', sm: '18px' },
                borderBottom: i < allLinks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                textDecoration: 'none',
                color: isActive(item.path) ? '#fff' : 'rgba(255,255,255,0.3)',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(18px)',
                transition: `color 0.2s ease, opacity 0.45s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.07}s, transform 0.45s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.07}s`,
                '&:hover': { color: '#fff' },
                '&:focus-visible': {
                  outline: '2px solid rgba(255,255,255,0.4)',
                  outlineOffset: '4px',
                  borderRadius: '4px',
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: fontStack,
                  fontWeight: 400,
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.08em',
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: 20,
                  flexShrink: 0,
                  position: 'relative',
                  top: '-3px',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </Typography>
              <Typography
                sx={{
                  fontFamily: fontStack,
                  fontWeight: isActive(item.path) ? 700 : 400,
                  fontSize: 'clamp(2.2rem, 10vw, 4rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: 'inherit',
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Overlay footer */}
        <Box
          sx={{
            px: { xs: '28px', sm: '48px' },
            py: '24px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            gap: 2,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity 0.45s ease ${0.1 + allLinks.length * 0.07}s, transform 0.45s ease ${0.1 + allLinks.length * 0.07}s`,
          }}
        >
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.25)',
              fontFamily: fontStack,
              fontSize: '0.7rem',
              letterSpacing: '0.04em',
              fontWeight: 500,
            }}
          >
            &copy; {new Date().getFullYear()} {siteTitle}
          </Typography>

          {socialLinks.length > 0 && (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              {socialLinks.map((s) => (
                <Box
                  key={s.label}
                  component="a"
                  href={s.href}
                  aria-label={s.label}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease, border-color 0.15s ease',
                    '&:hover': { color: '#fff', borderColor: 'rgba(255,255,255,0.4)' },
                    '&:focus-visible': { outline: '2px solid rgba(255,255,255,0.5)', outlineOffset: '2px' },
                  }}
                >
                  {s.icon}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
