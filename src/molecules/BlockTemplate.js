import React, { useState } from 'react';
import { Box, Avatar } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import SectionCreate from 'atoms/SectionCreate';
import SectionOptions from 'atoms/SectionOptions';
import SectionRemove from 'atoms/SectionRemove';
import ContentSection from 'molecules/ContentSection';
import GraphicSection from 'molecules/GraphicSection';
import IconboxSection from 'molecules/IconboxSection';
import MailingSection from 'molecules/MailingSection';
import SellingSection from 'molecules/SellingSection';

const BlockTemplate = ({ admin, website, section, drag }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        py: { xs: admin ? 0 : 6, md: admin && hover ? 0 : 6 },
        px: { xs: 6, md: 24 },
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {admin && <Box sx={{
        pt: 1.6, pb: 0.6,
        display: { xs: 'flex', md: hover ? 'flex' : 'none' },
        alignItems: 'center', justifyContent: 'center',
      }}>
        <SectionOptions section={section} />
        <Avatar
          sx={{
            width: 30, height: 30, mx: 0.3,
            cursor: 'pointer', bgcolor: 'info.main',
            '&:hover': { bgcolor: 'info.dark' },
          }}
          {...drag}
        >
          <DragIndicator />
        </Avatar>
      </Box>}
      {section.type === 'content' && <ContentSection
        admin={admin}
        website={website}
        section={section}
      />}
      {section.type === 'graphic' && <GraphicSection
        admin={admin}
        website={website}
        section={section}
      />}
      {section.type === 'iconbox' && <IconboxSection
        admin={admin}
        website={website}
        section={section}
      />}
      {section.type === 'mailing' && <MailingSection
        admin={admin}
        website={website}
        section={section}
      />}
      {section.type === 'selling' && <SellingSection
        admin={admin}
        website={website}
        section={section}
      />}
      {admin && <Box sx={{
        pb: 1.6, pt: 0.6,
        display: { xs: 'flex', md: hover ? 'flex' : 'none' },
        alignItems: 'center', justifyContent: 'center',
      }}>
        <SectionCreate wid={website.name} />
        <SectionRemove sid={section.id} wid={website.name} />
      </Box>}
    </Box>
  )
};

export default BlockTemplate;
