import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from '@mui/material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import WebsiteCard from 'molecules/WebsiteCard';

const BoardView = ({ websites }) => (
  <MainLayout>
    <Grid sx={{ p: 2 }} container spacing={2}>
      {websites && websites.map(website =>
        <Grid item xs={12} key={website.id}>
          <WebsiteCard website={website} />
        </Grid>
      )}
    </Grid>
  </MainLayout>
);

const mapStateToProps = (state) => ({
  websites: state.firestore.ordered.websites,
  auth: state.firebase.auth,
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { collection: 'websites', where: [['email', '==', props.auth.email]] },
  ]),
)(BoardView));
