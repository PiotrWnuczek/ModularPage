import React, { useState } from 'react';
import { createSection, updateSection } from 'store/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { IconButton, Avatar } from '@mui/material';
import { Add, Tune, Check } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ContentSection = ({ admin, website, section }) => {
  const [title, setTitle] = useState(false);
  const [text, setText] = useState(false);
  const dispatch = useDispatch();
  const random = Math.random().toString(16).slice(2);

  return (
    <Box sx={{ py: admin ? 0 : 10, px: { xs: 5, md: 20 } }}>
      {admin && <Box sx={{
        pt: 3, pb: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <Avatar
          sx={{
            cursor: 'pointer', bgcolor: 'info.main',
            '&:hover': { bgcolor: 'info.dark' },
          }}
        >
          <Tune />
        </Avatar>
      </Box>}
      {!title && <Typography
        sx={{ cursor: admin && 'pointer' }}
        onClick={() => admin && setTitle(true)}
        variant='h5'
      >
        {section.title || 'New Title'}
      </Typography>}
      {title && admin && <Formik
        initialValues={{ title: section.title || 'New Title' }}
        onSubmit={(values) => {
          dispatch(updateSection({ values, sid: section.id, wid: website.name }));
          setTitle(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ my: 0 }}
              onChange={handleChange}
              value={values.title}
              label='Title'
              name='title'
              type='text'
              size='small'
              autoFocus
              InputProps={{
                endAdornment: <IconButton
                  sx={{ mx: -1 }}
                  type='submit'
                  size='small'
                >
                  <Check />
                </IconButton>
              }}
            />
          </form>
        )}
      </Formik>}
      {!text && <Box
        sx={{ cursor: admin && 'pointer' }}
        onClick={() => admin && setText(true)}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.text || 'New Text'}
        </ReactMarkdown>
      </Box>}
      {text && admin && <Formik
        initialValues={{ text: section.text || 'New Text' }}
        onSubmit={(values) => {
          dispatch(updateSection({ values, sid: section.id, wid: website.name }));
          setText(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              sx={{ mt: 1, mb: 0 }}
              onChange={handleChange}
              value={values.text}
              label='Text'
              name='text'
              type='text'
              size='small'
              multiline
              rows={3}
              autoFocus
              InputProps={{
                endAdornment: <IconButton
                  sx={{ mx: -1, mb: -0.5, mt: 'auto' }}
                  type='submit'
                  size='small'
                >
                  <Check />
                </IconButton>
              }}
            />
          </form>
        )}
      </Formik>}
      {admin && <Box sx={{
        pb: 3, pt: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <Avatar
          sx={{
            cursor: 'pointer', bgcolor: 'info.main',
            '&:hover': { bgcolor: 'info.dark' },
          }}
          onClick={() => dispatch(createSection({
            values: { id: random, type: 'content' },
            wid: website.name,
          }))}
        >
          <Add />
        </Avatar>
      </Box>}
    </Box>
  )
};

export default ContentSection;
