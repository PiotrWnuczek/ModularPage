import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Typography } from '@mui/material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import WebsiteCard from 'molecules/WebsiteCard';

const PanelView = ({ id, websites }) => (
  <MainLayout>
    <Grid sx={{ p: 2 }} container spacing={2}>
      {websites && websites.map(website =>
        <Grid item xs={12} key={website.id}>
          <WebsiteCard website={website} />
        </Grid>
      )}
    </Grid>
    <Typography sx={{ px: 2 }}>
      Panel View: {id}
    </Typography>
  </MainLayout>
);

const mapStateToProps = (state) => ({
  websites: state.firestore.ordered.websites,
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(['websites']),
)(PanelView));
