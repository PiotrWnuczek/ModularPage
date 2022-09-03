import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Dialog, Button, Link } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const WebsiteFinish = ({ wid }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
            Exit Editor
          </Typography>
          <Typography sx={{ my: 1 }}>
            Changes are saved, exit to board,
            or open: {' '}
            <Link href={'/' + wid} target='_blank'>
              modularpage.com/{wid}
            </Link>
          </Typography>
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
