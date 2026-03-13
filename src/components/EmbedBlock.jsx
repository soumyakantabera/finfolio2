import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box, Card, CardContent, Typography, Button, IconButton, Modal, Backdrop,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GitHubIcon from '@mui/icons-material/GitHub';

const bw = {
  color: '#111', borderColor: '#000',
  '&:hover': { borderColor: '#000', bgcolor: 'rgba(255, 255, 255, 0.5)' },
};
const cardSx = { my: 2, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.35)' };
const iframeStyle = { border: '1px solid rgba(255, 255, 255, 0.35)', borderRadius: 0 };

function extractYouTubeId(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/))([\w-]+)/);
  return m ? m[1] : null;
}

function ensurePreviewSuffix(url) {
  return url.replace(/\/?(preview)?$/, '/preview');
}

function formatFileSize(bytes) {
  if (!bytes) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
  return `${size.toFixed(i ? 1 : 0)} ${units[i]}`;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// Fallback card shown when embed is blocked or fails
function FallbackCard({ url, title }) {
  return (
    <Card variant="outlined" sx={cardSx}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', color: '#111' }}>
          {title || 'Embedded Content'}
        </Typography>
        {url && (
          <Button variant="outlined" size="small" href={url} target="_blank" rel="noopener noreferrer"
            startIcon={<OpenInNewIcon />} sx={bw}>
            Open
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Lightbox modal for images
function Lightbox({ open, onClose, src, alt, images, index, onNav }) {
  const multi = Array.isArray(images) && images.length > 1;
  const currentSrc = multi ? images[index]?.src || images[index] : src;
  const currentAlt = multi ? (images[index]?.alt || `Image ${index + 1}`) : (alt || '');

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (multi && e.key === 'ArrowLeft') onNav(-1);
      if (multi && e.key === 'ArrowRight') onNav(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', handleKey); };
  }, [open, onClose, onNav, multi]);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { sx: { bgcolor: '#000' } } }}>
      <Box sx={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16, color: '#fff', zIndex: 1 }}>
          <CloseIcon />
        </IconButton>
        {multi && (
          <>
            <IconButton onClick={() => onNav(-1)} sx={{ position: 'absolute', left: 16, color: '#fff', zIndex: 1 }}>
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => onNav(1)} sx={{ position: 'absolute', right: 16, color: '#fff', zIndex: 1 }}>
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </>
        )}
        <Box component="img" src={currentSrc} alt={currentAlt}
          sx={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
      </Box>
    </Modal>
  );
}

// Responsive iframe wrapper
function ResponsiveIframe({ src, title, aspectRatio, allowFullScreen, onError, height }) {
  const ratio = aspectRatio || '16/9';
  const [n, d] = ratio.split('/').map(Number);
  const pct = d && n ? `${(d / n) * 100}%` : '56.25%';

  return (
    <Box sx={{ position: 'relative', pb: height ? 0 : pct, height: height || 0, overflow: 'hidden', my: 2 }}>
      <iframe src={src} title={title || 'Embedded Content'} width="100%" height={height || '100%'}
        frameBorder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        loading="lazy" allowFullScreen={allowFullScreen !== false}
        onError={onError} style={{ ...iframeStyle, ...(height ? {} : { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }) }} />
    </Box>
  );
}

