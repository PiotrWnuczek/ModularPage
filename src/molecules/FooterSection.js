import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Button, Link } from '@mui/material';
import { Dialog, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';

const FooterSection = ({ admin, footer, section, wid, lang }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Divider />
      <Box sx={{ py: 3, px: { xs: 6, md: 24 } }}>
        <TextEditor
          admin={admin} section={section} wid={wid}
          lang={lang} idx='info' type='text'
        >
          <Button
            onClick={() => setOpen(true)}
            size='small'
          >
            Rules and Privacy
          </Button>
          <Typography variant='text'>
            <Box sx={{ fontSize: '90%' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget='_blank'>
                {footer.textinfo || 'New Text'}
              </ReactMarkdown>
              Created with {' '}
              <Link href='https://modularpage.com/' target='_blank'>
                modularpage.com
              </Link>
            </Box>
          </Typography>
        </TextEditor>
        <Dialog
          sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
        >
          <Box sx={{ p: 2 }}>
            <TextEditor
              admin={admin} section={section} wid={wid}
              lang={lang} idx='rules' type='title'
            >
              <Typography variant='title'>
                <Box sx={{ fontSize: '60%' }}>
                  {footer.titlerules || 'New Title'}
                </Box>
              </Typography>
            </TextEditor>
            <TextEditor
              admin={admin} section={section} wid={wid}
              lang={lang} idx='rules' type='text'
            >
              <Typography variant='text'>
                <Box sx={{ fontSize: '90%' }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget='_blank'>
                    {footer.textrules || 'New Text'}
                  </ReactMarkdown>
                </Box>
              </Typography>
            </TextEditor>
            <Button
              onClick={() => setOpen(false)}
              variant='contained'
              size='small'
            >
              Return to Website
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Box>
  )
};

export default FooterSection;
