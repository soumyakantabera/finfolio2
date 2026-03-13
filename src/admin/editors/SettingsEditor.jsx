import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Card,
  Divider,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

const PAGE_KEYS = ['home', 'projects', 'about', 'contact'];

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function SettingsEditor({ data, onChange }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const togglePage = (key) => {
    const vis = { ...(data.visiblePages || {}) };
    vis[key] = !vis[key];
    update('visiblePages', vis);
  };

  const customPages = data.customPages || [];

  const addPage = () => {
    update('customPages', [
      ...customPages,
      { id: uuidv4(), title: '', slug: '', content: '' },
    ]);
  };

  const updatePage = (id, key, value) => {
    update(
      'customPages',
      customPages.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, [key]: value };
        if (key === 'title') updated.slug = toSlug(value);
        return updated;
      })
    );
  };

  const removePage = (id) => {
    update(
      'customPages',
      customPages.filter((p) => p.id !== id)
    );
    setDeleteTarget(null);
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Settings</Typography>

      <TextField
        label="Site Title"
        fullWidth
        value={data.siteTitle || ''}
        onChange={(e) => update('siteTitle', e.target.value)}
        sx={{ mb: 3 }}
      />

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Page Visibility</Typography>
      {PAGE_KEYS.map((key) => (
        <Box key={key} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ textTransform: 'capitalize' }}>{key}</Typography>
          <Switch checked={!!(data.visiblePages || {})[key]} onChange={() => togglePage(key)} />
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Custom Pages</Typography>
      {customPages.map((page) => (
        <Card key={page.id} sx={{ p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField label="Title" size="small" value={page.title || ''} onChange={(e) => updatePage(page.id, 'title', e.target.value)} sx={{ flex: 1 }} />
            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
              /{page.slug || '...'}
            </Typography>
            <IconButton color="error" onClick={() => setDeleteTarget(page.id)}><Delete /></IconButton>
          </Box>
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={3}
            size="small"
            value={page.content || ''}
            onChange={(e) => updatePage(page.id, 'content', e.target.value)}
            sx={{ mt: 1 }}
          />
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={addPage}>Add Custom Page</Button>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this custom page?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" onClick={() => removePage(deleteTarget)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
