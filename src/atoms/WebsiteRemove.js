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
            Remove Website
          </Typography>
          <Box sx={{ my: 1 }}>
            <Typography>
              Confirm website removing, enter website name.
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
                    variant='outlined'
                    size='small'
                    fullWidth
                    autoFocus
                  />
                </form>
              )}
            </Formik>
            {info && <Typography>
              Invalid website name, try again.
            </Typography>}
          </Box>
          <Button
            type='submit'
            form='confirm'
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

export default WebsiteRemove;
