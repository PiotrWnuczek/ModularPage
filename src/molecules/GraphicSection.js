import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import { Link, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Picture from 'stock/picture.png';
import TextEditor from 'atoms/TextEditor';
import ButtonOptions from 'atoms/ButtonOptions';
import ImageOptions from 'atoms/ImageOptions';

const GraphicSection = ({ admin, section, wid }) => {
  const sl = section.layout;

  return (
    <Grid container>
      <Grid
        sx={{
          px: 2, alignItems: 'center',
          display: 'flex', justifyContent: 'center',
        }}
        item xs={12} sm={6}
      >
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <TextEditor
            admin={admin} section={section}
            wid={wid} type='title'
          >
            <Typography
              sx={{ mb: 1 }}
              variant='title'
            >
              {section.title || 'New Title'}
            </Typography>
          </TextEditor>
          <TextEditor
            admin={admin} section={section}
            wid={wid} type='text'
          >
            <Typography
              sx={{ mt: 1 }}
              variant='text'
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {section.text || 'New Text'}
              </ReactMarkdown>
            </Typography>
          </TextEditor>
          {Array.from({ length: sl ? Number(sl.quantity) : 2 }, (_, i) => ++i).map(idx =>
            <Box
              sx={{ display: 'inline-block', mx: 0.5 }}
              key={idx}
            >
              {admin && <ButtonOptions
                section={section}
                wid={wid} idx={idx}
              >
                <Button
                  variant='contained'
                  color='accentcolor'
                >
                  {section['button' + idx] || 'New Button'}
                </Button>
              </ButtonOptions>}
              {!admin && <Button
                component={Link}
                href={section.link || '#'}
                target='_blank'
                variant='contained'
                color='accentcolor'
              >
                {section['button' + idx] || 'New Button'}
              </Button>}
            </Box>
          )}
        </Box>
      </Grid>
      <Grid
        sx={{
          px: 2, justifyContent: 'center',
          display: 'flex', alignItems: 'center',
        }}
        item xs={12} sm={6}
      >
        <ImageOptions admin={admin} section={section} wid={wid}>
          <Box
            sx={{ width: '100%', height: 'auto', maxWidth: 400 }}
            src={section.url || Picture}
            component='img'
          />
        </ImageOptions>
      </Grid>
    </Grid>
  )
};

export default GraphicSection;
