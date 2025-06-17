import React, { useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const BoQSummary = ({ filteredData }) => {
  const totalCost = useMemo(() => {
    if (!filteredData || filteredData.length === 0) {
      return 0;
    }
    
    return filteredData.reduce((sum, row) => {
      const cost = parseFloat(row.Cost?.replace(/[£,]/g, '')) || 0;
      return sum + cost;
    }, 0);
  }, [filteredData]);

  return (
    <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: '12px', boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Bill of Quantities Summary
      </Typography>
      <Typography variant="h4">
        Total Calculated Cost: <span style={{ fontWeight: 'bold' }}>£{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </Typography>
    </Box>
  );
};

export default BoQSummary; 