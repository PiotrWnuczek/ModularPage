import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';

const FooterSection = ({ admin, footer, wid }) => (
  <Box sx={{ py: 6, px: { xs: 6, md: 24 }, textAlign: 'center' }}>
    <TextEditor
      type='text'
      admin={admin}
      section={footer}
      wid={wid}
    >
      <Typography variant='text'>
        <Box sx={{ fontSize: '90%' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {footer.text || 'New Text'}
          </ReactMarkdown>
        </Box>
      </Typography>
    </TextEditor>
  </Box>
);

export default FooterSection;
