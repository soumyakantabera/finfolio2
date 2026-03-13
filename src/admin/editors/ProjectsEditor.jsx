import React, { useState, useRef } from 'react';
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
  Switch,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Collapse,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add, Delete, ArrowUpward, ArrowDownward, Preview, Upload, ContentCopy } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import EmbedBlock from '../../components/EmbedBlock';

const EMBED_TYPES = ['none', 'pdf', 'gdocs', 'gsheets', 'github', 'chart'];
const EMBED_ITEM_TYPES = ['youtube', 'pdf', 'gdocs', 'gsheets', 'msoffice', 'image', 'audio', 'figma', 'code', 'gist', 'iframe', 'chart', 'file'];
const BLOCK_TYPES = ['markdown', 'embed', 'attachments', 'callout', 'divider', 'gallery'];
const CALLOUT_VARIANTS = ['insight', 'assumption', 'risk', 'result', 'takeaway'];
const EMBED_BLOCK_TYPES = ['youtube', 'pdf', 'gdocs', 'gsheets', 'msoffice', 'image', 'audio', 'figma', 'code', 'gist', 'iframe', 'chart', 'file'];
const STATUS_OPTIONS = ['published', 'draft'];

const generateSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const emptyProject = () => ({
  id: uuidv4(),
  title: '',
  slug: '',
  subtitle: '',
  description: '',
  category: '',
  tags: [],
  techStack: [],
  links: [],
  embedType: '',
  embedUrl: '',
  thumbnail: '',
  heroImage: '',
  date: '',
  featured: false,
  status: 'draft',
  markdownContent: '',
  embeds: [],
  blocks: [],
  relatedProjects: [],
  publication: '',
  authors: '',
  year: '',
  doiLink: '',
  pdfLink: '',
  citationText: '',
  bibtex: '',
  abstract: '',
  keyFindings: [],
  methodology: '',
  dataSources: [],
});

const newBlock = (type) => {
  const base = { id: uuidv4(), type };
  switch (type) {
    case 'markdown': return { ...base, content: '' };
    case 'embed': return { ...base, embedType: 'youtube', src: '', title: '', caption: '', aspectRatio: '16/9', startTime: '', allowFullscreen: true };
    case 'attachments': return { ...base, files: [] };
    case 'callout': return { ...base, variant: 'insight', title: '', content: '' };
    case 'divider': return base;
    case 'gallery': return { ...base, images: [] };
    default: return base;
  }
};

const blockSummary = (block) => {
  switch (block.type) {
    case 'markdown': return (block.content || '').slice(0, 60) || '(empty)';
    case 'embed': return `${block.embedType || 'youtube'}: ${block.title || block.src || '(empty)'}`;
    case 'attachments': return `${(block.files || []).length} file(s)`;
    case 'callout': return `${block.variant || 'insight'}: ${block.title || '(empty)'}`;
    case 'divider': return '—';
    case 'gallery': return `${(block.images || []).length} image(s)`;
    default: return block.type;
  }
};

// --- Block editors ---
function MarkdownBlockEditor({ block, onChange }) {
  return <TextField fullWidth size="small" multiline rows={6} placeholder="Markdown content..." value={block.content || ''} onChange={(e) => onChange({ ...block, content: e.target.value })} />;
}

