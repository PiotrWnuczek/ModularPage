import React, { useState, useEffect } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Button, Link } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Helmet } from 'react-helmet';
import WebsiteFinish from 'atoms/WebsiteFinish';
import WebsiteOptions from 'atoms/WebsiteOptions';
import SectionCreate from 'atoms/SectionCreate';
import BlockTemplate from 'molecules/BlockTemplate';
import HeaderSection from 'molecules/HeaderSection';
import FooterSection from 'molecules/FooterSection';

const WebsiteView = ({ admin, host }) => {
  const { id, lang } = useParams();
  const wid = id ? id : host;
  const website = useSelector(state => state.firestore.data[wid]);
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect([{ storeAs: wid, collection: 'websites', doc: wid }]);
  const dispatch = useDispatch();
  const [data, setData] = useState(website && [...website.sections]);
  useEffect(() => { setData(website && [...website.sections]) }, [website]);
  const access = website && admin && auth.uid === website.uid;
  const ws = website && website.style;
  const theme = createTheme({
    palette: {
      fontcolor: { main: (ws && ws.fontcolor) || '#444444' },
      accentcolor: { main: (ws && ws.accentcolor) || '#1976d2', contrastText: 'white' },
      backgroundcolor: { main: (ws && ws.backgroundcolor) || '#f5f5f5' },
      info: blueGrey,
    },
    typography: {
      title: {
        fontSize: 32, fontWeight: 600, letterSpacing: 2,
        [createTheme().breakpoints.down('md')]: { fontSize: 28 },
      },
      text: {
        fontSize: 17, fontWeight: 400, letterSpacing: 1,
        [createTheme().breakpoints.down('md')]: { fontSize: 15 },
      },
    },
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1700 } },
  });
  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const items = data;
    const [removed] = items.splice(source.index, 1);
    items.splice(destination.index, 0, removed);
    setData(items);
    dispatch(updateWebsite({
      values: { sections: items },
      wid: website.name,
    }));
  };
  const wl = website && website.langs;
  const language = (wl && wl.lang0 === lang && 'lang0') ||
    (wl && wl.lang1 === lang && 'lang1') ||
    (wl && wl.lang2 === lang && 'lang2');

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>{website && website.title}</title>
        <link rel='icon' href={website && website.favicon} />
        <html lang={lang || 'en'} />
        {website && website.gtag && <script
          src={`https://www.googletagmanager.com/gtag/js?id=${website.gtag}`}
          async
        />}
        {website && website.gtag && <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${website.gtag}');
          `}
        </script>}
      </Helmet>
      {access && <WebsiteFinish website={website} />}
      {access && <WebsiteOptions website={website} />}
      {access && website && !website.sections.length && <Box
        sx={{ py: 10, display: 'flex', justifyContent: 'center' }}
      >
        <SectionCreate wid={website.name} index={0} start />
      </Box>}
      <Box sx={{
        color: 'fontcolor.main', bgcolor: 'backgroundcolor.main', wordWrap: 'break-word',
      }}>
        {website && website.header && (website.public || access) && <HeaderSection
          header={{ ...website.header, ...website.header[language] }}
          section={website.header} admin={access} wid={website.name}
          logo={website.logo} langs={website.langs} lang={language}
        />}
        {access && <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data && data.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <BlockTemplate
                          admin={access}
                          section={item}
                          wid={website.name}
                          index={index + 1}
                          drag={provided.dragHandleProps}
                          dragging={snapshot.isDragging}
                          lang={language}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>}
        {!access && website && website.public &&
          data && data.map((item, index) => (
            <BlockTemplate
              key={item.id}
              admin={access}
              section={item}
              wid={website.name}
              uid={website.uid}
              index={index + 1}
              lang={language}
            />
          ))}
        {website && website.footer && (website.public || access) && <FooterSection
          footer={{ ...website.footer, ...website.footer[language] }}
          section={website.footer} admin={access}
          wid={website.name} lang={language}
        />}
      </Box>
      {!access && !(website && website.public) &&
        <Box sx={{ textAlign: 'center', m: 5 }}>
          <Typography variant='h6'>
            Page not public
          </Typography>
          <Button
            component={Link}
            href='https://modularpage.com/app'
            size='small'
          >
            Modular Page
          </Button>
        </Box>
      }
    </ThemeProvider>
  )
};

export default WebsiteView;
