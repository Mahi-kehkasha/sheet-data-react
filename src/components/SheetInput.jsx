import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const SheetInput = ({ onSheetIdSubmit }) => {
  const [sheetId, setSheetId] = useState('');
  const [sheetRange, setSheetRange] = useState('Sheet1!A:Z'); // Default to entire first sheet

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sheetId.trim()) {
      onSheetIdSubmit(sheetId.trim(), sheetRange.trim());
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // Space between form elements
        p: 3, // Padding around the form
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: 1, // A subtle shadow
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 2 }}>
        Enter Google Sheet Details
      </Typography>
      <TextField
        fullWidth
        label="Sheet ID"
        variant="outlined"
        value={sheetId}
        onChange={(e) => setSheetId(e.target.value)}
        placeholder="e.g., 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
        helperText="Enter the ID from your Google Sheet URL (e.g., the long string in the URL)"
        sx={{ mb: 1.5 }} // Space below this field
      />
      <TextField
        fullWidth
        label="Sheet Range (e.g., Sheet1!A1:Z100)"
        variant="outlined"
        value={sheetRange}
        onChange={(e) => setSheetRange(e.target.value)}
        placeholder="e.g., Sheet1!A1:Z100 or MyTab!A:Z"
        helperText="Specify the sheet name and cell range (e.g., 'Sheet1!A:Z')"
        sx={{ mb: 2 }} // Space below this field
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!sheetId.trim()}
        size="large" // Slightly larger button
        sx={{ alignSelf: 'flex-end', minWidth: '150px' }}
      >
        Load Sheet
      </Button>
    </Box>
  );
};

export default SheetInput; 