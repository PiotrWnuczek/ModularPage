import React, { useState } from 'react';
import { Box, Dialog, Button } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { Settings } from '@mui/icons-material';

const WebsiteOptions = ({ website }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ position: 'fixed', top: 24, right: 24 }}>
        <Avatar
          sx={{
            cursor: 'pointer', bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
          onClick={() => setOpen(true)}
        >
          <Settings />
        </Avatar>
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Settings
          </Typography>
          <Typography variant='subtitle1'>
            {website && website.name}
          </Typography>
          <Button
            sx={{ mt: 1 }}
            onClick={() => {
              console.log('set');
              setOpen(false);
            }}
            variant='outlined'
            size='small'
          >
            Set
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default WebsiteOptions;
