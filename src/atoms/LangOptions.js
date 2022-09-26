import React, { useState } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, Alert, AlertTitle } from '@mui/material';
import { Select, Menu, MenuItem } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const about = `
* Set website language and translation
* Select the language version to edit
`;

const LangOptions = ({ admin, wid, langs, lang }) => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [select, setSelect] = useState({
    lang1: 'en', lang2: 'en', lang3: 'en',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flags = { en: 'gb' };
  const options = [
    ['en', 'English'],
    ['pl', 'Polish'],
    ['de', 'German'],
    ['ru', 'Russian'],
  ];

  return (
    <Box>
      <Button
        onClick={(e) => admin ? setOpen(true) : setMenu(e.currentTarget)}
        size='small'
      >
        <Box
          sx={{
            width: 30, height: 20, objectFit: 'cover',
            boxShadow: '0 0 1px 0 gray',
          }}
          component='img'
          src={'https://countryflagsapi.com/svg/' + (flags[lang] || lang || 'gb')}
          alt='flag'
        />
      </Button>
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={() => setMenu(false)}
      >
        <MenuItem onClick={() => { setMenu(false); navigate('/' + wid + '/pl'); }}>
          <Box
            sx={{
              width: 30, height: 20, objectFit: 'cover',
              boxShadow: '0 0 1px 0 gray',
            }}
            component='img'
            src='https://countryflagsapi.com/svg/pl'
            alt='flag'
          />
        </MenuItem>
        <MenuItem onClick={() => { setMenu(false); navigate('/' + wid + '/en'); }}>
          <Box
            sx={{
              width: 30, height: 20, objectFit: 'cover',
              boxShadow: '0 0 1px 0 gray',
            }}
            component='img'
            src='https://countryflagsapi.com/svg/gb'
            alt='flag'
          />
        </MenuItem>
      </Menu>
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
                Set language varsions
              </AlertTitle>
              <ReactMarkdown
                children={about}
                linkTarget='_blank'
                className='about'
              />
            </Alert>
            {['lang1', 'lang2', 'lang3'].map(item =>
              <Box key={item}>
                <Typography>
                  {item === 'lang1' && 'Website Language'}
                  {item === 'lang2' && 'First Translation'}
                  {item === 'lang3' && 'Second Translation'}
                </Typography>
                <Select
                  sx={{ my: 1 }}
                  value={select[item]}
                  onChange={(e) => setSelect({ ...select, [item]: e.target.value })}
                  size='small'
                  fullWidth
                >
                  {options.map(option => <MenuItem value={option[0]} key={option}>
                    {option[1]}
                  </MenuItem>)}
                </Select>
              </Box>
            )}
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
