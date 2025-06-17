import { useState, useCallback, useRef } from 'react'
import { Container, Typography, Box, AppBar, Toolbar } from '@mui/material'
import SheetInput from './components/SheetInput'
import SheetViewer from './components/SheetViewer'
import BoQSummary from './components/BoQSummary'
import './App.css'

function App() {
  const [currentSheetId, setCurrentSheetId] = useState('')
  const [currentSheetRange, setCurrentSheetRange] = useState('')
  const [filteredBoQData, setFilteredBoQData] = useState([])

  // Ref for the debounce timeout
  const debounceTimeoutRef = useRef(null)

  const handleSheetIdSubmit = useCallback((sheetId, sheetRange) => {
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Set a new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      setCurrentSheetId(sheetId)
      setCurrentSheetRange(sheetRange)
      setFilteredBoQData([]) // Reset filtered data when a new sheet is loaded
    }, 500) // Debounce for 500ms
  }, []) // Empty dependency array means this callback is memoized and doesn't recreate

  const handleFilteredDataChange = useCallback((data) => {
    setFilteredBoQData(data)
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Google Sheets Data Viewer
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Box sx={{ my: 4, p: 3, bgcolor: 'background.paper', borderRadius: '12px' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Fetch & Display Sheet Data
          </Typography>
          <SheetInput onSheetIdSubmit={handleSheetIdSubmit} />
          {currentSheetId && currentSheetRange && (
            <SheetViewer 
              sheetId={currentSheetId} 
              sheetRange={currentSheetRange} 
              onFilteredDataChange={handleFilteredDataChange}
            />
          )}
          {filteredBoQData.length > 0 && <BoQSummary filteredData={filteredBoQData} />}
        </Box>
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Google Sheets Viewer. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default App
