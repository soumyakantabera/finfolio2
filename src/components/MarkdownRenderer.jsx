import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Box, Typography, Link as MuiLink, Button, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WrapTextIcon from '@mui/icons-material/WrapText';

const EMBED_REGEX = /\[embed:(\w+)\s+url="([^"]+)"(?:\s+title="([^"]*)")?\]/g;
const PLACEHOLDER_PREFIX = '<!--embed-placeholder-';
const PLACEHOLDER_SUFFIX = '-->';

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'iframe'],
  attributes: {
    ...defaultSchema.attributes,
    iframe: ['src', 'width', 'height', 'frameBorder', 'allow', 'allowFullScreen', 'title', 'style'],
  },
};

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractTextFromChildren(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractTextFromChildren).join('');
  if (children && typeof children === 'object' && children.props) {
    return extractTextFromChildren(children.props.children);
  }
  return '';
}

function extractEmbeds(content) {
  const embeds = [];
  const processed = content.replace(EMBED_REGEX, (_, type, url, title) => {
    const index = embeds.length;
    embeds.push({ type: type.toLowerCase(), url, title: title || url });
    return `${PLACEHOLDER_PREFIX}${index}${PLACEHOLDER_SUFFIX}`;
  });
  return { processed, embeds };
}

function EmbedBlock({ type, url, title }) {
  const [error, setError] = React.useState(false);

  if (error) {
    return <EmbedFallback url={url} title={title} />;
  }

  const iframeProps = {
    title,
    width: '100%',
    frameBorder: '0',
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: true,
    onError: () => setError(true),
    style: { border: 'none', borderRadius: 0 },
  };

  switch (type) {
    case 'youtube': {
      const videoId = url.match(/(?:youtu\.be\/|v=)([\w-]+)/)?.[1] || url;
      return (
        <Box sx={{ position: 'relative', pb: '56.25%', height: 0, overflow: 'hidden', my: 2, borderRadius: 0 }}>
          <iframe
            {...iframeProps}
            src={`https://www.youtube.com/embed/${videoId}`}
            style={{ ...iframeProps.style, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </Box>
      );
    }
    case 'pdf':
      return (
        <Box sx={{ my: 2 }}>
          <iframe {...iframeProps} src={url} height="600" />
        </Box>
      );
    case 'gdocs':
    case 'gsheets':
      return (
        <Box sx={{ my: 2 }}>
          <iframe {...iframeProps} src={url} height="500" />
        </Box>
      );
    case 'msoffice':
      return (
        <Box sx={{ my: 2 }}>
          <iframe
            {...iframeProps}
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
            height="500"
          />
        </Box>
      );
    case 'image':
      return (
        <Box sx={{ my: 2, textAlign: 'center' }}>
          <img
            src={url}
            alt={title}
            onError={() => setError(true)}
            style={{ maxWidth: '100%', borderRadius: 0 }}
          />
        </Box>
      );
    default:
      return <EmbedFallback url={url} title={title} />;
  }
}

function EmbedFallback({ url, title }) {
  return (
    <Card variant="outlined" sx={{ my: 2 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" sx={{ fontWeight: 500, mr: 2, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<OpenInNewIcon />}
        >
          Open
        </Button>
      </CardContent>
    </Card>
  );
}

// Simple B&W syntax highlighting (keywords, strings, comments in grayscale)
function highlightCode(code, language) {
  if (!language) return [{ text: code, type: 'plain' }];

  const tokens = [];
  // Order matters: comments first, then strings, then keywords
  const patterns = [
    { type: 'comment', regex: /\/\/.*$|\/\*[\s\S]*?\*\/|#.*$/gm },
    { type: 'string', regex: /(["'`])(?:(?!\1|\\).|\\.)*\1/g },
    { type: 'keyword', regex: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|try|catch|finally|throw|async|await|yield|of|in|typeof|instanceof|void|delete|this|super|static|get|set|true|false|null|undefined|def|self|print|elif|except|raise|with|as|lambda|pass|None|True|False|int|float|str|list|dict|public|private|protected|abstract|interface|implements|enum|final|override|package|struct|fn|pub|mod|use|impl|trait|match|loop|mut|ref|move|where|type|alias)\b/g },
  ];

  // Build a combined list of all token positions
  const allMatches = [];
  for (const { type, regex } of patterns) {
    let m;
    while ((m = regex.exec(code)) !== null) {
      allMatches.push({ start: m.index, end: m.index + m[0].length, text: m[0], type });
    }
  }

  // Sort by start position
  allMatches.sort((a, b) => a.start - b.start);

  // Remove overlapping tokens (earlier wins)
  const filtered = [];
  let lastEnd = 0;
  for (const tok of allMatches) {
    if (tok.start >= lastEnd) {
      filtered.push(tok);
      lastEnd = tok.end;
    }
  }

  // Build final token list with plain text gaps
  let pos = 0;
  for (const tok of filtered) {
    if (tok.start > pos) {
      tokens.push({ text: code.slice(pos, tok.start), type: 'plain' });
    }
    tokens.push(tok);
    pos = tok.end;
  }
  if (pos < code.length) {
    tokens.push({ text: code.slice(pos), type: 'plain' });
  }

  return tokens.length ? tokens : [{ text: code, type: 'plain' }];
}

const tokenStyles = {
  keyword: { color: '#000', fontWeight: 700 },
  string: { color: '#000', fontWeight: 500 },
  comment: { color: '#000', fontStyle: 'italic', fontWeight: 400 },
  plain: { color: '#000' },
};

function HighlightedCode({ code, language }) {
  const tokens = highlightCode(code, language);
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} style={tokenStyles[tok.type] || tokenStyles.plain}>{tok.text}</span>
      ))}
    </>
  );
}

function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false);
  const [wrap, setWrap] = useState(false);

  const language = className ? className.replace(/^language-/, '') : '';
  const code = String(children).replace(/\n$/, '');

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  }, [code]);

  return (
    <Box sx={{ my: 3, border: '1px solid rgba(255, 255, 255, 0.35)', borderRadius: 0 }}>
      {/* Header bar */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 1.5, py: 0.5, borderBottom: '1px solid rgba(255, 255, 255, 0.35)', bgcolor: 'rgba(255, 255, 255, 0.5)',
      }}>
        <Typography variant="caption" sx={{ color: '#555', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {language || 'code'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={wrap ? 'No wrap' : 'Wrap lines'}>
            <IconButton size="small" onClick={() => setWrap((w) => !w)} sx={{ color: '#555' }}>
              <WrapTextIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Button
            size="small"
            startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
            onClick={handleCopy}
            sx={{ fontSize: 12, textTransform: 'none', color: '#111', borderColor: '#000', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.5)' } }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
      </Box>
      {/* Code content */}
      <Box
        component="pre"
        sx={{
          m: 0, p: 2, bgcolor: 'rgba(255, 255, 255, 0.5)', fontFamily: 'monospace', fontSize: { xs: '0.8rem', md: '0.875em' },
          lineHeight: 1.7, maxWidth: '100%',
          overflowX: wrap ? 'visible' : 'auto',
          whiteSpace: wrap ? 'pre-wrap' : 'pre',
          wordBreak: wrap ? 'break-all' : 'normal',
        }}
      >
        <code style={{ fontFamily: 'inherit' }}>
          <HighlightedCode code={code} language={language} />
        </code>
      </Box>
    </Box>
  );
}

const markdownComponents = {
  h1: ({ children, ...props }) => (
    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mt: 4, mb: 2, color: '#111' }} {...props}>
      {children}
    </Typography>
  ),
  h2: ({ children, ...props }) => {
    const text = extractTextFromChildren(children);
    const id = slugify(text);
    return (
      <Typography variant="h5" component="h2" id={id} sx={{ fontWeight: 600, mt: 3, mb: 1.5, color: '#111' }} {...props}>
        {children}
      </Typography>
    );
  },
  h3: ({ children, ...props }) => {
    const text = extractTextFromChildren(children);
    const id = slugify(text);
    return (
      <Typography variant="h6" component="h3" id={id} sx={{ fontWeight: 600, mt: 3, mb: 1, color: '#111' }} {...props}>
        {children}
      </Typography>
    );
  },
  h4: ({ children, ...props }) => (
    <Typography variant="subtitle1" component="h4" sx={{ fontWeight: 600, mt: 2, mb: 1, color: '#111' }} {...props}>
      {children}
    </Typography>
  ),
  p: ({ children, ...props }) => (
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7, color: '#111' }} {...props}>
      {children}
    </Typography>
  ),
  a: ({ href, children, ...props }) => (
    <MuiLink href={href} target="_blank" rel="noopener noreferrer" sx={{ color: '#111', fontWeight: 500 }} {...props}>
      {children}
    </MuiLink>
  ),
  img: ({ src, alt, ...props }) => (
    <Box component="img" src={src} alt={alt} sx={{ maxWidth: '100%', borderRadius: 0, my: 2 }} {...props} />
  ),
  blockquote: ({ children, ...props }) => (
    <Box
      component="blockquote"
      sx={{ borderLeft: '4px solid rgba(255, 255, 255, 0.35)', pl: 2, my: 3, ml: 0, color: '#111' }}
      {...props}
    >
      {children}
    </Box>
  ),
  code: ({ inline, className, children, ...props }) => {
    if (inline) {
      return (
        <Box
          component="code"
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 255, 255, 0.35)', px: 0.75, py: 0.25, borderRadius: 0, fontSize: '0.875em', fontFamily: 'monospace' }}
          {...props}
        >
          {children}
        </Box>
      );
    }
    return (
      <Box
        component="code"
        sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.875em' }}
        {...props}
      >
        {children}
      </Box>
    );
  },
  pre: ({ children, ...props }) => {
    // Extract language and code text from the nested <code> element
    const codeChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && (child.type === 'code' || child.props?.mdxType === 'code' || child.props?.className)
    );
    if (codeChild && React.isValidElement(codeChild)) {
      const className = codeChild.props.className || '';
      const code = extractTextFromChildren(codeChild.props.children);
      return <CodeBlock className={className}>{code}</CodeBlock>;
    }
    return (
      <Box
        component="pre"
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.5)', p: 2, borderRadius: 0, overflow: 'auto', my: 3, border: '1px solid rgba(255, 255, 255, 0.35)', fontSize: { xs: '0.8rem', md: '0.875em' }, maxWidth: '100%' }}
        {...props}
      >
        {children}
      </Box>
    );
  },
  table: ({ children, ...props }) => (
    <Box sx={{ overflowX: 'auto', my: 3 }}>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }} {...props}>
        {children}
      </Box>
    </Box>
  ),
  th: ({ children, ...props }) => (
    <Box
      component="th"
      sx={{ border: '1px solid rgba(255, 255, 255, 0.35)', p: 1, fontWeight: 600, textAlign: 'left', bgcolor: 'rgba(255, 255, 255, 0.5)' }}
      {...props}
    >
      {children}
    </Box>
  ),
  td: ({ children, ...props }) => (
    <Box component="td" sx={{ border: '1px solid rgba(255, 255, 255, 0.35)', p: 1 }} {...props}>
      {children}
    </Box>
  ),
};

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  const { processed, embeds } = extractEmbeds(content);

  // Split on embed placeholders and interleave markdown segments with embed blocks
  const parts = processed.split(new RegExp(`${PLACEHOLDER_PREFIX.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}(\\d+)${PLACEHOLDER_SUFFIX.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}`));

  return (
    <Box sx={{ color: '#111' }}>
      {parts.map((part, i) => {
        // Odd indices are captured embed indices
        if (i % 2 === 1) {
          const embed = embeds[parseInt(part, 10)];
          return embed ? <EmbedBlock key={`embed-${part}`} {...embed} /> : null;
        }
        if (!part.trim()) return null;
        return (
          <ReactMarkdown
            key={`md-${i}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
            components={markdownComponents}
          >
            {part}
          </ReactMarkdown>
        );
      })}
    </Box>
  );
}
