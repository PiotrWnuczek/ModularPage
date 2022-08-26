import React, { useState } from 'react';
import { updateProfile } from 'redux/usersSlice';
import { updateSection } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Dialog, Typography } from '@mui/material';
import { Box, MenuItem, Select } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';

const FormOptions = ({ children, section, wid }) => {
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [mailing, setMailing] = useState('sender');

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
            Form Settings
          </Typography>
          <Box sx={{ py: 1 }}>
            <Typography>
              Set form options.
            </Typography>
            <Select
              sx={{ my: 1 }}
              value={mailing}
              onChange={(e) => setMailing(e.target.value)}
              size='small'
              fullWidth
              autoFocus
            >
              <MenuItem value='sender'>
                Sender
              </MenuItem>
              <MenuItem value='mailerlite'>
                Mailerlite
              </MenuItem>
            </Select>
            <Formik
              initialValues={{
                key: (profile && profile[mailing]) || 'Api Key',
                group: section.group || 'Group Id',
                button: section.button || 'Subscribe',
              }}
              onSubmit={(values) => {
                profile && (values.sender !== profile.sender) &&
                  dispatch(updateProfile({
                    values: { [mailing]: values.key },
                    id: auth.uid,
                  }));
                (values.group !== section.group || values.button !== section.button) &&
                  dispatch(updateSection({
                    values: { group: values.group, button: values.button, mailing },
                    sid: section.id, wid,
                  }));
                setOpen(false);
              }}
              enableReinitialize
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values.key}
                    name='key'
                    placeholder='Api Key'
                    label='Api Key'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values.group}
                    name='group'
                    placeholder='Group Id'
                    label='Group Id'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values.button}
                    name='button'
                    placeholder='Button Text'
                    label='Button Text'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
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

export default FormOptions;
