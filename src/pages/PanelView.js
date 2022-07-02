import React from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { format } from 'date-fns';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import WebsiteCard from 'molecules/WebsiteCard';

const PanelView = ({ id, websites }) => {
  const [sidebar, setSidebar] = useApp();

  return (
    <MainLayout navbar={
      <Box sx={{ display: 'flex', alignItems: 'center', m: { xs: 1.2, sm: 2.2 } }}>
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' }, mr: 2 }}
          onClick={() => setSidebar(!sidebar)}
        >
          <Menu />
        </IconButton>
        <Typography variant='h6'>
          Today is the {format(new Date(), 'do MMMM Y')}
        </Typography>
      </Box>
    }>
      <Grid sx={{ p: 2 }} container spacing={2}>
        {websites && websites.map(website =>
          <Grid item xs={12} key={website.id}>
            <WebsiteCard website={website} />
          </Grid>
        )}
      </Grid>
      <Typography sx={{ p: 2 }}>
        Panel View: {id}
      </Typography>
    </MainLayout>
  )
};

const mapStateToProps = (state) => ({
  websites: state.firestore.ordered.websites,
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(['websites']),
)(PanelView));
