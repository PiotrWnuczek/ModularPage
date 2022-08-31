import React, { useState } from 'react';
import { updateSection, updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Tab } from '@mui/icons-material';
import { Formik } from 'formik';

const ButtonOptions = ({ children, section, wid, idx }) => {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState('new');
  const dispatch = useDispatch();
  const button = idx ? 'button' + idx : 'button';
  const link = idx ? 'link' + idx : 'link';
  const tab = idx ? 'tab' + idx : 'tab';

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
            Boutton Settings
          </Typography>
          <Box sx={{ py: 1 }}>
            <Typography>
              Set button options.
            </Typography>
            <Formik
              initialValues={{
                [button]: section[button] || 'New Button',
                [link]: section[link] || '#',
              }}
              onSubmit={(values) => {
                section.id &&
                  (section[tab] !== target || values[button] !== section[button] ||
                    values[link] !== section[link]) &&
                  dispatch(updateSection({ values, sid: section.id, wid }));
                section.type === 'header' &&
                  (section[tab] !== target || values[button] !== section[button] ||
                    values[link] !== section[link]) &&
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
                    variant='outlined'
                    size='small'
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
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </form>
              )}
            </Formik>
            <ToggleButtonGroup
              sx={{ my: 1 }}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              color='primary'
              size='small'
              exclusive
            >
              <ToggleButton value='new'>
                <Tab sx={{ mr: 1 }} /> Open in New Tab
              </ToggleButton>
              <ToggleButton value='this'>
                <Tab sx={{ mr: 1 }} /> Open in This Tab
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Button
            type='submit'
            form='confirm'
            variant='contained'
            size='small'
          >
            Confirm Settings
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

export default ButtonOptions;
