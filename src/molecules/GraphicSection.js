import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import { Link, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Picture from 'stock/picture.png';
import TextEditor from 'atoms/TextEditor';
import ButtonOptions from 'atoms/ButtonOptions';
import ImageOptions from 'atoms/ImageOptions';

const GraphicSection = ({ admin, section, wid, lang }) => {
  const sl = section.layout;

  return (
    <Grid
      sx={{ flexDirection: section.position === 'left' ? 'row-reverse' : 'row' }}
      container
    >
      <Grid
        sx={{ px: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        item xs={12} md={6}
      >
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <TextEditor
            admin={admin} section={section}
            wid={wid} lang={lang} type='title'
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
            wid={wid} lang={lang} type='text'
          >
            <Typography
              sx={{ mt: 1, textAlign: (sl && sl.textalign) || 'center' }}
              variant='text'
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget='_blank'>
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
                section={section} idx={idx}
                wid={wid} lang={lang}
              >
                <Button
                  sx={{ mb: 1 }}
                  variant='contained'
                  color='accentcolor'
                >
                  {section['button' + idx] || 'New Button'}
                </Button>
              </ButtonOptions>}
              {!admin && <Button
                sx={{ mb: 1 }}
                component={Link}
                onClick={() => {
                  const l = section['link' + idx];
                  const qs = l[0] === '#' && document.querySelector('#' + l.replace('#', 's'));
                  qs && qs.scrollIntoView({ behavior: 'smooth' });
                }}
                href={section['link' + idx][0] === '#' ? null : section['link' + idx] || null}
                target={section['tab' + idx] === 'new' ? '_blank' : '_self'}
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
          px: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
          maxHeight: sl && sl.variant === 'wide' ? 700 : 500,
        }}
        item xs={12} md={6}
      >
        <ImageOptions admin={admin} section={section} wid={wid}>
          <Box
            sx={{
              width: '100%', height: '100%', objectFit: 'cover',
              maxWidth: sl && sl.variant === 'wide' ? 700 : 500,
            }}
            src={section.url || Picture}
            component='img'
          />
        </ImageOptions>
      </Grid>
    </Grid>
  )
};

export default GraphicSection;
