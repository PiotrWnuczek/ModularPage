import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import { Link, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'stock/image.png';
import Foto from 'stock/foto.png';
import TextEditor from 'atoms/TextEditor';
import ButtonOptions from 'atoms/ButtonOptions';
import ImageOptions from 'atoms/ImageOptions';

const GraphicSection = ({ admin, section, wid }) => {
  const sl = section.layout;
  const alt = sl && sl.variant === 'wide' ? Foto : Image;

  return (
    <Grid
      sx={{ flexDirection: sl && sl.position === 'left' ? 'row-reverse' : 'row' }}
      container
    >
      <Grid
        sx={{
          px: sl && sl.variant === 'wide' ? { xs: 4, md: 8, lg: 12, xl: 22 } : 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        item xs={12} md={6}
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
              sx={{ mt: 1, textAlign: (sl && sl.align) || 'center' }}
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
                section={section}
                wid={wid} idx={idx}
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
                href={section['link' + idx] || '#'}
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
          px: sl && sl.variant === 'wide' ? 0 : 2,
          maxHeight: 400, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}
        item xs={12} md={6}
      >
        <ImageOptions admin={admin} section={section} wid={wid}>
          <Box
            sx={{
              maxWidth: sl && sl.variant === 'wide' ? 1000 : 400,
              width: '100%', height: '100%', objectFit: 'cover',
            }}
            src={section.url || alt}
            component='img'
          />
        </ImageOptions>
      </Grid>
    </Grid>
  )
};

export default GraphicSection;
