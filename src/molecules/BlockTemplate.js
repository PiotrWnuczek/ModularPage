import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
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

const BlockTemplate = ({ admin, section, wid, index, drag }) => {
  const [hover, setHover] = useState(false);
  const ss = section && section.style;
  const theme = (outer) => ({
    ...outer,
    palette: ss ? {
      ...outer.palette,
      fontcolor: { main: ss.fontcolor || '#444444' },
      accentcolor: { main: ss.accentcolor || '#1976d2', contrastText: '#ffffff' },
      backgroundcolor: { main: ss.backgroundcolor || '#f5f5f5' },
    } : outer.palette,
    typography: ss ? {
      ...outer.typography,
      title: {
        fontSize: (ss && ss.fontsize === 'l') ? 42 : 36, fontWeight: 600, letterSpacing: 2,
        [outer.breakpoints.down('md')]: { fontSize: (ss && ss.fontsize === 'l') ? 32 : 26 },
      },
      text: {
        fontSize: (ss && ss.fontsize === 'l') ? 22 : 18, fontWeight: 400, letterSpacing: 1,
        [outer.breakpoints.down('md')]: { fontSize: (ss && ss.fontsize === 'l') ? 18 : 14 },
      },
    } : outer.typography,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          color: 'fontcolor.main', bgcolor: 'backgroundcolor.main',
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
          <SectionOptions section={section} wid={wid} />
          <Avatar
            sx={{
              width: 30, height: 30, mx: 0.3,
              cursor: 'pointer', bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
            {...drag}
          >
            <DragIndicator />
          </Avatar>
        </Box>}
        {section.type === 'content' && <ContentSection
          admin={admin}
          wid={wid}
          section={section}
        />}
        {section.type === 'graphic' && <GraphicSection
          admin={admin}
          wid={wid}
          section={section}
        />}
        {section.type === 'iconbox' && <IconboxSection
          admin={admin}
          wid={wid}
          section={section}
        />}
        {section.type === 'mailing' && <MailingSection
          admin={admin}
          wid={wid}
          section={section}
        />}
        {section.type === 'selling' && <SellingSection
          admin={admin}
          wid={wid}
          section={section}
        />}
        {admin && <Box sx={{
          pb: 1.6, pt: 0.6,
          display: { xs: 'flex', md: hover ? 'flex' : 'none' },
          alignItems: 'center', justifyContent: 'center',
        }}>
          <SectionCreate wid={wid} index={index} />
          <SectionRemove
            sid={section.id} wid={wid}
            file={section.type === 'graphic'}
          />
        </Box>}
      </Box>
    </ThemeProvider>
  )
};

export default BlockTemplate;
