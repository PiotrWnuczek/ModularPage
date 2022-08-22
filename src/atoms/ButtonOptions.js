import React, { useState } from 'react';
import { updateSection, updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';

const ButtonOptions = ({ children, section, wid, idx }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const button = idx ? 'button' + idx : 'button';
  const link = idx ? 'link' + idx : 'link';

  return (
    <Box>
      <Box
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        {children}
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Settings
          </Typography>
          <Typography variant='subtitle1'>
            Set button text and url
          </Typography>
          <Formik
            initialValues={{
              [button]: section[button] || 'New Button',
              [link]: section[link] || '#',
            }}
            onSubmit={(values) => {
              section.id &&
                (values[button] !== section[button] || values[link] !== section[link]) &&
                dispatch(updateSection({ values, sid: section.id, wid }));
              section.type === 'header' &&
                (values[button] !== section[button] || values[link] !== section[link]) &&
                dispatch(updateWebsite({
                  values: { header: { ...section, ...values } }, wid,
                }));
              setOpen(false);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values[button]}
                  name={button}
                  placeholder='Text'
                  label='Text'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                  autoFocus
                />
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values[link]}
                  placeholder='Url'
                  label='Url'
                  name='link'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                />
              </form>
            )}
          </Formik>
          <Button
            sx={{ mt: 1 }}
            type='submit'
            form='confirm'
            variant='outlined'
            size='small'
          >
            Set
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default ButtonOptions;
