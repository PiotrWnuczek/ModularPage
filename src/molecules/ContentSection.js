import React, { useState } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { TextField, IconButton } from '@mui/material';
import { Check } from '@mui/icons-material';
import { Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ContentSection = ({ admin, website, section }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(false);
  const [text, setText] = useState(false);

  return (
    <Box sx={{ textAlign: 'center' }}>
      {!title && <Typography
        sx={{
          cursor: admin && 'pointer',
          mb: 1, fontSize: { xs: 26, md: 36 },
          fontWeight: 600, letterSpacing: 2,
        }}
        onClick={() => admin && setTitle(true)}
        variant='h1'
      >
        {section.title || 'New Title'}
      </Typography>}
      {title && admin && <Formik
        initialValues={{ title: section.title || 'New Title' }}
        onSubmit={(values) => {
          values.title !== section.title &&
            dispatch(updateSection({ values, sid: section.id, wid: website.name }));
          setTitle(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextField
              sx={{ my: 0 }}
              onChange={handleChange}
              value={values.title}
              placeholder='Title'
              label='Title'
              name='title'
              type='text'
              size='small'
              variant='outlined'
              fullWidth
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
        sx={{
          cursor: admin && 'pointer',
          mt: 1, fontSize: { xs: 14, md: 18 },
          fontWeight: 400, letterSpacing: 1,
        }}
        onClick={() => admin && setText(true)}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.text || 'New Text'}
        </ReactMarkdown>
      </Box>}
      {text && admin && <Formik
        initialValues={{ text: section.text || 'New Text' }}
        onSubmit={(values) => {
          values.text !== section.text &&
            dispatch(updateSection({ values, sid: section.id, wid: website.name }));
          setText(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextField
              sx={{ mt: 1, mb: 0 }}
              onChange={handleChange}
              value={values.text}
              placeholder='Text'
              label='Text'
              name='text'
              type='text'
              size='small'
              variant='outlined'
              fullWidth
              multiline
              minRows={3}
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
    </Box>
  )
};

export default ContentSection;
