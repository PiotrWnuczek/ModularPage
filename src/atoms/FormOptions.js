import React, { useState } from 'react';
import { updateProfile } from 'redux/usersSlice';
import { updateSection } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';

const FormOptions = ({ children, section, wid }) => {
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box onClick={() => setOpen(true)}>
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
            Set mailing form
          </Typography>
          <Formik
            initialValues={{
              sender: (profile && profile.sender) || 'Sender Key',
              group: section.group || 'Sender Group',
              button: section.button || 'Subscribe',
            }}
            onSubmit={(values) => {
              profile && (values.sender !== profile.sender) &&
                dispatch(updateProfile({
                  values: { sender: values.sender }, id: auth.uid,
                }));
              (values.group !== section.group || values.button !== section.button) &&
                dispatch(updateSection({
                  values: { group: values.group, button: values.button },
                  sid: section.id, wid,
                }));
              setOpen(false);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values.sender}
                  placeholder='Sender Key'
                  label='Sender Key'
                  name='sender'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                  autoFocus
                />
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values.group}
                  placeholder='Group Id'
                  label='Group Id'
                  name='group'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values.button}
                  placeholder='Button Text'
                  label='Button Text'
                  name='button'
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

export default FormOptions;
