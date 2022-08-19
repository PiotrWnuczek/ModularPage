import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useFirebase } from 'react-redux-firebase';
import { Grid, Box, Button } from '@mui/material';
import MainLayout from 'organisms/MainLayout';
import WebsiteCard from 'molecules/WebsiteCard';

const BoardView = () => {
  const websites = useSelector(state => state.firestore.ordered.websites);
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ collection: 'websites', where: [['email', '==', auth.email]] }]);
  const firebase = useFirebase();
  const cloudFunction = () => {
    const sender = firebase.functions().httpsCallable('sender');
    sender({ email: 'piotrantoniwnuczek@gmail.com', group: 'e5773A' }).then((result) => console.log(result));
  };

  return (
    <MainLayout>
      <Grid sx={{ p: 2 }} container spacing={2}>
        {websites && websites.map(website =>
          <Grid item xs={12} key={website.id}>
            <WebsiteCard website={website} />
          </Grid>
        )}
      </Grid>
      <Box sx={{ p: 2 }}>
        <Button onClick={() => cloudFunction()}>
          Test
        </Button>
      </Box>
    </MainLayout>
  )
};

export default BoardView;
