import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // A nice blue
    },
    secondary: {
      main: '#ffc107', // A warm yellow for accents
    },
    background: {
      default: '#f8f9fa', // Light gray background
      paper: '#ffffff', // White for paper components
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
      marginBottom: '1.5rem',
      color: '#343a40',
    },
    h6: {
      fontWeight: 500,
      marginBottom: '1rem',
      color: '#495057',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Slightly rounded buttons
          textTransform: 'none', // Keep original casing
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // Softer shadow for paper elements
          borderRadius: '12px', // Rounded corners for cards/tables
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#e9ecef', // Lighter header background
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: '700', // Bolder table headers
          color: '#343a40',
        },
      },
    },
  },
});

export default theme; 