function EmbedBlockEditor({ block, onChange, uploads }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Embed Type</InputLabel>
          <Select label="Embed Type" value={block.embedType || 'youtube'} onChange={(e) => onChange({ ...block, embedType: e.target.value })}>
            {EMBED_BLOCK_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="Source URL" size="small" fullWidth value={block.src || ''} onChange={(e) => onChange({ ...block, src: e.target.value })} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField label="Title" size="small" fullWidth value={block.title || ''} onChange={(e) => onChange({ ...block, title: e.target.value })} />
        <TextField label="Caption" size="small" fullWidth value={block.caption || ''} onChange={(e) => onChange({ ...block, caption: e.target.value })} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField label="Aspect Ratio" size="small" value={block.aspectRatio || ''} onChange={(e) => onChange({ ...block, aspectRatio: e.target.value })} sx={{ width: 120 }} />
        <TextField label="Start Time (s)" size="small" value={block.startTime || ''} onChange={(e) => onChange({ ...block, startTime: e.target.value })} sx={{ width: 120 }} />
        <Typography variant="body2" sx={{ ml: 1 }}>Fullscreen</Typography>
        <Switch size="small" checked={block.allowFullscreen !== false} onChange={(e) => onChange({ ...block, allowFullscreen: e.target.checked })} />
      </Box>
      {uploads && uploads.length > 0 && (
        <FormControl size="small" sx={{ maxWidth: 300 }}>
          <InputLabel>Pick from Assets</InputLabel>
          <Select label="Pick from Assets" value="" onChange={(e) => onChange({ ...block, src: e.target.value })}>
            {uploads.map((a, i) => <MenuItem key={i} value={a.dataUrl}>{a.name}</MenuItem>)}
          </Select>
        </FormControl>
      )}
    </Box>
  );
}

