import React, { useState } from 'react';
import { createFile } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';
import { Dialog, Alert, AlertTitle } from '@mui/material';
import { Paper, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const about = `
* Search for illustrations on [freepik.com](https://freepik.com)
* Search for images on [pixabay.com](https://pixabay.com)
* Create your own graphics in [canva.com](https://canva.com/)
* Compress files on [compresspng.com](https://compresspng.com)
`;

const ImageOptions = ({ children, admin, section, wid }) => {
  const [open, setOpen] = useState(false);
  const loading = useSelector(state => state.websites.loading);
  const dispatch = useDispatch();
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.png'] },
    validator: (file) => (file.size > 500 * 1024 && { message: 'Max file size is 0.5 MB' }),
  });

  return (
    <Box>
      <Box
        sx={{
          cursor: admin && 'pointer', position: 'relative', textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onClick={() => { admin && setOpen(true) }}
      >
        <Box sx={{ opacity: admin && loading === section.id && 0.5 }}>
          {children}
        </Box>
        {admin && <Box sx={{ position: 'absolute' }}>
          {loading === section.id && <CircularProgress size={100} />}
        </Box>}
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Image Upload
          </Typography>
          <Box sx={{ py: 1 }}>
            <Alert
              sx={{ mb: 2, py: 0, px: 1 }}
              severity='info'
            >
              <AlertTitle>
                Upload new image
              </AlertTitle>
              <ReactMarkdown
                children={about}
                linkTarget='_blank'
                className='about'
              />
            </Alert>
            <Paper
              sx={{ my: 1, p: 1, textAlign: 'center', cursor: 'pointer' }}
              {...getRootProps()}
              variant='outlined'
            >
              <Box {...getInputProps()} />
              <Typography>
                {fileRejections[0] && fileRejections[0].errors[0].message}
                {acceptedFiles[0] && 'Selected image: ' + acceptedFiles[0].path}
                {!fileRejections[0] && !acceptedFiles[0] && 'Select image (.jpg or .png file)'}
                <br /> Drag and drop or click to {acceptedFiles[0] ? 'change' : 'select'} file
              </Typography>
            </Paper>
          </Box>
          <Button
            onClick={() => {
              acceptedFiles[0] &&
                dispatch(createFile({
                  file: acceptedFiles[0], sid: section.id, wid,
                }));
              setOpen(false);
            }}
            variant='contained'
            size='small'
          >
            Upload Image
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
      </Dialog>
    </Box>
  )
};

export default ImageOptions;
