import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateWebsite } from 'store/websitesActions';
import { Box, Button } from '@mui/material';
import withRouter from 'assets/withRouter';
import Sitelayout from 'pages/SiteLayout';
import ContentSection from 'organisms/ContentSection';

const WebsiteView = ({ updateWebsite, admin, website }) => (
  <Sitelayout
    admin={admin}
    website={website}
  >
    <Box sx={{ p: 2, textAlign: 'center' }}>
      {website && website.sections.map((section, index) =>
        section.type === 'content' && <ContentSection
          key={index}
          admin={admin}
          website={website}
        />
      )}
      {website && !website.sections.length && <Button
        onClick={() => updateWebsite({
          sections: [...website.sections, { type: 'content' }]
        }, website.name)}
        variant='outlined'
        size='small'
      >
        Add Module
      </Button>}
    </Box>
  </Sitelayout>
);

const mapStateToProps = (state, props) => ({
  website: state.firestore.data[props.id],
});

const mapDispatchToProps = (dispatch) => ({
  updateWebsite: (data, id) => dispatch(updateWebsite(data, id)),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    { storeAs: props.id, collection: 'websites', doc: props.id },
  ]),
)(WebsiteView));
