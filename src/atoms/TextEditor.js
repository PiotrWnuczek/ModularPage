import React, { useState } from 'react';
import { updateSection, updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import { Check } from '@mui/icons-material';
import { Formik } from 'formik';

const TextEditor = ({ children, type, admin, section, wid, idx }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const title = idx ? 'title' + idx : 'title';
  const text = idx ? 'text' + idx : 'text';

  return (
    <Box>
      {!edit && <Box
        sx={{ cursor: admin && 'pointer' }}
        onClick={() => admin && setEdit(true)}
      >
        {children}
      </Box>}
      {edit && admin && type === 'title' && <Formik
        initialValues={{ [title]: section[title] || 'New Title' }}
        onSubmit={(values) => {
          section.id && (values[title] !== section[title]) &&
            dispatch(updateSection({ values, sid: section.id, wid }));
          section.type === 'header' && (values[title] !== section[title]) &&
            dispatch(updateWebsite({
              values: { header: { ...section, ...values } }, wid,
            }));
          setEdit(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextField
              sx={{ my: 0 }}
              onChange={handleChange}
              value={values[title]}
              name={title}
              placeholder='Title'
              label='Title'
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
      {edit && admin && type === 'text' && <Formik
        initialValues={{ [text]: section[text] || 'New Text' }}
        onSubmit={(values) => {
          section.id && (values[text] !== section[text]) &&
            dispatch(updateSection({ values, sid: section.id, wid }));
          section.type === 'footer' && (values[text] !== section[text]) &&
            dispatch(updateWebsite({
              values: { footer: { ...section, ...values } }, wid,
            }));
          setEdit(false);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onBlur={handleSubmit} onSubmit={handleSubmit} autoComplete='off'>
            <TextField
              sx={{ my: 1 }}
              onChange={handleChange}
              value={values[text]}
              name={text}
              placeholder='Text'
              label='Text'
              type='text'
              variant='outlined'
              size='small'
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
