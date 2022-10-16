import React from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Box, Button, Link } from '@mui/material';
import { FormControlLabel, Switch } from '@mui/material';

const PublicControl = ({ website }) => {
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();
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
        onClick={() => !access && console.log('update premium')}
        label='public'
      />
    </Box>
  )
};

export default PublicControl;
