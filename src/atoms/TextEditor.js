import React, { useState } from 'react';
import { updateSection, updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import { Check } from '@mui/icons-material';
import { Formik } from 'formik';

const TextEditor = ({ children, type, admin, section, wid }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(false);

  return (
    <Box>
      {!text && <Box
        sx={{ cursor: admin && 'pointer' }}
        onClick={() => admin && setText(true)}
      >
        {children}
      </Box>}
      {text && admin && type === 'title' && <Formik
        initialValues={{ title: section.title || 'New Title' }}
        onSubmit={(values) => {
          section.id && (values.title !== section.title) &&
            dispatch(updateSection({ values, sid: section.id, wid }));
          section.type === 'header' && (values.title !== section.title) &&
            dispatch(updateWebsite({
              values: { header: { ...section, ...values } }, wid,
            }));
          setText(false);
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
      {text && admin && type === 'text' && <Formik
        initialValues={{ text: section.text || 'New Text' }}
        onSubmit={(values) => {
          section.id && (values.text !== section.text) &&
            dispatch(updateSection({ values, sid: section.id, wid }));
          section.type === 'footer' && (values.text !== section.text) &&
            dispatch(updateWebsite({
              values: { footer: { ...section, ...values } }, wid,
            }));
          setText(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextField
              sx={{ my: 1 }}
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

export default TextEditor;
