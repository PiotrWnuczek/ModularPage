import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createSection } from 'store/websitesActions';
import { Box, Button } from '@mui/material';
import withRouter from 'assets/withRouter';
import SiteLayout from 'pages/SiteLayout';
import ContentSection from 'organisms/ContentSection';

const WebsiteView = ({ createSection, auth, admin, website }) => {
  const random = Math.random().toString(16).slice(2);
  const access = website && admin && auth.email === website.email;

  return (
    <SiteLayout
      admin={access}
      website={website}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        {website && website.sections.map((section, index) =>
          section.type === 'content' && <ContentSection
            key={index}
            admin={access}
            website={website}
            section={section}
          />
        )}
        {website && !website.sections.length && <Button
          onClick={() => createSection({
            id: random, type: 'content',
          }, website.name)}
          variant='outlined'
          size='small'
        >
          Add Section
        </Button>}
      </Box>
    </SiteLayout>
  )
};

const mapStateToProps = (state, props) => ({
  website: state.firestore.data[props.id],
  auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch) => ({
  createSection: (data, wid) => dispatch(createSection(data, wid)),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    { storeAs: props.id, collection: 'websites', doc: props.id },
  ]),
)(WebsiteView));
