import React, { useState } from 'react';
import { Box, Dialog, Button, Divider } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { Settings } from '@mui/icons-material';

const WebsiteOptions = ({ website }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ position: 'fixed', top: 44, right: 44, zIndex: 1200 }}>
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
          <Typography
            sx={{ textTransform: 'capitalize' }}
            variant='h5'
          >
            {website && website.name} Website Settings
          </Typography>
          <Box>
            <Typography>
              Text <br />
              Color <br />
              Background <br />
              Components
            </Typography>
            <Divider />
            <Typography>
              Standard <br />
              Wide <br />
              Narrow
            </Typography>
          </Box>
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

export default WebsiteOptions;
