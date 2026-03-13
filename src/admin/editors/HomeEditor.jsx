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
import { Add, Delete, Edit } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

export default function HomeEditor({ data, onChange }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const addItem = (field, template) => {
    update(field, [...(data[field] || []), { id: uuidv4(), ...template }]);
  };

  const updateItem = (field, id, key, value) => {
    update(
      field,
      (data[field] || []).map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const removeItem = (field, id) => {
    update(
      field,
      (data[field] || []).filter((item) => item.id !== id)
    );
    setDeleteTarget(null);
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Home Page</Typography>

      <TextField
        label="Hero Title"
        fullWidth
        value={data.heroTitle || ''}
        onChange={(e) => update('heroTitle', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Hero Subtitle"
        fullWidth
        value={data.heroSubtitle || ''}
        onChange={(e) => update('heroSubtitle', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Intro Text"
        fullWidth
        multiline
        rows={3}
        value={data.introText || ''}
        onChange={(e) => update('introText', e.target.value)}
        sx={{ mb: 3 }}
      />

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Snapshot Panel
      </Typography>
      <TextField
        label="Location"
        fullWidth
        value={data.snapshotLocation || ''}
        onChange={(e) => update('snapshotLocation', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Role"
        fullWidth
        value={data.snapshotRole || ''}
        onChange={(e) => update('snapshotRole', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Availability"
        fullWidth
        value={data.snapshotAvailability || ''}
        onChange={(e) => update('snapshotAvailability', e.target.value)}
        sx={{ mb: 3 }}
      />

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        CTA Buttons
      </Typography>
      {(data.ctaButtons || []).map((btn) => (
        <Card key={btn.id} sx={{ p: 2, mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label="Label"
            size="small"
            value={btn.label || ''}
            onChange={(e) => updateItem('ctaButtons', btn.id, 'label', e.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Link"
            size="small"
            value={btn.link || ''}
            onChange={(e) => updateItem('ctaButtons', btn.id, 'link', e.target.value)}
            sx={{ flex: 1 }}
          />
          <IconButton color="error" onClick={() => setDeleteTarget({ field: 'ctaButtons', id: btn.id })}>
            <Delete />
          </IconButton>
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('ctaButtons', { label: '', link: '' })} sx={{ mb: 3 }}>
        Add Button
      </Button>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Stats
      </Typography>
      {(data.stats || []).map((stat) => (
        <Card key={stat.id} sx={{ p: 2, mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label="Label"
            size="small"
            value={stat.label || ''}
            onChange={(e) => updateItem('stats', stat.id, 'label', e.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Value"
            size="small"
            value={stat.value || ''}
            onChange={(e) => updateItem('stats', stat.id, 'value', e.target.value)}
            sx={{ flex: 1 }}
          />
          <IconButton color="error" onClick={() => setDeleteTarget({ field: 'stats', id: stat.id })}>
            <Delete />
          </IconButton>
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('stats', { label: '', value: '' })} sx={{ mb: 3 }}>
        Add Stat
      </Button>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Custom Sections
      </Typography>
      {(data.customSections || []).map((sec) => (
        <Card key={sec.id} sx={{ p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              label="Title"
              size="small"
              value={sec.title || ''}
              onChange={(e) => updateItem('customSections', sec.id, 'title', e.target.value)}
              sx={{ flex: 1 }}
            />
            <IconButton color="error" onClick={() => setDeleteTarget({ field: 'customSections', id: sec.id })}>
              <Delete />
            </IconButton>
          </Box>
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={2}
            size="small"
            value={sec.content || ''}
            onChange={(e) => updateItem('customSections', sec.id, 'content', e.target.value)}
            sx={{ mt: 1 }}
          />
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('customSections', { title: '', content: '' })}>
        Add Section
      </Button>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this item?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" onClick={() => removeItem(deleteTarget.field, deleteTarget.id)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
