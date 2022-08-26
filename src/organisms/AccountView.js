import React from 'react';
import { updateProfile } from 'redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Box, Button, Typography } from '@mui/material';
import MainLayout from 'organisms/MainLayout';

const AccountView = () => {
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();

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
            Plan: {profile && profile.plan}
          </Typography>
        </Box>
        <Typography variant='h6'>
          Account Options
        </Typography>
        <Button
          sx={{ my: 1 }}
          onClick={() => profile && (profile.plan !== 'premium') &&
            dispatch(updateProfile({
              values: { plan: 'premium' }, id: auth.uid,
            }))}
          variant='contained'
          size='small'
        >
          Upgrade Plan
        </Button>
      </Box>
    </MainLayout>
  )
};

export default AccountView;
