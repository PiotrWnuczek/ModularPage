import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box, Avatar, Tooltip } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import SectionCreate from 'atoms/SectionCreate';
import SectionOptions from 'atoms/SectionOptions';
import RemoveConfirm from 'atoms/RemoveConfirm';
import ContentSection from 'molecules/ContentSection';
import GraphicSection from 'molecules/GraphicSection';
import IconboxSection from 'molecules/IconboxSection';
import MailingSection from 'molecules/MailingSection';
import SellingSection from 'molecules/SellingSection';

const BlockTemplate = ({ admin, section, wid, uid, index, drag, dragging }) => {
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
        fontSize: ss.fontsize === 'l' ? 20 : 17, fontWeight: 400, letterSpacing: 1,
        [outer.breakpoints.down('md')]: { fontSize: ss.fontsize === 'l' ? 18 : 15 },
      },
    } : outer.typography,
    fontsize: ss ? ss.fontsize : outer.fontsize,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={section.type === 'graphic' ? {
          py: sl && sl.variant === 'wide' ? { xs: 3, md: 0 } : 6,
          px: sl && sl.variant === 'wide' ? 0 : { xs: 5, md: 30, xl: 40 },
          position: 'relative', display: 'flex', justifyContent: 'center',
          color: 'fontcolor.main', bgcolor: 'backgroundcolor.main',
        } : {
          px: sl && sl.variant === 'wide' ? { xs: 4, md: 22, xl: 32 } : { xs: 6, md: 33, xl: 43 },
          py: 6, position: 'relative', display: 'flex', justifyContent: 'center',
          color: 'fontcolor.main', bgcolor: 'backgroundcolor.main',
        }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {admin && <Box sx={{
          pt: 1.6, pb: 0.6, zIndex: 100, position: 'absolute', top: 0,
          display: { xs: 'flex', md: (hover || dragging) ? 'flex' : 'none' },
        }}>
          <SectionOptions section={section} wid={wid} hover={hover} />
          <Avatar
            sx={{
              width: 30, height: 30, mx: 0.3,
              cursor: 'pointer', bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
            {...drag}
          >
            {hover ? <Tooltip title='drag nad drop section' arrow>
              <DragIndicator />
            </Tooltip> : <DragIndicator />}
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
          uid={uid}
          section={section}
        />}
        {section.type === 'selling' && <SellingSection
          admin={admin}
          wid={wid}
          section={section}
        />}
        {admin && <Box sx={{
          pb: 1.6, pt: 0.6, zIndex: 100, position: 'absolute', bottom: 0,
          display: { xs: 'flex', md: (hover || dragging) ? 'flex' : 'none' },
        }}>
          <SectionCreate wid={wid} index={index} hover={hover} />
          <RemoveConfirm
            sid={section.id} wid={wid} type='section' hover={hover}
            file={section.type === 'graphic' && section.url}
          />
        </Box>}
      </Box>
    </ThemeProvider>
  )
};

export default BlockTemplate;
