import React, { useState } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { TextField, IconButton } from '@mui/material';
import { Check } from '@mui/icons-material';
import { Formik } from 'formik';
import { Dialog, Button, Alert, AlertTitle } from '@mui/material';

const IconOptions = ({ children, admin, section, wid, idx }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const icon = idx ? 'icon' + idx : 'icon';

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
                <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
                  <TextField
                    sx={{ my: 0 }}
                    onChange={handleChange}
                    value={values[icon]}
                    name={icon}
                    placeholder='Icon'
                    label='Icon'
                    type='text'
                    size='small'
                    variant='outlined'
                    fullWidth
                    autoFocus
                    InputProps={{
                      endAdornment: <IconButton
                        sx={{ mx: -1 }}
                        type='submit'
                        size='small'
                      >
                        <Check />
                      </IconButton>
                    }}
                  />
                </form>
              )}
            </Formik>
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
