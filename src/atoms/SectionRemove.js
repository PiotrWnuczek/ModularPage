import React, { useState } from 'react';
import { removeSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Button } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { Remove } from '@mui/icons-material';

const SectionRemove = ({ sid, wid }) => {
  const dispatch = useDispatch();
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
        <Remove />
      </Avatar>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Remove
          </Typography>
          <Typography variant='subtitle1'>
            Remove confirmation
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Button
              sx={{ mr: 1 }}
              onClick={() => setOpen(false)}
              size='small'
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(removeSection({ sid, wid }));
                setOpen(false);
              }}
              size='small'
              color='error'
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
};

export default SectionRemove;
