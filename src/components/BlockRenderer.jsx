import React from 'react';
import {
  Box, Typography, Card, CardContent, Button, IconButton, Divider, Tooltip,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import DescriptionIcon from '@mui/icons-material/Description';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MarkdownRenderer from './MarkdownRenderer';
import EmbedBlock from './EmbedBlock';

function formatFileSize(bytes) {
  if (!bytes) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
  return `${size.toFixed(i ? 1 : 0)} ${units[i]}`;
}

function getFileIcon(fileType) {
  if (!fileType) return <InsertDriveFileIcon sx={{ color: '#555', fontSize: 24 }} />;
  const t = fileType.toLowerCase();
  if (t === 'pdf') return <PictureAsPdfIcon sx={{ color: '#555', fontSize: 24 }} />;
  if (t === 'sheet' || t === 'xlsx' || t === 'xls' || t === 'csv') return <TableChartIcon sx={{ color: '#555', fontSize: 24 }} />;
  if (t === 'doc' || t === 'docx') return <DescriptionIcon sx={{ color: '#555', fontSize: 24 }} />;
  if (t === 'video' || t === 'mp4' || t === 'mov' || t === 'avi' || t === 'webm') return <VideocamIcon sx={{ color: '#555', fontSize: 24 }} />;
  return <InsertDriveFileIcon sx={{ color: '#555', fontSize: 24 }} />;
}

const calloutConfig = {
  insight:    { border: '#E0E0E0', label: 'INSIGHT' },
  assumption: { border: '#E0E0E0', label: 'ASSUMPTION' },
  risk:       { border: '#E0E0E0', label: 'RISK' },
  result:     { border: '#E0E0E0', label: 'RESULT' },
  takeaway:   { border: '#E0E0E0', label: 'KEY TAKEAWAY' },
};

function AttachmentDrawer({ files }) {
  if (!files || !files.length) return null;
  return (
    <Card variant="outlined" sx={{ my: 2, borderRadius: 0, border: '1px solid #E0E0E0' }}>
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#555', mb: 1, display: 'block' }}>
          Attachments
        </Typography>
        {files.map((file, i) => (
          <Box
            key={file.id || i}
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              py: 1, borderTop: i > 0 ? '1px dashed #E0E0E0' : 'none', gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden', flex: 1 }}>
              {getFileIcon(file.fileType)}
              <Box sx={{ overflow: 'hidden' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {file.name}
                </Typography>
                {file.size && (
                  <Typography variant="caption" sx={{ color: '#555' }}>
                    {formatFileSize(file.size)}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
              {file.url && (
                <>
                  <Tooltip title="Open in new tab">
                    <IconButton size="small" component="a" href={file.url} target="_blank" rel="noopener noreferrer" sx={{ color: '#111' }}>
                      <OpenInNewIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small" component="a" href={file.url} download={file.name || true} sx={{ color: '#111' }}>
                      <DownloadIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

function CalloutBlock({ variant, title, content }) {
  const cfg = calloutConfig[variant] || calloutConfig.insight;
  return (
    <Box sx={{ borderLeft: `2px solid ${cfg.border}`, pl: 2, py: 1.5, my: 2 }}>
      <Typography
        variant="caption"
        sx={{ fontVariant: 'small-caps', fontWeight: 700, letterSpacing: 1.5, color: cfg.border, display: 'block', mb: 0.5 }}
      >
        {cfg.label}
      </Typography>
      {title && (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#111', mb: 0.5 }}>
          {title}
        </Typography>
      )}
      <Typography variant="body2" sx={{ color: '#111', lineHeight: 1.7 }}>
        {content}
      </Typography>
    </Box>
  );
}

function renderBlock(block, index) {
  switch (block.type) {
    case 'markdown':
      return <MarkdownRenderer key={index} content={block.content} />;

    case 'embed':
      return (
        <EmbedBlock
          key={index}
          type={block.embedType}
          src={block.src}
          title={block.title}
          caption={block.caption}
          aspectRatio={block.aspectRatio}
          startTime={block.startTime}
          allowFullscreen={block.allowFullscreen}
        />
      );

    case 'attachments':
      return <AttachmentDrawer key={index} files={block.files} />;

    case 'callout':
      return <CalloutBlock key={index} variant={block.variant} title={block.title} content={block.content} />;

    case 'divider':
      return <Divider key={index} sx={{ my: 3 }} />;

    case 'gallery':
      return <EmbedBlock key={index} type="gallery" images={block.images} />;

    default:
      return null;
  }
}

export default function BlockRenderer({ blocks, markdownContent, embeds, config }) {
  // If blocks array exists and has items, render blocks
  if (blocks && blocks.length > 0) {
    return <Box>{blocks.map((block, i) => renderBlock(block, i))}</Box>;
  }

  // Fallback: render legacy markdownContent + embeds
  return (
    <Box>
      {markdownContent && <MarkdownRenderer content={markdownContent} />}
      {embeds && embeds.length > 0 && embeds.map((embed, i) => (
        <EmbedBlock
          key={`legacy-embed-${i}`}
          {...embed}
          whitelist={config?.embedWhitelist}
        />
      ))}
    </Box>
  );
}
