import React from 'react';
import { Box, Typography } from '@mui/material';
import { Button, Link } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import TextEditor from 'atoms/TextEditor';
import ButtonOptions from 'atoms/ButtonOptions';

const ContentSection = ({ admin, section, wid }) => {
  const sl = section.layout;

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
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
          sx={{ mt: 1, textAlign: (sl && sl.textalign) || 'center' }}
          variant='text'
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            linkTarget='_blank'
          >
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
  )
};

export default ContentSection;
