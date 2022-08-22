import React from 'react';
import { Box, Dialog, Button } from '@mui/material';
import { Typography } from '@mui/material';

const WarningWindow = ({ warning, setWarning, content, button }) => (
  <Dialog
    sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
    open={warning}
    onClose={() => setWarning(false)}
    fullWidth
  >
    <Box sx={{ p: 2 }}>
      <Typography variant='h5'>
        Warning
      </Typography>
      <Box>
        {content}
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          sx={{ mr: 1 }}
          onClick={() => setWarning(false)}
          size='small'
        >
          Cancel
        </Button>
        {button}
      </Box>
    </Box>
  </Dialog>
);

export default WarningWindow;
