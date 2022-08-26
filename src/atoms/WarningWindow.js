import React from 'react';
import { Box, Typography } from '@mui/material';
import { Dialog, Button } from '@mui/material';

const WarningWindow = ({ warning, setWarning, title, text, button }) => (
  <Dialog
    sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
    open={warning}
    onClose={() => setWarning(false)}
    fullWidth
  >
    <Box sx={{ p: 2 }}>
      <Typography variant='h5'>
        {title}
      </Typography>
      <Typography sx={{ py: 1 }}>
        {text}
      </Typography>
      {button}
      <Button
        sx={{ ml: 1 }}
        onClick={() => setWarning(false)}
        variant='outlined'
        size='small'
      >
        Cancel
      </Button>
    </Box>
  </Dialog>
);

export default WarningWindow;
