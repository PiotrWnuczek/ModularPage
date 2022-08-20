import React from 'react';
import { Box } from '@mui/material';
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
      <Box sx={{
        mt: 1, fontSize: { xs: 14, md: 18 },
        fontWeight: 400, letterSpacing: 1,
      }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {footer.text || 'New Text'}
        </ReactMarkdown>
      </Box>
    </TextEditor>
  </Box>
);

export default FooterSection;
