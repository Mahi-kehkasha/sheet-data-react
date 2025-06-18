import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { CircularProgress, Alert, Box, Typography } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Custom light theme styles for AG Grid
const lightGridStyles = `
  .ag-theme-alpine {
    --ag-background-color: #ffffff;
    --ag-foreground-color: #000000;
    --ag-header-background-color: #f5f5f5;
    --ag-header-foreground-color: #000000;
    --ag-row-hover-color: #f0f8ff;
    --ag-selected-row-background-color: #00bcd4;
    --ag-odd-row-background-color: #ffffff;
    --ag-row-border-color: #e0e0e0;
    --ag-cell-horizontal-border: solid #e0e0e0;
    --ag-header-column-separator-color: #e0e0e0;
    --ag-font-size: 14px;
    --ag-font-family: 'Roboto', sans-serif;
  }
  
  .ag-theme-alpine .ag-header-cell {
    background-color: #f5f5f5;
    color: #000000;
    font-weight: 600;
    border-bottom: 2px solid #e0e0e0;
  }
  
  .ag-theme-alpine .ag-cell {
    background-color: #ffffff;
    color: #000000;
    border-color: #e0e0e0;
  }
  
  .ag-theme-alpine .ag-row:hover {
    background-color: #f0f8ff;
  }
  
  .ag-theme-alpine .ag-row-selected {
    background-color: #00bcd4 !important;
    color: #ffffff;
  }
  
  .ag-theme-alpine .ag-paging-panel {
    background-color: #f5f5f5;
    color: #000000;
    border-top: 1px solid #e0e0e0;
  }
  
  .ag-theme-alpine .ag-paging-button {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #e0e0e0;
  }
  
  .ag-theme-alpine .ag-paging-button:hover {
    background-color: #00bcd4;
    color: #ffffff;
  }
  
  .ag-theme-alpine .ag-paging-button.ag-disabled {
    background-color: #f5f5f5;
    color: #999999;
  }
  
  .ag-theme-alpine .ag-paging-row-summary-panel {
    color: #666666;
  }
  
  .ag-theme-alpine .ag-paging-page-summary-panel {
    color: #666666;
  }
`;

const SheetViewer = ({ sheetId, sheetRange }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef();
  const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

  // Inject custom light styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = lightGridStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    const fetchSheetData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${API_KEY}`;
        const response = await axios.get(url);
        const values = response.data.values;
        if (!values || values.length === 0) {
          setRowData([]);
          setColumnDefs([]);
          setError('No data found in the sheet.');
          return;
        }
        const headers = values[0];
        setColumnDefs(
          headers.map(header => ({
            field: header,
            filter: true,
            sortable: true,
            floatingFilter: true,
            resizable: true,
            ...(header.toLowerCase().includes('cost') && {
              type: 'numericColumn',
              valueFormatter: params => params.value ? `₹${Number(params.value).toLocaleString()}` : '',
            }),
          }))
        );
        setRowData(
          values.slice(1).map(row =>
            Object.fromEntries(headers.map((h, i) => [h, row[i] || '']))
          )
        );
      } catch (err) {
        setError('Failed to fetch data. Check Sheet ID, Range, API key, and sharing settings.');
      } finally {
        setLoading(false);
      }
    };
    if (sheetId && sheetRange && API_KEY) fetchSheetData();
  }, [sheetId, sheetRange, API_KEY]);

  const defaultColDef = useMemo(() => ({ flex: 1, minWidth: 120 }), []);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ height: 600, width: '100%', mt: 4 }}>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows
          enableRangeSelection
          domLayout="autoHeight"
        />
      </div>
    </Box>
  );
};

export default SheetViewer; 