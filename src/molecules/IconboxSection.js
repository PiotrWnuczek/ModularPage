import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import * as icons from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';
import IconOptions from 'atoms/IconOptions';

const IconBox = ({ admin, section, wid, idx }) => {
  const icon = idx ? 'icon' + idx : 'icon';
  const title = idx ? 'title' + idx : 'title';
  const text = idx ? 'text' + idx : 'text';
  const sl = section.layout;

  return (
    <Grid
      sx={{ display: 'flex', justifyContent: 'center' }}
      item xs={12} md={sl ? 12 / sl.quantity : 4}
    >
      <Box sx={{ textAlign: (sl && sl.align) || 'center' }}>
        <Box sx={{
          display: 'flex', alignItems: 'center',
          justifyContent: (sl && sl.align) || 'center',
        }}>
          <IconOptions
            admin={admin} section={section}
            wid={wid} idx={idx}
          >
            <Box
              sx={{ mr: 1, fontSize: 32, color: 'accentcolor.main' }}
              component={icons[section[icon]] || icons.Add}
            />
          </IconOptions>
          <TextEditor
            admin={admin} section={section}
            wid={wid} idx={idx} type='title'
          >
            <Typography variant='title'>
              <Box sx={{ fontSize: '70%' }}>
                {section[title] || 'New Title'}
              </Box>
            </Typography>
          </TextEditor>
        </Box>
        <TextEditor
          admin={admin} section={section}
          wid={wid} idx={idx} type='text'
        >
          <Typography variant='text'>
            <Box sx={{ fontSize: '90%' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {section[text] || 'New Text'}
              </ReactMarkdown>
            </Box>
          </Typography>
        </TextEditor>
      </Box>
    </Grid>
  )
};

const IconboxSection = ({ admin, section, wid }) => {
  const sl = section.layout;

  return (
    <Grid container spacing={2}>
      {Array.from({ length: sl ? Number(sl.quantity) : 3 }, (_, i) => ++i).map(idx =>
        <IconBox
          key={idx} idx={idx} admin={admin}
          section={section} wid={wid}
        />
      )}
    </Grid>
  )
};

export default IconboxSection;
