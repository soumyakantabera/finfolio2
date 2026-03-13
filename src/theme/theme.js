import { createTheme } from '@mui/material/styles';

const headingFont = '"Manrope", "Helvetica", "Arial", sans-serif';
const bodyFont = '"Manrope", "Helvetica", "Arial", sans-serif';
const accentFont = '"Manrope", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0A0A0A' },
    secondary: { main: '#0A0A0A' },
    background: { default: '#e8eaf6', paper: 'rgba(255, 255, 255, 0.45)' },
    text: { primary: '#0A0A0A', secondary: '#525252' },
    divider: 'rgba(255, 255, 255, 0.35)',
  },
  typography: {
    fontFamily: bodyFont,
    h1: { fontFamily: headingFont, fontWeight: 800, letterSpacing: '-0.04em', fontSize: '2.75rem', lineHeight: 1.1, '@media (max-width:899.95px)': { fontSize: '2rem' } },
    h2: { fontFamily: headingFont, fontWeight: 700, letterSpacing: '-0.03em', fontSize: '2.25rem', lineHeight: 1.15, '@media (max-width:899.95px)': { fontSize: '1.75rem' } },
    h3: { fontFamily: headingFont, fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.75rem', lineHeight: 1.2, '@media (max-width:899.95px)': { fontSize: '1.5rem' } },
    h4: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.02em', fontSize: '1.5rem', lineHeight: 1.25, '@media (max-width:899.95px)': { fontSize: '1.25rem' } },
    h5: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.01em', fontSize: '1.25rem', lineHeight: 1.3 },
    h6: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.01em', fontSize: '1.1rem', lineHeight: 1.35 },
    subtitle1: { fontFamily: bodyFont, fontWeight: 500, lineHeight: 1.6 },
    subtitle2: { fontFamily: bodyFont, fontWeight: 500, lineHeight: 1.6 },
    body1: { fontFamily: bodyFont, fontWeight: 400, lineHeight: 1.75, fontSize: '0.95rem' },
    body2: { fontFamily: bodyFont, fontWeight: 400, lineHeight: 1.7, fontSize: '0.875rem' },
    caption: { fontFamily: accentFont, fontWeight: 400, fontSize: '0.75rem', color: '#525252' },
    overline: { fontFamily: accentFont, fontWeight: 500, letterSpacing: '0.1em', fontSize: '0.7rem' },
    button: { fontFamily: bodyFont, textTransform: 'none', fontWeight: 500, fontSize: '0.875rem' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          minHeight: 44,
          '&:focus-visible': { outline: '2px solid #0A0A0A', outlineOffset: '2px' },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.35)',
          color: '#0A0A0A',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)', borderColor: 'rgba(255, 255, 255, 0.5)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
            background: 'rgba(255, 255, 255, 0.6)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, borderColor: 'rgba(255, 255, 255, 0.35)', color: '#525252', fontSize: '0.8rem' },
        outlined: { borderColor: 'rgba(255, 255, 255, 0.35)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        },
        notchedOutline: { borderColor: 'rgba(255, 255, 255, 0.35)' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(255, 255, 255, 0.35)' },
      },
    },
  },
});

export default theme;
