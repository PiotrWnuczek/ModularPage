import React, { useState } from 'react';
import { Box, Dialog, Button } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { Tune } from '@mui/icons-material';

const SectionOptions = ({ section }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Avatar
        sx={{
          width: 30, height: 30, mx: 0.3,
          cursor: 'pointer', bgcolor: 'info.main',
          '&:hover': { bgcolor: 'info.dark' },
        }}
        onClick={() => setOpen(true)}
      >
        <Tune />
      </Avatar>
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
            {section && section.type}
          </Typography>
          <Button
            sx={{ mt: 1 }}
            onClick={() => {
              console.log('set');
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Set
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default SectionOptions;
