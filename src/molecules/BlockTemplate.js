import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box, Avatar } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import SectionCreate from 'atoms/SectionCreate';
import SectionOptions from 'atoms/SectionOptions';
import RemoveConfirm from 'atoms/RemoveConfirm';
import ContentSection from 'molecules/ContentSection';
import GraphicSection from 'molecules/GraphicSection';
import IconboxSection from 'molecules/IconboxSection';
import MailingSection from 'molecules/MailingSection';
import SellingSection from 'molecules/SellingSection';

const BlockTemplate = ({ admin, section, wid, index, drag }) => {
  const [hover, setHover] = useState(false);
  const sl = section.layout;
  const ss = section.style;
  const theme = (outer) => ({
    ...outer,
    palette: ss ? {
      ...outer.palette,
      fontcolor: { main: ss.fontcolor },
      accentcolor: { main: ss.accentcolor, contrastText: 'white' },
      backgroundcolor: { main: ss.backgroundcolor },
    } : outer.palette,
    typography: ss ? {
      ...outer.typography,
      title: {
        fontSize: ss.fontsize === 'l' ? 36 : 32, fontWeight: 600, letterSpacing: 2,
        [outer.breakpoints.down('md')]: { fontSize: ss.fontsize === 'l' ? 32 : 28 },
      },
      text: {
        fontSize: ss.fontsize === 'l' ? 18 : 16, fontWeight: 400, letterSpacing: 1,
        [outer.breakpoints.down('md')]: { fontSize: ss.fontsize === 'l' ? 16 : 14 },
      },
    } : outer.typography,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: 6, px: sl && sl.variant === 'wide' ?
            { xs: 4, md: 22 } : { xs: 6, md: 33 },
          position: 'relative', display: 'flex', justifyContent: 'center',
          color: 'fontcolor.main', bgcolor: 'backgroundcolor.main',
        }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {admin && <Box sx={{
          pt: 1.6, pb: 0.6,
          position: 'absolute', top: 0,
          display: { xs: 'flex', md: hover ? 'flex' : 'none' },
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
          position: 'absolute', bottom: 0,
          display: { xs: 'flex', md: hover ? 'flex' : 'none' },
        }}>
          <SectionCreate wid={wid} index={index} />
          <RemoveConfirm
            sid={section.id} wid={wid} type='section'
            file={section.type === 'graphic' && section.url}
          />
        </Box>}
      </Box>
    </ThemeProvider>
  )
};

export default BlockTemplate;
