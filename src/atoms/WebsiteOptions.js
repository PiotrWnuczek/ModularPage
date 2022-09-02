import React, { useState, useEffect } from 'react';
import { updateWebsite, createFile } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, Avatar, Divider } from '@mui/material';
import { TextField, Paper } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { Formik } from 'formik';
import StyleEditor from 'atoms/StyleEditor';

const WebsiteOptions = ({ website }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const initial = {
    fontsize: theme.fontsize,
    fontcolor: theme.palette.fontcolor.main,
    accentcolor: theme.palette.accentcolor.main,
    backgroundcolor: theme.palette.backgroundcolor.main,
  };
  const [style, setStyle] = useState(initial);
  const reset = () => setStyle(initial);
  useEffect(() => {
    setStyle({
      fontsize: theme.fontsize,
      fontcolor: theme.palette.fontcolor.main,
      accentcolor: theme.palette.accentcolor.main,
      backgroundcolor: theme.palette.backgroundcolor.main,
    })
  }, [theme]);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: { 'image/x-icon': ['.ico'] },
    validator: (file) => (file.size > 500 * 1024 && { message: 'File is larger than 0.5 MB' }),
  });

  return (
    <Box>
      <Box sx={{ position: 'fixed', top: 44, right: 44, zIndex: 1200 }}>
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
            {website && website.name} Website Settings
          </Typography>
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
                    sx={{ my: 1 }}
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
              sx={{ my: 1, p: 2, textAlign: 'center', cursor: 'pointer' }}
              {...getRootProps()}
              variant='outlined'
            >
              <Box {...getInputProps()} />
              <Typography>
                {fileRejections[0] && fileRejections[0].errors[0].message}
                {acceptedFiles[0] && 'Selected favicon: ' + acceptedFiles[0].path}
                {!fileRejections[0] && !acceptedFiles[0] && 'Select favicon (.ico file)'}
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
              (style.fontsize !== theme.fontsize ||
                style.fontcolor !== theme.palette.fontcolor.main ||
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
