import { createTheme } from '@mui/material/styles';

const headingFont = '"Manrope", "Helvetica", "Arial", sans-serif';
const bodyFont = '"Manrope", "Helvetica", "Arial", sans-serif';
const accentFont = '"Manrope", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0A0A0A' },
    secondary: { main: '#0A0A0A' },
    background: { default: '#FAFAFA', paper: '#FFFFFF' },
    text: { primary: '#0A0A0A', secondary: '#525252' },
    divider: '#EBEBEB',
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
  shape: { borderRadius: 8 },
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
          borderColor: '#EBEBEB',
          color: '#0A0A0A',
          '&:hover': { backgroundColor: '#F5F5F5', borderColor: '#D4D4D4' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'none',
          border: '1px solid #EBEBEB',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            borderColor: '#D4D4D4',
            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, borderColor: '#EBEBEB', color: '#525252', fontSize: '0.8rem' },
        outlined: { borderColor: '#EBEBEB' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: 'none' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8 },
        notchedOutline: { borderColor: '#EBEBEB' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.12)' },
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
        root: { borderColor: '#EBEBEB' },
      },
    },
  },
});

export default theme;
