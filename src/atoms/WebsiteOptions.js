import React, { useState, useEffect } from 'react';
import { updateWebsite, createFile } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import { Box, Dialog, Paper, Button } from '@mui/material';
import { Typography, Avatar, Divider } from '@mui/material';
import { TextField, Alert, AlertTitle } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { Formik } from 'formik';
import StyleEditor from 'atoms/StyleEditor';
import ReactMarkdown from 'react-markdown';

const about = `
* Set basic styles for website and add title, description and upload favicon
* Select colors or choose your own in [canva.com/colors](https://canva.com/colors/)
`;

const WebsiteOptions = ({ website }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const initial = {
    fontcolor: theme.palette.fontcolor.main,
    accentcolor: theme.palette.accentcolor.main,
    backgroundcolor: theme.palette.backgroundcolor.main,
  };
  const [style, setStyle] = useState(initial);
  const reset = () => setStyle(initial);
  useEffect(() => {
    setStyle({
      fontcolor: theme.palette.fontcolor.main,
      accentcolor: theme.palette.accentcolor.main,
      backgroundcolor: theme.palette.backgroundcolor.main,
    })
  }, [theme]);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.ico', '.png'] },
    validator: (file) => (file.size > 500 * 1024 && { message: 'File is larger than 0.5 MB' }),
  });

  return (
    <Box>
      <Box sx={{ position: 'fixed', top: 36, right: 0, zIndex: 1200 }}>
        <Box sx={{
          p: 1, bgcolor: 'white', borderRadius: '30px 0 0 30px',
          boxShadow: '0 0 5px 0 lightgray',
        }}>
          <Avatar
            sx={{
              cursor: 'pointer', bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
            onClick={() => setOpen(true)}
          >
            <Settings />
          </Avatar>
        </Box>
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ textTransform: 'capitalize' }}
            variant='h5'
          >
            Default Website Settings
          </Typography>
          <Alert
            sx={{ mt: 1, py: 0, px: 1 }}
            severity='info'
          >
            <AlertTitle>
              Set website options
            </AlertTitle>
            <ReactMarkdown
              children={about}
              linkTarget='_blank'
              className='about'
            />
          </Alert>
          <Box sx={{ py: 2 }}>
            <Formik
              initialValues={{
                title: website.title || 'Meta Title',
                description: website.description || 'Meta Description',
              }}
              onSubmit={(values) => {
                (values.title !== website.title ||
                  values.description !== website.description) &&
                  dispatch(updateWebsite({ values, wid: website.name }));
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                  <TextField
                    sx={{ mb: 1 }}
                    onChange={handleChange}
                    value={values.title}
                    name='title'
                    placeholder='Meta Title'
                    label='Meta Title'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                    autoFocus
                  />
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values.description}
                    name='description'
                    placeholder='Meta Description'
                    label='Meta Description'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </form>
              )}
            </Formik>
            <Paper
              sx={{ mt: 1, p: 1, textAlign: 'center', cursor: 'pointer' }}
              {...getRootProps()}
              variant='outlined'
            >
              <Box {...getInputProps()} component='input' />
              <Typography>
                {fileRejections[0] && fileRejections[0].errors[0].message}
                {acceptedFiles[0] && 'Selected favicon: ' + acceptedFiles[0].path}
                {!fileRejections[0] && !acceptedFiles[0] && 'Select favicon (.ico or .png file)'}
                <br /> Drag and drop or click to {acceptedFiles[0] ? 'change' : 'select'} favicon
              </Typography>
            </Paper>
          </Box>
          <Divider />
          <StyleEditor
            style={style} setStyle={setStyle} reset={reset}
            wid={website.style && website.name}
          />
          <Button
            onClick={() => {
              (style.fontcolor !== theme.palette.fontcolor.main ||
                style.accentcolor !== theme.palette.accentcolor.main ||
                style.backgroundcolor !== theme.palette.backgroundcolor.main) &&
                dispatch(updateWebsite({
                  values: { style }, wid: website.name,
                }));
              acceptedFiles[0] &&
                dispatch(createFile({
                  file: acceptedFiles[0], sid: 'favicon', wid: website.name,
                }));
              setOpen(false);
            }}
            type='submit'
            form='confirm'
            variant='contained'
            size='small'
          >
            Confirm Settings
          </Button>
          <Button
            sx={{ ml: 1 }}
            onClick={() => setOpen(false)}
            variant='outlined'
            size='small'
          >
            Cancel
          </Button>
        </Box>
      </Dialog >
    </Box >
  )
};

export default WebsiteOptions;
