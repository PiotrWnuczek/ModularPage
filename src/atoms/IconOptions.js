import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Paper, Typography } from '@mui/material';
import { Dialog, Button, Alert, AlertTitle } from '@mui/material';

const IconOptions = ({ children, section, wid }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <Box>
      <Box
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        {children}
        <Button onClick={() => setOpen(true)}>
          Test
        </Button>
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Graphic Upload
          </Typography>
          <Box sx={{ py: 1 }}>
            <Typography>
              Upload new graphic.
            </Typography>
            <Alert
              sx={{ my: 1, py: 0, px: 1, borderRadius: 2 }}
              variant='outlined'
              severity='info'
              size='small'
            >
              <AlertTitle>
                Info about section
              </AlertTitle>
              This is an info alert — check it out! <br />
              Lorem ipsum dolor sit amet.
            </Alert>

          </Box>
          <Button
            type='submit'
            form='confirm'
            variant='contained'
            size='small'
          >
            Upload Graphic
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

export default IconOptions;
