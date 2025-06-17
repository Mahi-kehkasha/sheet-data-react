import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import { 
  CircularProgress,
  Alert,
  Box,
  Typography
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

// Register the required AG Grid modules
ModuleRegistry.registerModules(AllCommunityModules);

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // A theme for the grid

const SheetViewer = ({ sheetId, sheetRange, onFilteredDataChange }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef();

  const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

  useEffect(() => {
    const fetchSheetData = async () => {
      if (!sheetId || !sheetRange || !API_KEY) {
        setError('Please provide Sheet ID, Range, and ensure API Key is set.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${API_KEY}`
        );

        const sheetValues = response.data.values;

        if (!sheetValues || sheetValues.length === 0) {
          setRowData([]);
          setColumnDefs([]);
          setError(null);
          return;
        }

        const headers = sheetValues[0];
        const rows = sheetValues.slice(1);

        // Dynamically create column definitions for AG Grid
        // Special handling for a 'Cost' column if it exists
        const newColumnDefs = headers.map(header => {
          let colDef = {
            field: header,
            headerName: header,
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
          };
          if (header.toLowerCase() === 'cost') {
            colDef.type = 'numericColumn';
            colDef.valueFormatter = params => {
              return params.value != null ? `£${Number(params.value).toLocaleString()}` : '';
            };
            colDef.valueParser = params => {
              return Number(params.newValue.replace(/[£,]/g, ''));
            };
          }
          return colDef;
        });
        setColumnDefs(newColumnDefs);

        // Prepare row data as an array of objects
        const newRowData = rows.map(row => {
          let rowObject = {};
          headers.forEach((header, index) => {
            rowObject[header] = row[index] !== undefined ? row[index] : '';
          });
          return rowObject;
        });
        setRowData(newRowData);
        if (onFilteredDataChange) {
          onFilteredDataChange(newRowData);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching sheet data:', err);
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.status === 403) {
            setError('Access denied. Ensure the Google Sheet is public or your API key has correct permissions.');
          } else if (err.response.status === 404) {
            setError('Sheet or range not found. Please check the Sheet ID and Range.');
          } else {
            setError(`Failed to fetch data: ${err.response.statusText || 'Unknown Error'}. Please check inputs and network.`);
          }
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSheetData();
  }, [sheetId, sheetRange, API_KEY, onFilteredDataChange]);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
  }), []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
    // Initial data is also the initial filtered data
    if (onFilteredDataChange && rowData.length > 0) {
      onFilteredDataChange(rowData);
    }
  }, [onFilteredDataChange, rowData]);

  // Handle filter changes and pass filtered rows up
  const onFilterChanged = useCallback(() => {
    if (gridRef.current && onFilteredDataChange) {
      const filteredData = [];
      gridRef.current.api.forEachNodeAfterFilter(node => {
        filteredData.push(node.data);
      });
      onFilteredDataChange(filteredData);
    }
  }, [onFilteredDataChange]);

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="200px" sx={{ mt: 4 }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="subtitle1" color="text.secondary">Loading sheet data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
          fontSize: '1.1rem'
        }}
      >
        {error}
      </Alert>
    );
  }

  if (!rowData.length) {
    return (
      <Alert severity="info" sx={{ mt: 2, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2, fontSize: '1.1rem' }}>
        No data available or invalid sheet/range. Ensure your sheet has headers and data.
      </Alert>
    );
  }

  return (
    <Box sx={{ height: 500, width: '100%', mt: 4 }}>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onFilterChanged={onFilterChanged} // Added to trigger updates on filter changes
          animateRows={true}
          enableRangeSelection={true}
          // Other AG Grid properties can be added here
        />
      </div>
    </Box>
  );
};

export default SheetViewer; 