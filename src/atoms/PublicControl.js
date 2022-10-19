import React, { useState } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Dialog, Typography, Button } from '@mui/material';
import { Link, FormControlLabel, Switch } from '@mui/material';

const PublicControl = ({ website }) => {
  const [open, setOpen] = useState(false);
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = website.public.seconds && website.public.toDate() > new Date();
  const access = profile && profile.premium.toDate() > new Date();

  return (
    <Box>
      {website.public && <Button
        sx={{ ml: -0.5 }}
        component={Link}
        href={website.domain === 'custom' ?
          'https://' + website.name : '/' + website.name}
        target='_blank'
        size='small'
      >
        Link to website
      </Button>}
      {!website.public && <Button
        sx={{ ml: -0.5 }}
        component={Link}
        href={'/draft/' + website.name}
        target='_blank'
        size='small'
      >
        Link to draft
      </Button>}
      <FormControlLabel
        sx={{ m: 0 }}
        control={<Switch
          checked={date ? true : false}
          size='small'
        />}
        onChange={(e, value) => access && dispatch(updateWebsite({
          values: { public: value ? profile.premium : false },
          wid: website.name,
        }))}
        onClick={() => !access && setOpen(true)}
        label='public'
      />
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Upgrade Plan
          </Typography>
          <Typography sx={{ py: 1 }}>
            To publicate website upgrade your plan to premium.
          </Typography>
          <Button
            onClick={() => navigate('/account')}
            variant='contained'
            size='small'
          >
            Upgrade Plan
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

export default PublicControl;
