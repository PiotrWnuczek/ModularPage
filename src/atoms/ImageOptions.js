import React, { useState } from 'react';
import { createFile } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';
import { Dialog, Alert, AlertTitle } from '@mui/material';
import { Paper, CircularProgress } from '@mui/material';

const ImageOptions = ({ children, admin, section, wid }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(false);
  const loading = useSelector(state => state.websites.loading);
  const dispatch = useDispatch();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.png'] }
  });

  return (
    <Box>
      <Box
        sx={{
          cursor: admin && 'pointer', position: 'relative', textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onClick={() => {
          admin && !info && setOpen(true);
          admin && info && setInfo(false);
        }}
      >
        <Box sx={{ opacity: admin && (info || loading) && 0.5 }}>
          {children}
        </Box>
        {admin && <Box sx={{ position: 'absolute' }}>
          {info && <Typography variant='h6'>
            Maximum file size is 500 KB <br />
            Click to return to the previous file
          </Typography>}
          {loading && <CircularProgress size={100} />}
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
              sx={{ my: 1, py: 0, px: 1, borderRadius: 2 }}
              variant='outlined'
              severity='info'
              size='small'
            >
              <AlertTitle>
                Info about section
              </AlertTitle>
              Lorem ipsum dolor sit amet.
            </Alert>
            <Paper
              sx={{ my: 2, p: 2, borderRadius: 2, textAlign: 'center' }}
              {...getRootProps()}
              variant='outlined'
            >
              <Box {...getInputProps()} />
              <Typography>
                Drag and drop file here, or click to select file.
              </Typography>
            </Paper>
            <Typography>
              {acceptedFiles[0] ? 'Selected image: ' + acceptedFiles[0].path : 'Select image'}
            </Typography>
          </Box>
          <Button
            onClick={() => {
              acceptedFiles[0] && acceptedFiles[0].size < 500 * 1024 &&
                dispatch(createFile({
                  file: acceptedFiles[0], sid: section.id, wid,
                }));
              acceptedFiles[0] && acceptedFiles[0].size >= 500 * 1024 &&
                setInfo(true);
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
