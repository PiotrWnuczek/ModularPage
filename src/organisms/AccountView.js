import React, { useState } from 'react';
import { updateProfile } from 'redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Box, Card, Dialog } from '@mui/material';
import { Typography, Button } from '@mui/material';
import moment from 'moment';
import MainLayout from 'organisms/MainLayout';

const AccountView = () => {
  const [open, setOpen] = useState(false);
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();
  const future = new Date(new Date().setMonth(new Date().getMonth() + 1));

  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Card
          sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 2 }}
          variant='outlined'
        >
          <Typography
            sx={{ mb: 2 }}
            variant='h6'
          >
            Account Details
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Email: {profile && profile.email}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Custom Domains Limit: {profile && profile.limit.custom}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            All Websites Limit: {profile && profile.limit.all}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            {profile && profile.premium.toDate() > new Date(2023, 0, 0) ?
              'Premium: ' + moment(profile.premium.toDate()).calendar() :
              'Premium: trial'
            }
          </Typography>
          {profile && profile.premium.toDate() < new Date() && 0 && <Button
            sx={{ mb: 1 }}
            onClick={() => setOpen(true)}
            variant='outlined'
            size='small'
          >
            Activate Premium
          </Button>}
        </Card>
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
            onClick={() => {
              profile && profile.premium.toDate() < new Date() &&
                dispatch(updateProfile({
                  values: { premium: future },
                  id: auth.uid,
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
