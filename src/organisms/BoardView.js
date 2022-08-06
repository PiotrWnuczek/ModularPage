import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Grid } from '@mui/material';
import MainLayout from 'organisms/MainLayout';
import WebsiteCard from 'molecules/WebsiteCard';

const BoardView = () => {
  const websites = useSelector(state => state.firestore.ordered.websites);
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ collection: 'websites', where: [['email', '==', auth.email]] }]);

  return (
    <MainLayout>
      <Grid sx={{ p: 2 }} container spacing={2}>
        {websites && websites.map(website =>
          <Grid item xs={12} key={website.id}>
            <WebsiteCard website={website} />
          </Grid>
        )}
      </Grid>
    </MainLayout>
  )
};

export default BoardView;
