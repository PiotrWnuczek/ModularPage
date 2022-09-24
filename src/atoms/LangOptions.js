import React, { useState } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, Alert, AlertTitle } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const about = `
* Set website language and translation
* Select the language version to edit
`;

const LangOptions = ({ children, langs, wid }) => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(langs);
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
            Language Settings
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
            <Typography>
              Website Language
            </Typography>
            <Select
              sx={{ my: 1 }}
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              size='small'
              fullWidth
              autoFocus
            >
              <MenuItem value='en'>
                English
              </MenuItem>
              <MenuItem value='pl'>
                Polish
              </MenuItem>
            </Select>
            <Typography>
              First Translation
            </Typography>
            <Select
              sx={{ my: 1 }}
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              size='small'
              fullWidth
              autoFocus
            >
              <MenuItem value='en'>
                English
              </MenuItem>
              <MenuItem value='pl'>
                Polish
              </MenuItem>
            </Select>
            <Typography>
              Second Translation
            </Typography>
            <Select
              sx={{ my: 1 }}
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              size='small'
              fullWidth
              autoFocus
            >
              <MenuItem value='en'>
                English
              </MenuItem>
              <MenuItem value='pl'>
                Polish
              </MenuItem>
            </Select>
          </Box>
          <Button
            onClick={() => dispatch(updateWebsite({
              values: { lang: { ...langs, lang } }, wid,
            }))}
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

export default LangOptions;
