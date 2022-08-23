import React, { useState } from 'react';
import { Box, Dialog, Button, Divider } from '@mui/material';
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
          <Typography
            sx={{ textTransform: 'capitalize' }}
            variant='h5'
          >
            {section && section.type} Section Settings
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

export default SectionOptions;
