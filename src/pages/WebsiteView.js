import React from 'react';
import { useApp } from 'assets/useApp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Box, Typography, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { format } from 'date-fns';
import withRouter from 'assets/withRouter';
import MainLayout from 'pages/MainLayout';

const WebsiteView = ({ admin, id }) => {
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
      <Box sx={{ p: 2 }}>
        <Typography>
          {admin ? 'Website View Admin' : 'Website View'} : {id}
        </Typography>
      </Box>
    </MainLayout>
  )
};

const mapStateToProps = (state, props) => ({
  website: state.firestore.data[props.id],
});

export default withRouter(compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { storeAs: props.id, collection: 'websites', doc: props.id },
  ]),
)(WebsiteView));
