import React, { useState } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { Box, Avatar, Tooltip } from '@mui/material';
import { DragIndicator, Loop } from '@mui/icons-material';
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
  const dispatch = useDispatch();
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
        fontSize: sl.fontsize === 'l' ? 36 : 32, fontWeight: 600, letterSpacing: 2,
        [outer.breakpoints.down('md')]: { fontSize: sl.fontsize === 'l' ? 32 : 28 },
      },
      text: {
        fontSize: sl.fontsize === 'l' ? 20 : 17, fontWeight: 400, letterSpacing: 1,
        [outer.breakpoints.down('md')]: { fontSize: sl.fontsize === 'l' ? 18 : 15 },
      },
    } : outer.typography,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={section.type === 'graphic' ? {
          py: sl && sl.variant === 'wide' ? { xs: 3, md: 0 } : 6,
          px: sl && sl.variant === 'wide' ? 0 : { xs: 5, md: 10, lg: 30, xl: 50 },
          position: 'relative', display: 'flex', justifyContent: 'center',
          color: 'fontcolor.main', bgcolor: 'backgroundcolor.main',
        } : {
          px: sl && sl.variant === 'wide' ?
            { xs: 4, md: 8, lg: 26, xl: 46 } : { xs: 6, md: 12, lg: 34, xl: 54 },
          py: 6, position: 'relative', display: 'flex', justifyContent: 'center',
          color: 'fontcolor.main', bgcolor: 'backgroundcolor.main',
        }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {admin && (hover || dragging) && <Box sx={{
          bgcolor: 'black', opacity: 0.03, position: 'absolute',
          top: 0, width: '100%', height: '100%', zIndex: 1,
        }} />}
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
          {section.type === 'graphic' && <Avatar
            sx={{
              width: 30, height: 30, mx: 0.3,
              cursor: 'pointer', bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
            onClick={() => dispatch(updateSection({
              values: {
                layout: !sl ? { position: 'left' } :
                  { ...sl, position: sl.position === 'right' ? 'left' : 'right' }
              }, sid: section.id, wid,
            }))}
          >
            {hover ? <Tooltip title='change image position' arrow>
              <Loop />
            </Tooltip> : <Loop />}
          </Avatar>}
        </Box>}
        <Box sx={{ zIndex: 10 }} id={'s' + index}>
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
        </Box>
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
