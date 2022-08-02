import React from 'react';
import { createSection } from 'store/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import SiteLayout from 'pages/SiteLayout';
import ContentSection from 'organisms/ContentSection';
import GraphicSection from 'organisms/GraphicSection';
import IconSection from 'organisms/IconSection';
import MailingSection from 'organisms/MailingSection';
import SellingSection from 'organisms/SellingSection';

const WebsiteView = ({ admin, draft, host }) => {
  const { id } = useParams();
  const wid = id ? id : host;
  const website = useSelector(state => state.firestore.data[wid]);
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ storeAs: wid, collection: 'websites', doc: wid }]);
  const dispatch = useDispatch();
  const access = website && admin && auth.email === website.email;
  const vision = website && draft && auth.email === website.email;
  const random = Math.random().toString(16).slice(2);

  return (
    <SiteLayout
      admin={access || vision}
      website={website}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        {website && website.sections.map((section, index) =>
          <Box key={index}>
            {section.type === 'content' && <ContentSection
              section={section}
              admin={access}
              website={website}
            />}
            {section.type === 'graphic' && <GraphicSection
              section={section}
              admin={access}
              website={website}
            />}
            {section.type === 'icon' && <IconSection
              section={section}
              admin={access}
              website={website}
            />}
            {section.type === 'mailing' && <MailingSection
              section={section}
              admin={access}
              website={website}
            />}
            {section.type === 'selling' && <SellingSection
              section={section}
              admin={access}
              website={website}
            />}
          </Box>
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
