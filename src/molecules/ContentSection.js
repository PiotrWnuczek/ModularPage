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
        sx={{
          mb: 1, fontSize: { xs: 26, md: 36 },
          fontWeight: 600, letterSpacing: 2,
        }}
        variant='h1'
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
      <Box sx={{
        mt: 1, fontSize: { xs: 14, md: 18 },
        fontWeight: 400, letterSpacing: 1,
      }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.text || 'New Text'}
        </ReactMarkdown>
      </Box>
    </TextEditor>
    {admin && <ButtonOptions section={section} wid={wid}>
      <Button variant='outlined'>
        {section.button || 'New Button'}
      </Button>
    </ButtonOptions>}
    {!admin && <Button
      component={Link}
      href={section.link || '#'}
      target='_blank'
      variant='outlined'
    >
      {section.button || 'New Button'}
    </Button>}
  </Box>
);

export default ContentSection;
