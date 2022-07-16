import React from 'react';
import { createSection } from 'store/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import SiteLayout from 'pages/SiteLayout';
import ContentSection from 'organisms/ContentSection';

const WebsiteView = ({ admin }) => {
  const { id } = useParams();
  const website = useSelector(state => state.firestore.data[id]);
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ storeAs: id, collection: 'websites', doc: id }]);
  const dispatch = useDispatch();
  const access = website && admin && auth.email === website.email;
  const random = Math.random().toString(16).slice(2);

  return (
    <SiteLayout
      admin={access}
      website={website}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        {website && website.sections.map((section, index) =>
          section.type === 'content' && <ContentSection
            key={index} section={section}
            admin={access}
            website={website}
          />
        )}
        {website && !website.sections.length && <Button
          onClick={() => dispatch(createSection({
            values: { id: random, type: 'content' },
            wid: website.name,
          }))}
          variant='outlined'
          size='small'
        >
          Add Section
        </Button>}
      </Box>
    </SiteLayout>
  )
};

export default WebsiteView;
