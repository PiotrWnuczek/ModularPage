import React, { useState } from 'react';
import { updateProfile } from 'redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Box, Typography } from '@mui/material';
import { Dialog, Button } from '@mui/material';
import moment from 'moment';
import MainLayout from 'organisms/MainLayout';

const AccountView = () => {
  const [open, setOpen] = useState(false);
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();
  const present = new Date();
  const future = present.setMonth(present.getMonth() + 1);

  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant='h6'>
          Account Details
        </Typography>
        <Box sx={{ py: 2 }}>
          <Typography sx={{ mb: 1 }}>
            Email: {profile && profile.email}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Premium: {(profile && moment(profile.premium.toDate()).calendar()) || 'inactive'}
          </Typography>
        </Box>
        <Typography variant='h6'>
          Account Options
        </Typography>
        <Button
          onClick={() => (profile && profile.premium.toDate()) < new Date() && setOpen(true)}
          variant='contained'
          size='small'
        >
          Activate Premium
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
            Activate Premium
          </Typography>
          <Typography sx={{ py: 1 }}>
            Activate premium for one month.
          </Typography>
          <Button
            sx={{ my: 1 }}
            onClick={() => {
              (profile && profile.premium.toDate()) < new Date() &&
                dispatch(updateProfile({
                  values: { premium: new Date(future) }, id: auth.uid,
                }));
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Confirm Activation
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
    </MainLayout>
  )
};

export default AccountView;
