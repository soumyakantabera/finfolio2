import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { loadData, saveData } from './data/portfolioData';
import Navbar from './components/Navbar';
import './index.css';

// Lazy-load page components
const Home = React.lazy(() => import('./pages/Home'));
const Projects = React.lazy(() => import('./pages/Projects'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const CustomPage = React.lazy(() => import('./pages/CustomPage'));
const AdminLogin = React.lazy(() => import('./admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./admin/AdminDashboard'));

export default function App() {
  const [data, setData] = useState(() => loadData());
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem('finfolio_admin') === 'true'
  );

  useEffect(() => {
    sessionStorage.setItem('finfolio_admin', isAdmin);
  }, [isAdmin]);

  const handleDataUpdate = (newData) => {
    saveData(newData);
    setData(newData);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Navbar data={data} isAdmin={isAdmin} />
        <React.Suspense fallback={<div />}>
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/projects" element={<Projects data={data} />} />
            <Route path="/projects/:slug" element={<ProjectDetail data={data} />} />
            <Route path="/about" element={<About data={data} />} />
            <Route path="/contact" element={<Contact data={data} />} />
            <Route path="/admin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminDashboard
                  data={data}
                  setData={handleDataUpdate}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route path="/page/:slug" element={<CustomPage data={data} />} />
          </Routes>
        </React.Suspense>
      </HashRouter>
    </ThemeProvider>
  );
}
