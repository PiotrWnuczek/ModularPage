import React, { useState } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Typography, TextField } from '@mui/material';
import { Dialog, Button, Alert, AlertTitle } from '@mui/material';
import * as icons from '@mui/icons-material';
import { Formik } from 'formik';

const IconOptions = ({ children, admin, section, wid, idx }) => {
  const icon = idx ? 'icon' + idx : 'icon';
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(section[icon]);
  const dispatch = useDispatch();

  return (
    <Box>
      <Box
        sx={{ cursor: admin && 'pointer' }}
        onClick={() => admin && setOpen(true)}
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
            Icon Select
          </Typography>
          <Box sx={{ py: 1 }}>
            <Alert
              sx={{ my: 1, py: 0, px: 1, borderRadius: 2 }}
              variant='outlined'
              severity='info'
              size='small'
            >
              <AlertTitle>
                Info about section
              </AlertTitle>
              Lorem ipsum dolor sit amet.
            </Alert>
            <Formik
              initialValues={{ [icon]: section[icon] || 'Add' }}
              onSubmit={(values) => {
                values[icon] !== section[icon] &&
                  dispatch(updateSection({ values, sid: section.id, wid }));
                setOpen(false);
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form
                  onChange={(e) => setValue(e.target.value)}
                  onSubmit={handleSubmit} id='confirm' autoComplete='off'
                >
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values[icon]}
                    name={icon}
                    placeholder='Icon'
                    label='Icon'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                    autoFocus
                  />
                </form>
              )}
            </Formik>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>
                {icons[value] ? 'Selected icon: ' : 'Select icon'}
              </Typography>
              <Box component={icons[value]} />
            </Box>
          </Box>
          <Button
            type='submit'
            form='confirm'
            variant='contained'
            size='small'
          >
            Select Icon
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
