import React from 'react';
import { Box, Typography } from '@mui/material';
import { Grid, Card, CardMedia } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'stock/image.png';
import TextEditor from 'atoms/TextEditor';
import ImageOptions from 'atoms/ImageOptions';

const CardBox = ({ admin, section, wid, lang, idx }) => {
  const title = idx ? 'title' + idx : 'title';
  const text = idx ? 'text' + idx : 'text';
  const url = idx ? 'url' + idx : 'url';
  const sl = section.layout;

  return (
    <Grid item xs={12} md={sl ? 12 / sl.quantity : 6}>
      <Card
        sx={{ color: 'fontcolor.main', bgcolor: 'inherit', borderRadius: 2 }}
        variant='outlined'
      >
        <Grid container>
          <Grid item xs={5}>
            <ImageOptions admin={admin} section={section} wid={wid} idx={idx}>
              <CardMedia
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                component='img'
                src={section[url] || Image}
                alt='image'
              />
            </ImageOptions>
          </Grid>
          <Grid
            sx={{ p: 2, display: 'flex', alignItems: 'center' }}
            item xs={7}
          >
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <TextEditor
                admin={admin} section={section} idx={idx}
                wid={wid} lang={lang} type='title'
              >
                <Typography variant='title'>
                  <Box sx={{ fontSize: '75%' }}>
                    {section[title] || 'New Title'}
                  </Box>
                </Typography>
              </TextEditor>
              <TextEditor
                admin={admin} section={section} idx={idx}
                wid={wid} lang={lang} type='text'
              >
                <Typography variant='text'>
                  <Box sx={{ fontSize: '95%', textAlign: (sl && sl.textalign) || 'center' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget='_blank'>
                      {section[text] || 'New Text'}
                    </ReactMarkdown>
                  </Box>
                </Typography>
              </TextEditor>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
};

const CardboxSection = ({ admin, section, wid, lang }) => {
  const sl = section.layout;

  return (
    <Grid container spacing={2}>
      {Array.from({ length: sl ? Number(sl.quantity) : 2 }, (_, i) => ++i).map(idx =>
        <CardBox
          key={idx} idx={idx} admin={admin}
          section={section} wid={wid} lang={lang}
        />
      )}
    </Grid>
  )
};

export default CardboxSection;
