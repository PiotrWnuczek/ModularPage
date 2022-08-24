import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';
import ButtonOptions from 'atoms/ButtonOptions';

const ContentSection = ({ admin, section, wid }) => (
  <Box sx={{ textAlign: 'center' }}>
    <TextEditor
      type='title'
      admin={admin}
      section={section}
      wid={wid}
    >
      <Typography
        sx={{ mb: 1 }}
        variant='title'
      >
        {section.title || 'New Title'}
      </Typography>
    </TextEditor>
    <TextEditor
      type='text'
      admin={admin}
      section={section}
      wid={wid}
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
    {[1, 2].map(idx => <Box
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
    </Box>)}
  </Box>
);

export default ContentSection;
