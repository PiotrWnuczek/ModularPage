import React, { useState } from 'react';
import { updateWebsite, createFile } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';
import { Dialog, AppBar, Toolbar } from '@mui/material';
import { Alert, Link, Divider, Paper } from '@mui/material';
import { TextField, CircularProgress } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Style } from '@mui/icons-material';
import { Formik } from 'formik';
import Logo from 'stock/logo.png';
import ButtonOptions from 'atoms/ButtonOptions';
import LangOptions from 'atoms/LangOptions';

const HeaderSection = ({ admin, header, section, logo, langs, lang, wid }) => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState(header.variant || 'all');
  const loading = useSelector(state => state.websites.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.png'] },
    validator: (file) => (file.size > 500 * 1024 && { message: 'Max file size is 0.5 MB' }),
  });
  const hv = header.variant;

  return (
    <Box>
      <AppBar color='backgroundcolor' elevation={0}>
        <Toolbar sx={{
          color: 'fontcolor.main', justifyContent: 'space-between', mx: { xs: 1, md: 10 },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => admin ? setOpen(true) : navigate('')}
            >
              {(!hv || (hv && (hv === 'logo' || hv === 'all'))) && <Box>
                {(!loading || loading !== 'logo') && <Box
                  sx={{ width: 40, height: 40, mx: 1 }}
                  src={logo || Logo}
                  component='img'
                />}
                {loading === 'logo' && <CircularProgress sx={{ mx: 1 }} />}
              </Box>}
              {(!hv || (hv && (hv === 'title' || hv === 'all'))) && <Typography variant='title'>
                <Box sx={{ fontSize: '60%' }}>
                  {header.title || 'New Title'}
                </Box>
              </Typography>}
            </Box>
            <LangOptions
              admin={admin} wid={wid}
              langs={langs} lang={lang}
            />
          </Box>
          {admin && <ButtonOptions
            section={section}
            wid={wid} lang={lang}
          >
            <Button
              sx={{ my: 1 }}
              variant='contained'
              color='accentcolor'
            >
              {header.button || 'New Button'}
            </Button>
          </ButtonOptions>}
          {!admin && <Button
            sx={{ my: 1 }}
            component={Link}
            onClick={() => {
              const l = header.link;
              const qs = l[0] === '#' && document.querySelector('#' + l.replace('#', 's'));
              qs && qs.scrollIntoView({ behavior: 'smooth' });
            }}
            href={header.link[0] === '#' ? null : header.link || null}
            target={header.tab === 'new' ? '_blank' : '_self'}
            variant='contained'
            color='accentcolor'
          >
            {header.button || 'New Button'}
          </Button>}
        </Toolbar>
        <Divider />
      </AppBar>
      <Toolbar />
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Logo Settings
          </Typography>
          <Box sx={{ py: 1 }}>
            <Alert
              sx={{ mb: 1, py: 0, px: 1 }}
              severity='info'
            >
              Set title, upload logo
              and enable elements in header
            </Alert>
            <Formik
              initialValues={{ title: header.title || 'New Title' }}
              onSubmit={(values) => {
                (values.title !== header.title || variant !== header.variant) &&
                  dispatch(updateWebsite({
                    values: {
                      header: lang ?
                        { ...section, variant, [lang]: { ...section[lang], ...values } } :
                        { ...section, ...values, variant }
                    }, wid,
                  }));
                acceptedFiles[0] &&
                  dispatch(createFile({
                    file: acceptedFiles[0], sid: 'logo', wid,
                  }));
                setOpen(false);
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values.title}
                    name='title'
                    placeholder='Title'
                    label='Title'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                    autoFocus
                  />
                </form>
              )}
            </Formik>
            <Paper
              sx={{ my: 1, p: 1, textAlign: 'center', cursor: 'pointer' }}
              {...getRootProps()}
              variant='outlined'
            >
              <Box {...getInputProps()} component='input' />
              <Typography>
                {fileRejections[0] && fileRejections[0].errors[0].message}
                {acceptedFiles[0] && 'Selected logo: ' + acceptedFiles[0].path}
                {!fileRejections[0] && !acceptedFiles[0] && 'Select logo (.jpg or .png file)'}
                <br /> Drag and drop or click to {acceptedFiles[0] ? 'change' : 'select'} logo
              </Typography>
            </Paper>
            <ToggleButtonGroup
              sx={{ my: 1 }}
              value={variant}
              onChange={(e, v) => v !== null && setVariant(v)}
              color='primary'
              size='small'
              exclusive
            >
              <ToggleButton value='logo'>
                <Style sx={{ mr: 1 }} />
                Only Logo
              </ToggleButton>
              <ToggleButton value='title'>
                <Style sx={{ mr: 1 }} />
                Only Title
              </ToggleButton>
              <ToggleButton value='all'>
                <Style sx={{ mr: 1 }} />
                Logo and Title
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Button
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
      </Dialog>
    </Box>
  )
};

export default HeaderSection;
