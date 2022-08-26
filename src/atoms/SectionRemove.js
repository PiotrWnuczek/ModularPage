import React, { useState } from 'react';
import { removeSection, removeFile } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Button } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { Remove } from '@mui/icons-material';

const SectionRemove = ({ sid, wid, file }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Avatar
        sx={{
          width: 30, height: 30, mx: 0.3,
          cursor: 'pointer', bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' },
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
            Section Remove
          </Typography>
          <Typography sx={{ my: 1 }}>
            Confirm section removing.
          </Typography>
          <Button
            onClick={() => {
              dispatch(removeSection({ sid, wid }));
              file && dispatch(removeFile({ sid, wid }));
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Confirm Remove
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

export default SectionRemove;
