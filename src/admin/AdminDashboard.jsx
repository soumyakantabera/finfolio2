import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Save, Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

import HomeEditor from './editors/HomeEditor';
import AboutEditor from './editors/AboutEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import ContactEditor from './editors/ContactEditor';
import SettingsEditor from './editors/SettingsEditor';
import QuotesEditor from './editors/QuotesEditor';

const SECTIONS = ['Home', 'About', 'Projects', 'Contact', 'Quotes', 'Settings'];
const DRAWER_WIDTH = 220;

export default function AdminDashboard({ data, setData, isAdmin }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeSection, setActiveSection] = useState('Home');
  const [localData, setLocalData] = useState(data);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });

  useEffect(() => {
    if (!isAdmin) navigate('/admin');
  }, [isAdmin, navigate]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  if (!isAdmin) return null;

  const handleSave = () => {
    try {
      setData(localData);
      setSnackbar({ open: true, severity: 'success', message: 'Changes saved successfully!' });
    } catch {
      setSnackbar({ open: true, severity: 'error', message: 'Failed to save changes.' });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('finfolio_admin');
    navigate('/admin');
    // Force reload to reset admin state
    window.location.reload();
  };

  const updateSection = (key, value) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
  };

  const renderEditor = () => {
    switch (activeSection) {
      case 'Home':
        return <HomeEditor data={localData.home || {}} onChange={(v) => updateSection('home', v)} />;
      case 'About':
        return <AboutEditor data={localData.about || {}} onChange={(v) => updateSection('about', v)} />;
      case 'Projects':
        return <ProjectsEditor data={localData.projects || []} onChange={(v) => updateSection('projects', v)} config={localData.config || {}} onConfigChange={(v) => updateSection('config', v)} />;
      case 'Contact':
        return <ContactEditor data={localData.contact || {}} onChange={(v) => updateSection('contact', v)} />;
      case 'Quotes':
        return <QuotesEditor data={localData.quotes || []} onChange={(v) => updateSection('quotes', v)} />;
      case 'Settings':
        return <SettingsEditor data={localData.settings || {}} onChange={(v) => updateSection('settings', v)} />;
      default:
        return null;
    }
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>
        Admin Panel
      </Typography>
      <Divider />
      <List sx={{ flex: 1 }}>
        {SECTIONS.map((section) => (
          <ListItem key={section} disablePadding>
            <ListItemButton
              selected={activeSection === section}
              onClick={() => {
                setActiveSection(section);
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemText primary={section} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 1 }}>
        <Button
          startIcon={<Logout />}
          fullWidth
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, position: 'relative' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {isMobile && (
          <Box sx={{ p: 1 }}>
            <IconButton onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        <Box sx={{ flex: 1, p: 3, pb: 10, overflow: 'auto' }}>
          {renderEditor()}
        </Box>

        {/* Fixed bottom save bar */}
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
            p: 2,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
