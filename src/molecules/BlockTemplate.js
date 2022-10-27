import React, { useState } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { Box, Avatar, Tooltip } from '@mui/material';
import { DragIndicator, Loop } from '@mui/icons-material';
import SectionCreate from 'atoms/SectionCreate';
import SectionOptions from 'atoms/SectionOptions';
import RemoveConfirm from 'atoms/RemoveConfirm';
import HeroSection from 'molecules/HeroSection';
import GraphicSection from 'molecules/GraphicSection';
import ContentSection from 'molecules/ContentSection';
import IconboxSection from 'molecules/IconboxSection';
import CardboxSection from 'molecules/CardboxSection';
import MailingSection from 'molecules/MailingSection';
import SellingSection from 'molecules/SellingSection';

const BlockTemplate = ({ admin, section, wid, uid, index, drag, dragging, lang }) => {
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
    typography: sl ? {
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
        sx={{
          px: section.type === 'hero' ? 0 : sl && sl.variant === 'wide' ?
            { xs: 4, md: 6, lg: 16, xl: 36 } : { xs: 4, md: 12, lg: 32, xl: 52 },
          py: section.type === 'hero' ? 0 : sl && sl.variant === 'wide' ? 3 : 6,
          position: 'relative', display: 'flex', justifyContent: 'center',
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
          bgcolor: 'white', borderRadius: 10, boxShadow: '0 0 5px 0 lightgray',
          mt: 0.6, p: 0.6, zIndex: 100, position: 'absolute', top: 0,
          display: { xs: 'flex', md: (hover || dragging) ? 'flex' : 'none' },
        }}>
          <SectionOptions section={section} wid={wid} hover={hover} />
          <Avatar
            sx={{
              width: 30, height: 30, mx: 0.3,
              cursor: 'pointer', bgcolor: 'info.main',
              '&:hover': { bgcolor: 'info.dark' },
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
              cursor: 'pointer', bgcolor: 'info.main',
              '&:hover': { bgcolor: 'info.dark' },
            }}
            onClick={() => dispatch(updateSection({
              values: { position: section.position === 'right' ? 'left' : 'right' },
              sid: section.id, wid,
            }))}
          >
            {hover ? <Tooltip title='change image position' arrow>
              <Loop />
            </Tooltip> : <Loop />}
          </Avatar>}
        </Box>}
        <Box
          sx={{ zIndex: 10, width: '100%' }}
          id={'s' + index}
          className='s'
        >
          {section.type === 'hero' && <HeroSection
            admin={admin} wid={wid} lang={lang}
            section={{ ...section, ...section[lang] }}
          />}
          {section.type === 'graphic' && <GraphicSection
            admin={admin} wid={wid} lang={lang}
            section={{ ...section, ...section[lang] }}
          />}
          {section.type === 'content' && <ContentSection
            admin={admin} wid={wid} lang={lang}
            section={{ ...section, ...section[lang] }}
          />}
          {section.type === 'iconbox' && <IconboxSection
            admin={admin} wid={wid} lang={lang}
            section={{ ...section, ...section[lang] }}
          />}
          {section.type === 'cardbox' && <CardboxSection
            admin={admin} wid={wid} lang={lang}
            section={{ ...section, ...section[lang] }}
          />}
          {section.type === 'mailing' && <MailingSection
            admin={admin} wid={wid} lang={lang} uid={uid}
            section={{ ...section, ...section[lang] }}
          />}
          {section.type === 'selling' && <SellingSection
            admin={admin} wid={wid} lang={lang}
            section={{ ...section, ...section[lang] }}
          />}
        </Box>
        {admin && <Box sx={{
          bgcolor: 'white', borderRadius: 10, boxShadow: '0 0 5px 0 lightgray',
          mb: 0.6, p: 0.6, zIndex: 100, position: 'absolute', bottom: 0,
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