function AttachmentsBlockEditor({ block, onChange }) {
  const files = block.files || [];
  const addFile = () => onChange({ ...block, files: [...files, { id: uuidv4(), name: '', url: '', fileType: '', size: '' }] });
  const updateFile = (id, key, val) => onChange({ ...block, files: files.map((f) => f.id === id ? { ...f, [key]: val } : f) });
  const removeFile = (id) => onChange({ ...block, files: files.filter((f) => f.id !== id) });
  return (
    <Box>
      {files.map((f) => (
        <Box key={f.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
          <TextField label="Name" size="small" value={f.name || ''} onChange={(e) => updateFile(f.id, 'name', e.target.value)} sx={{ flex: 1 }} />
          <TextField label="URL" size="small" value={f.url || ''} onChange={(e) => updateFile(f.id, 'url', e.target.value)} sx={{ flex: 2 }} />
          <TextField label="Type" size="small" value={f.fileType || ''} onChange={(e) => updateFile(f.id, 'fileType', e.target.value)} sx={{ width: 80 }} />
          <TextField label="Size" size="small" value={f.size || ''} onChange={(e) => updateFile(f.id, 'size', e.target.value)} sx={{ width: 80 }} />
          <IconButton size="small" color="error" onClick={() => removeFile(f.id)}><Delete fontSize="small" /></IconButton>
        </Box>
      ))}
      <Button size="small" startIcon={<Add />} onClick={addFile}>Add File</Button>
    </Box>
  );
}

function CalloutBlockEditor({ block, onChange }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Variant</InputLabel>
          <Select label="Variant" value={block.variant || 'insight'} onChange={(e) => onChange({ ...block, variant: e.target.value })}>
            {CALLOUT_VARIANTS.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="Title" size="small" fullWidth value={block.title || ''} onChange={(e) => onChange({ ...block, title: e.target.value })} />
      </Box>
      <TextField fullWidth size="small" multiline rows={3} placeholder="Callout content..." value={block.content || ''} onChange={(e) => onChange({ ...block, content: e.target.value })} />
    </Box>
  );
}

function GalleryBlockEditor({ block, onChange }) {
  const images = block.images || [];
  const addImage = () => onChange({ ...block, images: [...images, { id: uuidv4(), src: '', alt: '', caption: '' }] });
  const updateImage = (id, key, val) => onChange({ ...block, images: images.map((img) => img.id === id ? { ...img, [key]: val } : img) });
  const removeImage = (id) => onChange({ ...block, images: images.filter((img) => img.id !== id) });
  return (
    <Box>
      {images.map((img) => (
        <Box key={img.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
          <TextField label="Src" size="small" value={img.src || ''} onChange={(e) => updateImage(img.id, 'src', e.target.value)} sx={{ flex: 2 }} />
          <TextField label="Alt" size="small" value={img.alt || ''} onChange={(e) => updateImage(img.id, 'alt', e.target.value)} sx={{ flex: 1 }} />
          <TextField label="Caption" size="small" value={img.caption || ''} onChange={(e) => updateImage(img.id, 'caption', e.target.value)} sx={{ flex: 1 }} />
          <IconButton size="small" color="error" onClick={() => removeImage(img.id)}><Delete fontSize="small" /></IconButton>
        </Box>
      ))}
      <Button size="small" startIcon={<Add />} onClick={addImage}>Add Image</Button>
    </Box>
  );
}

function BlockEditor({ block, onChange, uploads }) {
  switch (block.type) {
    case 'markdown': return <MarkdownBlockEditor block={block} onChange={onChange} />;
    case 'embed': return <EmbedBlockEditor block={block} onChange={onChange} uploads={uploads} />;
    case 'attachments': return <AttachmentsBlockEditor block={block} onChange={onChange} />;
    case 'callout': return <CalloutBlockEditor block={block} onChange={onChange} />;
    case 'divider': return <Typography variant="body2" color="text.secondary">Divider — no configuration needed.</Typography>;
    case 'gallery': return <GalleryBlockEditor block={block} onChange={onChange} />;
    default: return null;
  }
}

export default function ProjectsEditor({ data, onChange, config, onConfigChange }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [embedPreview, setEmbedPreview] = useState(null); // embed id being previewed
  const assetInputRef = useRef(null);

  const projects = data || [];
  const uploads = config?.uploads || [];

  const updateProject = (index, key, value) => {
    const updated = projects.map((p, i) =>
      i === index ? { ...p, [key]: value } : p
    );
    onChange(updated);
  };

  const handleTitleChange = (index, newTitle) => {
    const project = projects[index];
    const prevAutoSlug = generateSlug(project.title || '');
    const currentSlug = project.slug || '';
    const shouldAutoSlug = currentSlug === '' || currentSlug === prevAutoSlug;
    const updates = { title: newTitle };
    if (shouldAutoSlug) updates.slug = generateSlug(newTitle);
    const updated = projects.map((p, i) =>
      i === index ? { ...p, ...updates } : p
    );
    onChange(updated);
  };

  const addProject = () => {
    onChange([...projects, emptyProject()]);
    setEditIndex(projects.length);
  };

  const removeProject = (index) => {
    onChange(projects.filter((_, i) => i !== index));
    setDeleteTarget(null);
    if (editIndex === index) setEditIndex(null);
  };

  const moveProject = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= projects.length) return;
    const updated = [...projects];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    onChange(updated);
    if (editIndex === index) setEditIndex(target);
  };

  // Link helpers
  const addLink = (pIndex) => {
    const p = projects[pIndex];
    updateProject(pIndex, 'links', [
      ...(p.links || []),
      { id: uuidv4(), label: '', url: '' },
    ]);
  };

  const updateLink = (pIndex, linkId, key, value) => {
    const p = projects[pIndex];
    updateProject(
      pIndex,
      'links',
      (p.links || []).map((l) => (l.id === linkId ? { ...l, [key]: value } : l))
    );
  };

  const removeLink = (pIndex, linkId) => {
    const p = projects[pIndex];
    updateProject(
      pIndex,
      'links',
      (p.links || []).filter((l) => l.id !== linkId)
    );
  };

  // Embed helpers
  const addEmbed = (pIndex) => {
    const p = projects[pIndex];
    updateProject(pIndex, 'embeds', [
      ...(p.embeds || []),
      { id: uuidv4(), type: 'youtube', url: '', title: '' },
    ]);
  };

  const updateEmbed = (pIndex, embedId, key, value) => {
    const p = projects[pIndex];
    updateProject(
      pIndex,
      'embeds',
      (p.embeds || []).map((e) => (e.id === embedId ? { ...e, [key]: value } : e))
    );
  };

  const removeEmbed = (pIndex, embedId) => {
    const p = projects[pIndex];
    updateProject(
      pIndex,
      'embeds',
      (p.embeds || []).filter((e) => e.id !== embedId)
    );
  };

  // Block helpers
  const addBlock = (pIndex, type) => {
    const p = projects[pIndex];
    updateProject(pIndex, 'blocks', [...(p.blocks || []), newBlock(type)]);
  };

  const updateBlock = (pIndex, blockId, updated) => {
    const p = projects[pIndex];
    updateProject(pIndex, 'blocks', (p.blocks || []).map((b) => b.id === blockId ? updated : b));
  };

  const removeBlock = (pIndex, blockId) => {
    const p = projects[pIndex];
    updateProject(pIndex, 'blocks', (p.blocks || []).filter((b) => b.id !== blockId));
    if (expandedBlock === blockId) setExpandedBlock(null);
  };

  const moveBlock = (pIndex, blockIdx, dir) => {
    const p = projects[pIndex];
    const blocks = [...(p.blocks || [])];
    const target = blockIdx + dir;
    if (target < 0 || target >= blocks.length) return;
    [blocks[blockIdx], blocks[target]] = [blocks[target], blocks[blockIdx]];
    updateProject(pIndex, 'blocks', blocks);
  };

  // Asset upload helper
  const handleAssetUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const asset = { name: file.name, type: file.type, size: file.size, dataUrl: reader.result };
      const updatedUploads = [...uploads, asset];
      if (onConfigChange) onConfigChange({ ...config, uploads: updatedUploads });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const removeAsset = (idx) => {
    if (onConfigChange) onConfigChange({ ...config, uploads: uploads.filter((_, i) => i !== idx) });
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Projects</Typography>

      {projects.map((project, index) => (
        <Card key={project.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {project.title || 'Untitled Project'}
            </Typography>
            <Box>
              <IconButton size="small" onClick={() => moveProject(index, -1)} disabled={index === 0}><ArrowUpward fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => moveProject(index, 1)} disabled={index === projects.length - 1}><ArrowDownward fontSize="small" /></IconButton>
              <Button size="small" onClick={() => setEditIndex(editIndex === index ? null : index)}>
                {editIndex === index ? 'Collapse' : 'Edit'}
              </Button>
              <IconButton color="error" onClick={() => setDeleteTarget(index)}><Delete /></IconButton>
            </Box>
          </Box>

          {editIndex === index && (
            <Box sx={{ mt: 1 }}>
              <TextField label="Title" fullWidth size="small" required value={project.title || ''} onChange={(e) => handleTitleChange(index, e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Slug" fullWidth size="small" value={project.slug || ''} onChange={(e) => updateProject(index, 'slug', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Subtitle" fullWidth size="small" value={project.subtitle || ''} onChange={(e) => updateProject(index, 'subtitle', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Description" fullWidth size="small" multiline rows={2} value={project.description || ''} onChange={(e) => updateProject(index, 'description', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Category" fullWidth size="small" value={project.category || ''} onChange={(e) => updateProject(index, 'category', e.target.value)} sx={{ mb: 1 }} />
              <TextField
                label="Tags (comma-separated)"
                fullWidth
                size="small"
                value={(project.tags || []).join(', ')}
                onChange={(e) => updateProject(index, 'tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Tech Stack (comma-separated)"
                fullWidth
                size="small"
                value={(project.techStack || []).join(', ')}
                onChange={(e) => updateProject(index, 'techStack', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
                sx={{ mb: 1 }}
              />
              <TextField label="Thumbnail URL" fullWidth size="small" value={project.thumbnail || ''} onChange={(e) => updateProject(index, 'thumbnail', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Hero Image URL" fullWidth size="small" value={project.heroImage || ''} onChange={(e) => updateProject(index, 'heroImage', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Date / Timeline" fullWidth size="small" value={project.date || ''} onChange={(e) => updateProject(index, 'date', e.target.value)} sx={{ mb: 1 }} />

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                <Typography variant="body2">Status</Typography>
                <Select size="small" value={project.status || 'draft'} onChange={(e) => updateProject(index, 'status', e.target.value)} sx={{ minWidth: 120 }}>
                  {STATUS_OPTIONS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                <Typography variant="body2">Featured</Typography>
                <Switch checked={!!project.featured} onChange={(e) => updateProject(index, 'featured', e.target.checked)} />
              </Box>

              {/* Research Paper Fields */}
              {project.category === 'Research Papers' && (
                <Box sx={{ border: '1px solid', borderColor: 'divider', p: 2, mb: 1 }}>
                  <Typography variant="body2" fontWeight={600} mb={1}>Research Paper Fields</Typography>
                  <TextField label="Publication / Journal" fullWidth size="small" value={project.publication || ''} onChange={(e) => updateProject(index, 'publication', e.target.value)} sx={{ mb: 1 }} />
                  <TextField label="Authors" fullWidth size="small" value={project.authors || ''} onChange={(e) => updateProject(index, 'authors', e.target.value)} sx={{ mb: 1 }} />
                  <TextField label="Year" fullWidth size="small" value={project.year || ''} onChange={(e) => updateProject(index, 'year', e.target.value)} sx={{ mb: 1 }} />
                  <TextField label="DOI Link (optional)" fullWidth size="small" value={project.doiLink || ''} onChange={(e) => updateProject(index, 'doiLink', e.target.value)} sx={{ mb: 1 }} />
                  <TextField label="PDF Link (required for papers)" fullWidth size="small" value={project.pdfLink || ''} onChange={(e) => updateProject(index, 'pdfLink', e.target.value)} sx={{ mb: 1 }} />
                  <TextField label="Abstract" fullWidth size="small" multiline rows={3} value={project.abstract || ''} onChange={(e) => updateProject(index, 'abstract', e.target.value)} sx={{ mb: 1 }} />
                  <TextField label="Citation Text (optional)" fullWidth size="small" multiline rows={2} value={project.citationText || ''} onChange={(e) => updateProject(index, 'citationText', e.target.value)} sx={{ mb: 1 }} />
                  <TextField label="BibTeX (optional)" fullWidth size="small" multiline rows={3} value={project.bibtex || ''} onChange={(e) => updateProject(index, 'bibtex', e.target.value)} sx={{ mb: 1 }} />
                  <TextField label="Methodology" fullWidth size="small" multiline rows={3} value={project.methodology || ''} onChange={(e) => updateProject(index, 'methodology', e.target.value)} sx={{ mb: 1 }} />
                  <TextField
                    label="Key Findings (one per line)"
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    value={(project.keyFindings || []).join('\n')}
                    onChange={(e) => updateProject(index, 'keyFindings', e.target.value.split('\n').filter(Boolean))}
                    sx={{ mb: 1 }}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" fontWeight={600} mb={1}>Data Sources</Typography>
                  {(project.dataSources || []).map((ds, dsIdx) => (
                    <Box key={dsIdx} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                      <TextField label="Label" size="small" value={ds.label || ''} onChange={(e) => {
                        const updated = [...(project.dataSources || [])];
                        updated[dsIdx] = { ...updated[dsIdx], label: e.target.value };
                        updateProject(index, 'dataSources', updated);
                      }} sx={{ flex: 1 }} />
                      <TextField label="URL" size="small" value={ds.url || ''} onChange={(e) => {
                        const updated = [...(project.dataSources || [])];
                        updated[dsIdx] = { ...updated[dsIdx], url: e.target.value };
                        updateProject(index, 'dataSources', updated);
                      }} sx={{ flex: 1 }} />
                      <IconButton size="small" color="error" onClick={() => {
                        updateProject(index, 'dataSources', (project.dataSources || []).filter((_, i) => i !== dsIdx));
                      }}><Delete fontSize="small" /></IconButton>
                    </Box>
                  ))}
                  <Button size="small" startIcon={<Add />} onClick={() => {
                    updateProject(index, 'dataSources', [...(project.dataSources || []), { label: '', url: '' }]);
                  }}>Add Data Source</Button>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Select size="small" value={project.embedType || 'none'} onChange={(e) => updateProject(index, 'embedType', e.target.value === 'none' ? '' : e.target.value)} sx={{ minWidth: 140 }}>
                  {EMBED_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
                <TextField label="Embed URL" size="small" fullWidth value={project.embedUrl || ''} onChange={(e) => updateProject(index, 'embedUrl', e.target.value)} />
              </Box>

              {/* Markdown Content */}
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>Markdown Content</Typography>
                <Button size="small" onClick={() => setPreviewIndex(previewIndex === index ? null : index)}>
                  {previewIndex === index ? 'Editor' : 'Preview'}
                </Button>
              </Box>
              {previewIndex === index ? (
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, mb: 1, minHeight: 200 }}>
                  <MarkdownRenderer content={project.markdownContent || ''} />
                </Box>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={10}
                  placeholder="Write markdown content..."
                  value={project.markdownContent || ''}
                  onChange={(e) => updateProject(index, 'markdownContent', e.target.value)}
                  sx={{ mb: 0.5 }}
                />
              )}
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Tip: Use [embed:TYPE url=&quot;URL&quot; title=&quot;TITLE&quot;] in markdown. Types: youtube, pdf, gdocs, gsheets, msoffice, image
              </Typography>

              {/* Blocks */}
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" fontWeight={600} mb={1}>Blocks</Typography>
              {(project.blocks || []).map((block, bIdx) => (
                <Card key={block.id} variant="outlined" sx={{ p: 1, mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflow: 'hidden', flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', bgcolor: 'action.hover', px: 0.5, borderRadius: 0.5 }}>{block.type}</Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>{blockSummary(block)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexShrink: 0 }}>
                      <IconButton size="small" onClick={() => moveBlock(index, bIdx, -1)} disabled={bIdx === 0}><ArrowUpward sx={{ fontSize: 16 }} /></IconButton>
                      <IconButton size="small" onClick={() => moveBlock(index, bIdx, 1)} disabled={bIdx === (project.blocks || []).length - 1}><ArrowDownward sx={{ fontSize: 16 }} /></IconButton>
                      <Button size="small" onClick={() => setExpandedBlock(expandedBlock === block.id ? null : block.id)}>
                        {expandedBlock === block.id ? 'Close' : 'Edit'}
                      </Button>
                      <IconButton size="small" color="error" onClick={() => removeBlock(index, block.id)}><Delete sx={{ fontSize: 16 }} /></IconButton>
                    </Box>
                  </Box>
                  <Collapse in={expandedBlock === block.id}>
                    <Box sx={{ mt: 1 }}>
                      <BlockEditor block={block} onChange={(updated) => updateBlock(index, block.id, updated)} uploads={uploads} />
                    </Box>
                  </Collapse>
                </Card>
              ))}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Block Type</InputLabel>
                  <Select label="Block Type" value="" onChange={(e) => { if (e.target.value) addBlock(index, e.target.value); }}>
                    {BLOCK_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                  </Select>
                </FormControl>
                <Typography variant="caption" color="text.secondary">Select a type to add a block</Typography>
              </Box>

              {/* Embeds (enhanced) */}
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" fontWeight={600} mb={1}>Embeds</Typography>
              {(project.embeds || []).map((embed) => {
                const hasError = embed.type && embed.type !== 'youtube' && !embed.url;
                return (
                  <Box key={embed.id} sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Select size="small" value={embed.type || 'youtube'} onChange={(e) => updateEmbed(index, embed.id, 'type', e.target.value)} sx={{ minWidth: 120 }}>
                        {EMBED_ITEM_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                      </Select>
                      <TextField
                        label="URL" size="small" value={embed.url || ''}
                        onChange={(e) => updateEmbed(index, embed.id, 'url', e.target.value)}
                        sx={{ flex: 1 }}
                        error={hasError}
                        helperText={hasError ? 'URL is required' : ''}
                      />
                      <TextField label="Title" size="small" value={embed.title || ''} onChange={(e) => updateEmbed(index, embed.id, 'title', e.target.value)} sx={{ flex: 1 }} />
                      <Button size="small" onClick={() => setEmbedPreview(embedPreview === embed.id ? null : embed.id)} startIcon={<Preview />}>
                        {embedPreview === embed.id ? 'Hide' : 'Preview'}
                      </Button>
                      <IconButton size="small" color="error" onClick={() => removeEmbed(index, embed.id)}><Delete fontSize="small" /></IconButton>
                    </Box>
                    <Collapse in={embedPreview === embed.id}>
                      <Box sx={{ mt: 1, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <EmbedBlock type={embed.type || 'youtube'} src={embed.url} title={embed.title} />
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
              <Button size="small" startIcon={<Add />} onClick={() => addEmbed(index)}>Add Embed</Button>

              {/* Asset Library */}
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" fontWeight={600} mb={1}>Asset Library</Typography>
              <input type="file" ref={assetInputRef} style={{ display: 'none' }} onChange={handleAssetUpload} />
              {uploads.length > 0 && (
                <Box sx={{ mb: 1 }}>
                  {uploads.map((asset, aIdx) => (
                    <Box key={aIdx} sx={{ display: 'flex', gap: 1, mb: 0.5, alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ flex: 1 }} noWrap>{asset.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{asset.type}</Typography>
                      <Typography variant="caption" color="text.secondary">{asset.size ? `${(asset.size / 1024).toFixed(1)} KB` : ''}</Typography>
                      <IconButton size="small" onClick={() => { navigator.clipboard.writeText(asset.dataUrl); }}><ContentCopy sx={{ fontSize: 14 }} /></IconButton>
                      <IconButton size="small" color="error" onClick={() => removeAsset(aIdx)}><Delete sx={{ fontSize: 14 }} /></IconButton>
                    </Box>
                  ))}
                </Box>
              )}
              <Button size="small" startIcon={<Upload />} onClick={() => assetInputRef.current?.click()}>Upload Asset</Button>

              {/* Links */}
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" fontWeight={600} mb={1}>Links</Typography>
              {(project.links || []).map((link) => (
                <Box key={link.id || link.label} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                  <TextField label="Label" size="small" value={link.label || ''} onChange={(e) => updateLink(index, link.id, 'label', e.target.value)} sx={{ flex: 1 }} />
                  <TextField label="URL" size="small" value={link.url || ''} onChange={(e) => updateLink(index, link.id, 'url', e.target.value)} sx={{ flex: 1 }} />
                  <IconButton size="small" color="error" onClick={() => removeLink(index, link.id)}><Delete fontSize="small" /></IconButton>
                </Box>
              ))}
              <Button size="small" startIcon={<Add />} onClick={() => addLink(index)}>Add Link</Button>

              {/* Related Projects */}
              <Divider sx={{ my: 1 }} />
              <TextField
                label="Related Projects (comma-separated slugs)"
                fullWidth
                size="small"
                value={(project.relatedProjects || []).join(', ')}
                onChange={(e) => updateProject(index, 'relatedProjects', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                sx={{ mb: 1 }}
              />
            </Box>
          )}
        </Card>
      ))}

      <Button startIcon={<Add />} variant="outlined" onClick={addProject}>Add Project</Button>

      {/* Delete confirmation */}
      <Dialog open={deleteTarget !== null} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this project?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" onClick={() => removeProject(deleteTarget)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
