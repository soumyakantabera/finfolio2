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
  Select,
  MenuItem,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function AboutEditor({ data, onChange }) {
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

  const updateCert = (id, key, value) => {
    const updates = { [key]: value };
    if (key === 'title') updates.name = value;
    if (key === 'date') updates.year = value;
    update('certifications', (data.certifications || []).map(c => c.id === id ? { ...c, ...updates } : c));
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
      <Typography variant="h6" mb={2}>About</Typography>

      <TextField label="Name" fullWidth value={data.name || ''} onChange={(e) => update('name', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Gender" fullWidth value={data.gender || ''} onChange={(e) => update('gender', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Address" fullWidth value={data.address || ''} onChange={(e) => update('address', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Profile Photo URL" fullWidth value={data.profilePhoto || ''} onChange={(e) => update('profilePhoto', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Intro Title" fullWidth value={data.introTitle || ''} onChange={(e) => update('introTitle', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Intro Description" fullWidth multiline rows={3} value={data.introDescription || ''} onChange={(e) => update('introDescription', e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Bio" fullWidth multiline rows={4} value={data.bio || ''} onChange={(e) => update('bio', e.target.value)} sx={{ mb: 3 }} />

      {/* Education */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Education</Typography>
      {(data.education || []).map((edu) => (
        <Card key={edu.id} sx={{ p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Institution" size="small" value={edu.institution || ''} onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Degree" size="small" value={edu.degree || ''} onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Year" size="small" value={edu.year || ''} onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)} sx={{ width: 100 }} />
            <IconButton color="error" onClick={() => setDeleteTarget({ field: 'education', id: edu.id })}><Delete /></IconButton>
          </Box>
          <TextField label="Details" fullWidth size="small" value={edu.details || ''} onChange={(e) => updateItem('education', edu.id, 'details', e.target.value)} sx={{ mt: 1 }} />
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('education', { institution: '', degree: '', year: '', details: '' })} sx={{ mb: 3 }}>Add Education</Button>

      {/* Experience */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Experience</Typography>
      {(data.experience || []).map((exp) => (
        <Card key={exp.id} sx={{ p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Company" size="small" value={exp.company || ''} onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Role" size="small" value={exp.role || ''} onChange={(e) => updateItem('experience', exp.id, 'role', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Period" size="small" value={exp.period || ''} onChange={(e) => updateItem('experience', exp.id, 'period', e.target.value)} sx={{ width: 160 }} />
            <IconButton color="error" onClick={() => setDeleteTarget({ field: 'experience', id: exp.id })}><Delete /></IconButton>
          </Box>
          <TextField label="Description" fullWidth size="small" multiline rows={2} value={exp.description || ''} onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)} sx={{ mt: 1 }} />
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('experience', { company: '', role: '', period: '', description: '' })} sx={{ mb: 3 }}>Add Experience</Button>

      {/* Skills */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Skills</Typography>
      {(data.skills || []).map((skill) => (
        <Card key={skill.id} sx={{ p: 2, mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField label="Skill Name" size="small" value={skill.name || ''} onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)} sx={{ flex: 1 }} />
          <Select size="small" value={skill.level || 'Intermediate'} onChange={(e) => updateItem('skills', skill.id, 'level', e.target.value)} sx={{ minWidth: 140 }}>
            {SKILL_LEVELS.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
          </Select>
          <IconButton color="error" onClick={() => setDeleteTarget({ field: 'skills', id: skill.id })}><Delete /></IconButton>
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('skills', { name: '', level: 'Intermediate' })} sx={{ mb: 3 }}>Add Skill</Button>

      {/* Certifications */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Certifications</Typography>
      {(data.certifications || []).map((cert) => (
        <Card key={cert.id} sx={{ p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Title" size="small" value={cert.title || cert.name || ''} onChange={(e) => updateCert(cert.id, 'title', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Issuer" size="small" value={cert.issuer || ''} onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Date" size="small" value={cert.date || cert.year || ''} onChange={(e) => updateCert(cert.id, 'date', e.target.value)} sx={{ width: 120 }} />
            <IconButton color="error" onClick={() => setDeleteTarget({ field: 'certifications', id: cert.id })}><Delete /></IconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            <TextField label="Credential ID" size="small" value={cert.credentialId || ''} onChange={(e) => updateCert(cert.id, 'credentialId', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Link" size="small" value={cert.link || ''} onChange={(e) => updateCert(cert.id, 'link', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            <Select size="small" value={cert.mediaType || ''} onChange={(e) => updateCert(cert.id, 'mediaType', e.target.value)} displayEmpty sx={{ minWidth: 120 }}>
              <MenuItem value="">No Media</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="image">Image</MenuItem>
            </Select>
            <TextField label="Media URL" size="small" value={cert.mediaUrl || ''} onChange={(e) => updateCert(cert.id, 'mediaUrl', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Thumbnail URL" size="small" value={cert.thumbnail || ''} onChange={(e) => updateCert(cert.id, 'thumbnail', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
          </Box>
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('certifications', { title: '', name: '', issuer: '', date: '', year: '', credentialId: '', link: '', mediaType: '', mediaUrl: '', thumbnail: '' })} sx={{ mb: 3 }}>Add Certification</Button>

      {/* Achievements */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Achievements</Typography>
      {(data.achievements || []).map((ach) => (
        <Card key={ach.id} sx={{ p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Title" size="small" value={ach.title || ''} onChange={(e) => updateItem('achievements', ach.id, 'title', e.target.value)} sx={{ flex: 1, minWidth: 150 }} />
            <TextField label="Year" size="small" value={ach.year || ''} onChange={(e) => updateItem('achievements', ach.id, 'year', e.target.value)} sx={{ width: 100 }} />
            <IconButton color="error" onClick={() => setDeleteTarget({ field: 'achievements', id: ach.id })}><Delete /></IconButton>
          </Box>
          <TextField label="Description" fullWidth size="small" value={ach.description || ''} onChange={(e) => updateItem('achievements', ach.id, 'description', e.target.value)} sx={{ mt: 1 }} />
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('achievements', { title: '', description: '', year: '' })} sx={{ mb: 3 }}>Add Achievement</Button>

      {/* Metrics/Stats */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Metrics / Stats</Typography>
      {(data.metrics || []).map((metric) => (
        <Card key={metric.id} sx={{ p: 2, mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField label="Label" size="small" value={metric.label || ''} onChange={(e) => updateItem('metrics', metric.id, 'label', e.target.value)} sx={{ flex: 1 }} />
          <TextField label="Value" size="small" value={metric.value || ''} onChange={(e) => updateItem('metrics', metric.id, 'value', e.target.value)} sx={{ flex: 1 }} />
          <IconButton color="error" onClick={() => setDeleteTarget({ field: 'metrics', id: metric.id })}><Delete /></IconButton>
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('metrics', { label: '', value: '' })} sx={{ mb: 3 }}>Add Metric</Button>

      {/* Contact Quick Links */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Contact Quick Links</Typography>
      {(data.contactLinks || []).map((link) => (
        <Card key={link.id} sx={{ p: 2, mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField label="Platform" size="small" value={link.platform || ''} onChange={(e) => updateItem('contactLinks', link.id, 'platform', e.target.value)} sx={{ flex: 1 }} />
          <TextField label="URL" size="small" value={link.url || ''} onChange={(e) => updateItem('contactLinks', link.id, 'url', e.target.value)} sx={{ flex: 1 }} />
          <IconButton color="error" onClick={() => setDeleteTarget({ field: 'contactLinks', id: link.id })}><Delete /></IconButton>
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('contactLinks', { platform: '', url: '' })} sx={{ mb: 3 }}>Add Contact Link</Button>

      {/* Additional Sections */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Additional Sections</Typography>
      {(data.additionalSections || []).map((sec) => (
        <Card key={sec.id} sx={{ p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField label="Title" size="small" value={sec.title || ''} onChange={(e) => updateItem('additionalSections', sec.id, 'title', e.target.value)} sx={{ flex: 1 }} />
            <IconButton color="error" onClick={() => setDeleteTarget({ field: 'additionalSections', id: sec.id })}><Delete /></IconButton>
          </Box>
          <TextField label="Content" fullWidth multiline rows={2} size="small" value={sec.content || ''} onChange={(e) => updateItem('additionalSections', sec.id, 'content', e.target.value)} sx={{ mt: 1 }} />
        </Card>
      ))}
      <Button startIcon={<Add />} onClick={() => addItem('additionalSections', { title: '', content: '' })}>Add Section</Button>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this item?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" onClick={() => removeItem(deleteTarget.field, deleteTarget.id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
