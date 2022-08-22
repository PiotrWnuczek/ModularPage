import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Dialog, Button } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const WebsiteExit = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ position: 'fixed', top: 44, left: 44, zIndex: 1200 }}>
        <Avatar
          sx={{
            cursor: 'pointer', bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
          onClick={() => setOpen(true)}
        >
          <ArrowBack />
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
            Exit
          </Typography>
          <Typography variant='subtitle1'>
            Changes saved. Exit to board.
          </Typography>
          <Button
            sx={{ mt: 1 }}
            onClick={() => {
              navigate('/board');
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Exit
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default WebsiteExit;
