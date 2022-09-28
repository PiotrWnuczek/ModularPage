import React from 'react';
import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'stock/image.png';
import TextEditor from 'atoms/TextEditor';

const CardBox = ({ admin, section, wid, idx }) => {
  const title = idx ? 'title' + idx : 'title';
  const text = idx ? 'text' + idx : 'text';
  const sl = section.layout;

  return (
    <Grid item xs={12} md={sl ? 12 / sl.quantity : 6}>
      <Card
        sx={{
          color: 'fontcolor.main', bgcolor: 'inherit',
          display: 'flex', borderRadius: 2,
        }}
        variant='outlined'
      >
        <CardMedia
          component='img'
          image={Image}
          alt='image'
        />
        <Box sx={{ p: 2, textAlign: 'center' }}>
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
      </Card>
    </Grid>
  )
};

const CardboxSection = ({ admin, section, wid, lang }) => {
  const sl = section.layout;

  return (
    <Grid container spacing={2}>
      {Array.from({ length: sl ? Number(sl.quantity) : 3 }, (_, i) => ++i).map(idx =>
        <CardBox
          key={idx} idx={idx} admin={admin}
          section={section} wid={wid} lang={lang}
        />
      )}
    </Grid>
  )
};

export default CardboxSection;
