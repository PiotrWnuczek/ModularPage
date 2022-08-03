import React, { useState } from 'react';
import { Box, Avatar, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';
import { DialogContent, DialogContentText } from '@mui/material';
import { Remove } from '@mui/icons-material';

const SectionRemove = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Avatar
        sx={{
          mx: 0.3, cursor: 'pointer', bgcolor: 'info.main',
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
        <DialogTitle>
          Remove Section
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove the section?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            size='small'
          >
            Cancel
          </Button>
          <Button
            onClick={() => console.log('remove')}
            size='small'
            color='error'
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
};

export default SectionRemove;
