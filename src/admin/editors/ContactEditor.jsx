import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Card,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

export default function ContactEditor({ data, onChange }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const socialLinks = data.socialLinks || [];

  const addLink = () => {
    update('socialLinks', [...socialLinks, { id: uuidv4(), platform: '', url: '' }]);
  };

  const updateLink = (id, key, value) => {
    update(
      'socialLinks',
      socialLinks.map((l) => (l.id === id ? { ...l, [key]: value } : l))
    );
  };

  const removeLink = (id) => {
    update(
      'socialLinks',
      socialLinks.filter((l) => l.id !== id)
    );
    setDeleteTarget(null);
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Contact</Typography>

      <TextField label="Email" fullWidth value={data.email || ''} onChange={(e) => update('email', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Phone" fullWidth value={data.phone || ''} onChange={(e) => update('phone', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Address" fullWidth value={data.address || ''} onChange={(e) => update('address', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="LinkedIn" fullWidth value={data.linkedin || ''} onChange={(e) => update('linkedin', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="GitHub" fullWidth value={data.github || ''} onChange={(e) => update('github', e.target.value)} sx={{ mb: 3 }} />

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Social Links</Typography>

      {socialLinks.map((link) => (
        <Card key={link.id} sx={{ p: 2, mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField label="Platform" size="small" value={link.platform || ''} onChange={(e) => updateLink(link.id, 'platform', e.target.value)} sx={{ flex: 1 }} />
          <TextField label="URL" size="small" value={link.url || ''} onChange={(e) => updateLink(link.id, 'url', e.target.value)} sx={{ flex: 1 }} />
          <IconButton color="error" onClick={() => setDeleteTarget(link.id)}><Delete /></IconButton>
        </Card>
      ))}

      <Button startIcon={<Add />} onClick={addLink}>Add Social Link</Button>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this social link?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" onClick={() => removeLink(deleteTarget)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
