import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'stock/image.png';
import TextEditor from 'atoms/TextEditor';
import ButtonOptions from 'atoms/ButtonOptions';
import ImageOptions from 'atoms/ImageOptions';

const HeroSection = ({ admin, section, wid, lang }) => {
  const sl = section.layout;

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ zIndex: 100, position: 'absolute', top: 0, width: '100%', height: '10%' }} />
      <Box sx={{ zIndex: 100, position: 'absolute', bottom: 0, width: '100%', height: '10%' }} />
      <Box sx={{
        width: '100%', height: '100%', position: 'absolute',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Box sx={{
          width: '100%', textAlign: 'center', zIndex: 100,
          mx: sl && sl.variant === 'wide' ?
            { xs: 4, md: 6, lg: 16, xl: 36 } : { xs: 4, md: 12, lg: 32, xl: 52 },
        }}>
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
      </Box>
      <ImageOptions admin={admin} section={section} wid={wid}>
        <Box
          sx={{
            maxHeight: 500, opacity: 0.2,
            width: '100%', height: '100%', objectFit: 'cover',
          }}
          src={section.url || Image}
          component='img'
        />
      </ImageOptions>
    </Box>
  )
};

export default HeroSection;
