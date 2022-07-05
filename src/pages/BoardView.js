import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Typography } from '@mui/material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';
import PageCard from 'molecules/PageCard';

const BoardView = ({ id, pages }) => (
  <MainLayout>
    <Grid sx={{ p: 2 }} container spacing={2}>
      {pages && pages.map(page =>
        <Grid item xs={12} key={page.id}>
          <PageCard page={page} />
        </Grid>
      )}
    </Grid>
    <Typography sx={{ px: 2 }}>
      Panel View: {id}
    </Typography>
  </MainLayout>
);

const mapStateToProps = (state) => ({
  pages: state.firestore.ordered.pages,
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(['pages']),
)(BoardView));
