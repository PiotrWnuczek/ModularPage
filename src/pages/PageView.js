import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updatePage } from 'store/pagesActions';
import { Box, Button } from '@mui/material';
import withRouter from 'assets/withRouter';
import PageLayout from 'pages/PageLayout';
import TextModule from 'organisms/TextModule';

const PageView = ({ updatePage, admin, page }) => {
  const random = Math.random().toString(16).slice(2);

  return (
    <PageLayout
      admin={admin}
      page={page}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        {page && page.modules.map((module, index) =>
          module.type === 'content' && <TextModule
            key={index}
            admin={admin}
            page={page}
            module={module}
          />
        )}
        {page && !page.modules.length && <Button
          onClick={() => updatePage({
            modules: [...page.modules, { id: random, type: 'content' }]
          }, page.name)}
          variant='outlined'
          size='small'
        >
          Add Module
        </Button>}
      </Box>
    </PageLayout>
  )
};

const mapStateToProps = (state, props) => ({
  page: state.firestore.data[props.id],
});

const mapDispatchToProps = (dispatch) => ({
  updatePage: (data, id) => dispatch(updatePage(data, id)),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    { storeAs: props.id, collection: 'pages', doc: props.id },
  ]),
)(PageView));
