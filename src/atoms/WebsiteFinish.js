import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Typography } from '@mui/material';
import { Box, Button, Avatar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import PublicControl from './PublicControl';

const WebsiteFinish = ({ website }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ position: 'fixed', top: 36, left: 0, zIndex: 1200 }}>
        <Box sx={{
          p: 1, bgcolor: 'white',
          borderRadius: '0 30px 30px 0',
          boxShadow: '0 0 5px 0 lightgray',
        }}>
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
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Exit Editor
          </Typography>
          <Box sx={{ my: 1, mb: 2 }}>
            <Typography>
              Changes are saved, you can exit to board.
            </Typography>
            <PublicControl website={website} />
          </Box>
          <Button
            onClick={() => {
              navigate('/board');
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Exit Editor
          </Button>
          <Button
            sx={{ ml: 1 }}
            onClick={() => setOpen(false)}
            variant='outlined'
            size='small'
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default WebsiteFinish;
