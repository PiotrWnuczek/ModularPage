import React, { useState } from 'react';
import { updateSection } from 'store/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Typography, IconButton } from '@mui/material';
import { Check } from '@mui/icons-material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ModuleLayout from 'organisms/ModuleLayout';

const ContentSection = ({ admin, website, section }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(false);
  const [text, setText] = useState(false);

  return (
    <ModuleLayout admin={admin} website={website}>
      <Box sx={{ textAlign: 'center' }}>
        {!title && <Typography
          sx={{
            cursor: admin && 'pointer',
            my: 1, fontSize: { xs: 26, md: 36 },
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
        {!text && <Typography
          sx={{
            cursor: admin && 'pointer',
            my: 2, fontSize: { xs: 14, md: 18 },
            fontWeight: 400, letterSpacing: 1,
          }}
          onClick={() => admin && setText(true)}
          variant='subtitle1'
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {section.text || 'New Text'}
          </ReactMarkdown>
        </Typography>}
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
      </Box>
    </ModuleLayout>
  )
};

export default ContentSection;