export default function EmbedBlock({
  type, src: srcProp, url: urlProp, title, caption, aspectRatio, startTime,
  allowFullscreen, theme, images, code, language, whitelist,
  fileName, fileSize, fileType,
}) {
  const url = srcProp || urlProp;
  const [error, setError] = useState(false);
  const [ytLoaded, setYtLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleNav = useCallback((dir) => {
    if (!images) return;
    setLightboxIdx((i) => (i + dir + images.length) % images.length);
  }, [images]);

  const openLightbox = (idx = 0) => { setLightboxIdx(idx); setLightboxOpen(true); };

  const handleCopy = async () => {
    if (!code) return;
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* clipboard not available */ }
  };

  const withCaption = (content) => (
    <Box sx={{ my: 2 }}>
      {content}
      {caption && <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#555', textAlign: 'center' }}>{caption}</Typography>}
    </Box>
  );

  if (error) return <FallbackCard url={url} title={title || 'Embedded Content'} />;

  switch (type) {
    // 1. PDF
    case 'pdf': {
      if (!url) return <FallbackCard title={title || 'PDF'} />;
      return withCaption(
        <>
          <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent: 'flex-end' }}>
            <Button variant="outlined" size="small" href={url} target="_blank" rel="noopener noreferrer"
              startIcon={<OpenInNewIcon />} sx={bw}>Open in new tab</Button>
            <Button variant="outlined" size="small" component="a" href={url} download
              startIcon={<DownloadIcon />} sx={bw}>Download</Button>
          </Box>
          <iframe src={url} title={title || 'PDF Viewer'} width="100%" height="600"
            frameBorder="0" onError={() => setError(true)} style={iframeStyle} />
        </>
      );
    }

    // 2. YouTube – lazy-load with click-to-play
    case 'youtube': {
      const videoId = extractYouTubeId(url || '');
      if (!videoId) return <FallbackCard url={url} title={title || 'YouTube Video'} />;
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1${startTime ? `&start=${startTime}` : ''}`;

      if (!ytLoaded) {
        return withCaption(
          <Box onClick={() => setYtLoaded(true)}
            sx={{
              position: 'relative', pb: aspectRatio ? undefined : '56.25%', height: 0, overflow: 'hidden',
              bgcolor: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton sx={{ color: '#fff', bgcolor: '#000', '&:hover': { bgcolor: '#000' }, width: 64, height: 64 }}>
                <PlayArrowIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
            {title && (
              <Typography variant="body2" sx={{ position: 'absolute', bottom: 8, left: 12, color: '#fff' }}>{title}</Typography>
            )}
          </Box>
        );
      }
      return withCaption(
        <ResponsiveIframe src={embedUrl} title={title || 'YouTube Video'} aspectRatio={aspectRatio}
          allowFullScreen={allowFullscreen} onError={() => setError(true)} />
      );
    }

    // 3. Audio
    case 'audio': {
      if (!url) return <FallbackCard title={title || 'Audio'} />;
      return withCaption(
        <Card variant="outlined" sx={cardSx}>
          <CardContent>
            {title && <Typography variant="body1" sx={{ fontWeight: 500, mb: 1, color: '#111' }}>{title}</Typography>}
            <audio controls preload="metadata" style={{ width: '100%' }}>
              <source src={url} />
              Your browser does not support the audio element.
            </audio>
          </CardContent>
        </Card>
      );
    }

    // 4. Google Docs / Sheets
    case 'gdocs':
    case 'gsheets': {
      if (!url) return <FallbackCard title={title || 'Google Document'} />;
      return withCaption(
        <ResponsiveIframe src={ensurePreviewSuffix(url)} title={title || 'Google Document'}
          aspectRatio={aspectRatio} onError={() => setError(true)} height={600} />
      );
    }

    // 5. MS Office
    case 'msoffice': {
      if (!url) return <FallbackCard title={title || 'Office Document'} />;
      return withCaption(
        <ResponsiveIframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
          title={title || 'Office Document'} aspectRatio={aspectRatio} onError={() => setError(true)} height={600} />
      );
    }

    // 6. Single image with lightbox
    case 'image': {
      if (!url) return <FallbackCard title={title || 'Image'} />;
      return withCaption(
        <>
          <Box component="img" src={url} alt={title || 'Embedded image'}
            onClick={() => openLightbox(0)} onError={() => setError(true)}
            sx={{ maxWidth: '100%', display: 'block', mx: 'auto', cursor: 'pointer', borderRadius: 0, objectFit: 'cover' }} />
          <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} src={url} alt={title} />
        </>
      );
    }

    // 7. Gallery with lightbox + keyboard nav
    case 'gallery': {
      if (!images || !images.length) return <FallbackCard title={title || 'Gallery'} />;
      return withCaption(
        <>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 1 }}>
            {images.map((img, i) => (
              <Box key={i} component="img" src={img.src || img} alt={img.alt || `Image ${i + 1}`}
                onClick={() => openLightbox(i)}
                sx={{ width: '100%', aspectRatio: '1', objectFit: 'cover', cursor: 'pointer', borderRadius: 0 }} />
            ))}
          </Box>
          <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)}
            images={images} index={lightboxIdx} onNav={handleNav} />
        </>
      );
    }

    // 8. Figma
    case 'figma': {
      if (!url) return <FallbackCard title={title || 'Figma Design'} />;
      const figmaSrc = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
      return withCaption(
        <ResponsiveIframe src={figmaSrc} title={title || 'Figma Design'} aspectRatio={aspectRatio || '16/9'}
          allowFullScreen={allowFullscreen} onError={() => setError(true)} />
      );
    }

    // 9. Code snippet
    case 'code': {
      if (!code) return <FallbackCard title={title || 'Code Snippet'} />;
      return withCaption(
        <Box sx={{ position: 'relative', my: 1, border: '1px solid rgba(255, 255, 255, 0.35)', bgcolor: 'rgba(255, 255, 255, 0.5)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1.5, py: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.35)' }}>
            <Typography variant="caption" sx={{ color: '#555', fontFamily: 'monospace' }}>{language || 'plain text'}</Typography>
            <Button size="small" startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />} onClick={handleCopy}
              sx={{ ...bw, fontSize: 12, textTransform: 'none' }}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
          <Box component="pre" sx={{ m: 0, p: 2, overflow: 'auto', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, color: '#111', whiteSpace: 'pre', maxWidth: '100%' }}>
            <code>{code}</code>
          </Box>
        </Box>
      );
    }

    // 10. GitHub Gist
    case 'gist': {
      if (!url) return <FallbackCard title={title || 'GitHub Gist'} />;
      const gistSrcDoc = `<html><body><script src="${url}.js"><\/script></body></html>`;
      return withCaption(
        <Box sx={{ my: 2 }}>
          <iframe srcDoc={gistSrcDoc} title={title || 'GitHub Gist'} width="100%" frameBorder="0"
            sandbox="allow-scripts allow-same-origin" onError={() => setError(true)}
            style={{ ...iframeStyle, minHeight: 200 }} onLoad={(e) => {
              const doc = e.target.contentDocument;
              if (doc) e.target.style.height = (doc.body.scrollHeight + 16) + 'px';
            }} />
        </Box>
      );
    }

    // 11. Generic iframe – whitelisted domains only
    case 'iframe': {
      if (!url) return <FallbackCard title={title || 'Embedded Content'} />;
      if (whitelist && whitelist.length) {
        try {
          const host = new URL(url).hostname;
          if (!whitelist.some((d) => host === d || host.endsWith('.' + d))) {
            return <FallbackCard url={url} title={`Domain not whitelisted: ${host}`} />;
          }
        } catch {
          return <FallbackCard url={url} title="Invalid URL" />;
        }
      }
      return withCaption(
        <ResponsiveIframe src={url} title={title || 'Embedded Content'} aspectRatio={aspectRatio}
          allowFullScreen={allowFullscreen} onError={() => setError(true)} />
      );
    }

    // 12. Chart embed (Plotly / Vega / generic)
    case 'chart': {
      if (!url) return <FallbackCard title={title || 'Chart'} />;
      return withCaption(
        <ResponsiveIframe src={url} title={title || 'Chart'} aspectRatio={aspectRatio || '4/3'}
          onError={() => setError(true)} />
      );
    }

    // 13. Downloadable file card
    case 'file': {
      const name = fileName || title || 'File';
      return withCaption(
        <Card variant="outlined" sx={cardSx}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
              <InsertDriveFileIcon sx={{ color: '#555', fontSize: 28 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#555' }}>
                  {[fileType, formatFileSize(fileSize)].filter(Boolean).join(' · ')}
                </Typography>
              </Box>
            </Box>
            {url && (
              <Button variant="outlined" size="small" component="a" href={url} download={fileName || true}
                startIcon={<DownloadIcon />} sx={bw}>Download</Button>
            )}
          </CardContent>
        </Card>
      );
    }

    default:
      return <FallbackCard url={url} title={title || 'Embedded Content'} />;
  }
}
