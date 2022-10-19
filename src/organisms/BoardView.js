import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Avatar } from '@mui/material';
import { Add } from '@mui/icons-material';
import MainLayout from 'organisms/MainLayout';
import WebsiteCard from 'molecules/WebsiteCard';

const BoardView = () => {
  const websites = useSelector(state => state.firestore.ordered.websites);
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ collection: 'websites', where: [['uid', '==', auth.uid]] }]);
  const navigate = useNavigate();

  return (
    <MainLayout>
      {websites && !websites.length && <Typography
        sx={{ p: 2, textAlign: 'center' }}
        variant='h5'
      >
        Welcome in Modular Page! <br /> Create your first website!
      </Typography>}
      <Grid sx={{ p: 2 }} container spacing={2}>
        {websites && websites.map(website =>
          <Grid item xs={12} key={website.id}>
            <WebsiteCard website={website} />
          </Grid>
        )}
      </Grid>
      <Box sx={{ position: 'fixed', bottom: 33, right: 33 }}>
        <Avatar
          sx={{
            width: 55, height: 55,
            cursor: 'pointer', bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
          onClick={() => navigate('/create')}
        >
          <Add />
        </Avatar>
      </Box>
    </MainLayout>
  )
};

export default BoardView;
