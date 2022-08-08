import React, { useState } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography } from '@mui/material';
import { TextField, IconButton } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Check } from '@mui/icons-material';
import { Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Picture from 'stock/picture.png';

const GraphicSection = ({ admin, website, section }) => {
  const loading = useSelector(state => state.websites.loading);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(false);
  const [text, setText] = useState(false);
  const [info, setInfo] = useState(false);

  return (
    <Grid container>
      <Grid
        sx={{
          px: 2, display: 'flex', alignItems: 'center',
          justifyContent: 'center',
        }}
        item xs={12} sm={6}
      >
        <Box sx={{ textAlign: 'center', width: '100%' }}>
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
      </Grid>
      <Grid
        sx={{
          px: 2, display: 'flex', alignItems: 'center',
          justifyContent: 'center',
        }}
        item xs={12} sm={6}
      >
        <Box
          sx={{
            cursor: admin && 'pointer', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          component='label'
        >
          <Box
            sx={{
              opacity: (info || loading) && 0.5,
              width: '100%', height: 'auto', maxWidth: 400
            }}
            src={section.url || Picture}
            component='img'
          />
          {admin && <Box
            onChange={(e) => {
              if (e.target.files[0] && e.target.files[0].size < 500 * 1024) {
                dispatch(updateSection({
                  file: e.target.files[0],
                  sid: section.id,
                  wid: website.name,
                }));
              } else { setInfo(true) }
            }}
            component='input'
            type='file'
            hidden
          />}
          <Box sx={{ position: 'absolute' }}>
            {info && <Typography variant='h6'>
              Maximum file size is 500 KB
            </Typography>}
            {loading && <CircularProgress size={100} />}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
};

export default GraphicSection;
