import React, { useState } from 'react';
import { removeWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, IconButton, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Formik } from 'formik';

const WebsiteRemove = ({ wid }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(false);

  return (
    <Box>
      <IconButton
        onClick={() => setOpen(true)}
        size='small'
      >
        <Delete />
      </IconButton>
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
            Remove confirmation (Enter website name to confirm)
          </Typography>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={(values) => {
              if (values.name === wid) {
                dispatch(removeWebsite({ wid }));
                setOpen(false);
              } else { setInfo(true) }
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values.name}
                  placeholder='Name'
                  label='Name'
                  name='name'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                  autoFocus
                />
              </form>
            )}
          </Formik>
          {info && <Typography variant='subtitle1'>
            Invalid website name (Try again)
          </Typography>}
          <Box sx={{ textAlign: 'right' }}>
            <Button
              sx={{ mr: 1 }}
              onClick={() => setOpen(false)}
              size='small'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              form='confirm'
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

export default WebsiteRemove;
