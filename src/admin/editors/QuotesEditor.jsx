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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Add, Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

export default function QuotesEditor({ data, onChange }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const quotes = data || [];

  const update = (newQuotes) => {
    onChange(newQuotes);
  };

  const addQuote = () => {
    const maxOrder = quotes.reduce((max, q) => Math.max(max, q.order || 0), 0);
    update([
      ...quotes,
      {
        id: uuidv4(),
        text: '',
        attribution: '',
        context: '',
        featured: false,
        order: maxOrder + 1,
      },
    ]);
  };

  const updateQuote = (id, field, value) => {
    update(quotes.map((q) => (q.id === id ? { ...q, [field]: value } : q)));
  };

  const removeQuote = (id) => {
    update(quotes.filter((q) => q.id !== id));
    setDeleteTarget(null);
  };

  const moveQuote = (id, direction) => {
    const sorted = [...quotes].sort((a, b) => (a.order || 0) - (b.order || 0));
    const idx = sorted.findIndex((q) => q.id === id);
    if (
      (direction === 'up' && idx === 0) ||
      (direction === 'down' && idx === sorted.length - 1)
    )
      return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    const tempOrder = sorted[idx].order;
    sorted[idx] = { ...sorted[idx], order: sorted[swapIdx].order };
    sorted[swapIdx] = { ...sorted[swapIdx], order: tempOrder };
    update(sorted);
  };

  const sortedQuotes = [...quotes].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Quotes / Own Words
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Manage personal quotes that appear on the homepage and other pages.
      </Typography>

      {sortedQuotes.map((quote, idx) => (
        <Card key={quote.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <IconButton
                size="small"
                disabled={idx === 0}
                onClick={() => moveQuote(quote.id, 'up')}
              >
                <ArrowUpward fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                disabled={idx === sortedQuotes.length - 1}
                onClick={() => moveQuote(quote.id, 'down')}
              >
                <ArrowDownward fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                label="Quote text"
                fullWidth
                multiline
                rows={2}
                size="small"
                value={quote.text || ''}
                onChange={(e) => updateQuote(quote.id, 'text', e.target.value)}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <TextField
                  label="Attribution"
                  size="small"
                  value={quote.attribution || ''}
                  onChange={(e) =>
                    updateQuote(quote.id, 'attribution', e.target.value)
                  }
                  placeholder='e.g. "Me", "Principle"'
                  sx={{ flex: 1, minWidth: 140 }}
                />
                <TextField
                  label="Context / Tag"
                  size="small"
                  value={quote.context || ''}
                  onChange={(e) =>
                    updateQuote(quote.id, 'context', e.target.value)
                  }
                  placeholder='e.g. "Work ethic"'
                  sx={{ flex: 1, minWidth: 140 }}
                />
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={quote.featured || false}
                    onChange={(e) =>
                      updateQuote(quote.id, 'featured', e.target.checked)
                    }
                    size="small"
                  />
                }
                label="Featured on homepage"
                sx={{ mt: 1 }}
              />
            </Box>
            <IconButton
              color="error"
              onClick={() => setDeleteTarget(quote.id)}
            >
              <Delete />
            </IconButton>
          </Box>
        </Card>
      ))}

      <Button startIcon={<Add />} onClick={addQuote}>
        Add Quote
      </Button>

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this quote?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" onClick={() => removeQuote(deleteTarget)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
