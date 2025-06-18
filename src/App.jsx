import React, { useState } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, TextField, Button } from '@mui/material';
import SheetViewer from './components/SheetViewer';
import './App.css';

function App() {
  const [sheetId, setSheetId] = useState('');
  const [sheetRange, setSheetRange] = useState('Sheet1!A:Z');
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Google Sheets Data Viewer
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Construction Materials Data (Google Sheets + AG Grid)
          </Typography>
          <Box component="form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            <TextField
              label="Google Sheet ID"
              value={sheetId}
              onChange={e => setSheetId(e.target.value)}
              fullWidth
              margin="normal"
              required
              helperText="Copy the ID from your Google Sheet URL (between /d/ and /edit)"
            />
            <TextField
              label="Sheet Range"
              value={sheetRange}
              onChange={e => setSheetRange(e.target.value)}
              fullWidth
              margin="normal"
              required
              helperText="e.g., Sheet1!A:Z"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Load Data</Button>
          </Box>
          {submitted && sheetId && sheetRange && (
            <SheetViewer 
              sheetId={sheetId} 
              sheetRange={sheetRange}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default App; 