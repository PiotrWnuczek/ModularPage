import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Typography } from '@mui/material';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';

const WebsiteView = ({ id, website, admin }) => (
  <MainLayout>
    <Box sx={{ p: 2 }}>
      <Typography>
        {admin ? 'Website View Admin' : 'Website View'}
      </Typography>
      <Typography>
        {id} | {website && website.name}
      </Typography>
    </Box>
  </MainLayout>
);

const mapStateToProps = (state, props) => ({
  website: state.firestore.data[props.id],
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { storeAs: props.id, collection: 'websites', doc: props.id },
  ]),
)(WebsiteView));
