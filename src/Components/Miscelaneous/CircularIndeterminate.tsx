import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * This functional component renders a circular progress indicator centered inside a flexbox container.
 * 
 * @returns A Box component containing a CircularProgress component.
 */
export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={70} sx={{ color: '#A489FA' }}/>
    </Box>
  );
}