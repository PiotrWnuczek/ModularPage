import React, { useState } from 'react';
import { updateSection, updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Typography, Button } from '@mui/material';
import { TextField, Alert, AlertTitle } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Tab } from '@mui/icons-material';
import { Formik } from 'formik';
import ReactMarkdown from 'react-markdown';

const about = `
* Set button text, url address and opening tab
* Create contact by entering mailto:yourmail@example.com in url field
* Create scroll by entering # and section number from top (e.g. #1) in url field
`;

const ButtonOptions = ({ children, section, wid, lang, idx }) => {
  const button = idx ? 'button' + idx : 'button';
  const link = idx ? 'link' + idx : 'link';
  const tab = idx ? 'tab' + idx : 'tab';
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(section[tab] || 'new');
  const dispatch = useDispatch();

  return (
    <Box>
      <Box
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        {children}
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Button Settings
          </Typography>
          <Box sx={{ py: 1 }}>
            <Alert
              sx={{ mb: 1, py: 0, px: 1 }}
              severity='info'
            >
              <AlertTitle>
                Set button options
              </AlertTitle>
              <ReactMarkdown
                children={about}
                linkTarget='_blank'
                className='about'
              />
            </Alert>
            <Formik
              initialValues={{
                [button]: section[button] || 'New Button',
                [link]: section[link] || '#',
              }}
              onSubmit={(values) => {
                section.id &&
                  (section[tab] !== target || values[button] !== section[button] ||
                    values[link] !== section[link]) &&
                  dispatch(updateSection({
                    values: { ...values, [tab]: target },
                    sid: section.id, wid, lang,
                  }));
                section.type === 'header' &&
                  (section[tab] !== target || values[button] !== section[button] ||
                    values[link] !== section[link]) &&
                  dispatch(updateWebsite({
                    values: {
                      header: lang ?
                        { ...section, [lang]: { ...section[lang], ...values, [tab]: target } } :
                        { ...section, ...values, [tab]: target }
                    }, wid,
                  }));
                setOpen(false);
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values[button]}
                    name={button}
                    placeholder='Text'
                    label='Text'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                    autoFocus
                  />
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values[link]}
                    name={link}
                    placeholder='Url'
                    label='Url'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </form>
              )}
            </Formik>
            <ToggleButtonGroup
              sx={{ my: 1 }}
              value={target}
              onChange={(e, v) => v !== null && setTarget(v)}
              color='primary'
              size='small'
              exclusive
            >
              <ToggleButton value='new'>
                <Tab sx={{ mr: 1 }} />
                Open in New Tab
              </ToggleButton>
              <ToggleButton value='this'>
                <Tab sx={{ mr: 1 }} />
                Open in This Tab
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

export default ButtonOptions;
