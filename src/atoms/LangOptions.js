import React, { useState } from 'react';
import { updateWebsite } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Dialog, Button } from '@mui/material';
import { Grid, Select, Alert, AlertTitle } from '@mui/material';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Edit, Translate } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

const about = `
* Set website language and translation
* Select the language version to edit
`;

const LangOptions = ({ admin, wid, langs, lang }) => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [edit, setEdit] = useState(lang || 'lang0');
  const [select, setSelect] = useState({
    lang0: (langs && langs.lang0) || false,
    lang1: (langs && langs.lang1) || false,
    lang2: (langs && langs.lang2) || false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flags = { en: 'gb' };
  const options = [
    ['en', 'English'],
    ['pl', 'Polish'],
    ['de', 'German'],
    ['es', 'Spanish'],
    ['fr', 'French'],
    ['ru', 'Russian'],
  ];
  const param = langs && (langs[lang] || langs.lang0);
  const cond = langs && langs.lang0 && (langs.lang1 || langs.lang2);

  return (
    <Box>
      {cond && <Box>
        <Button
          sx={{ mx: 1 }}
          onClick={(e) => admin ? setOpen(true) : setMenu(e.currentTarget)}
          size='small'
        >
          <Box
            sx={{
              width: 30, height: 20, objectFit: 'cover',
              boxShadow: '0 0 1px 0 gray',
            }}
            component='img'
            src={'https://countryflagsapi.com/svg/' + (flags[param] || param)}
            alt='flag'
          />
        </Button>
        <Menu
          anchorEl={menu}
          open={Boolean(menu)}
          onClose={() => setMenu(false)}
        >
          {[langs.lang0, langs.lang1, langs.lang2].map((item, idx) =>
            item && item !== param &&
            <MenuItem
              onClick={() => { setMenu(false); navigate('/' + wid + '/' + item); }}
              key={idx}
            >
              <Box
                sx={{
                  width: 30, height: 20, objectFit: 'cover',
                  boxShadow: '0 0 1px 0 gray',
                }}
                component='img'
                src={'https://countryflagsapi.com/svg/' + (flags[item] || item)}
                alt='flag'
              />
            </MenuItem>
          )}
        </Menu>
      </Box>}
      {!cond && admin && <IconButton
        sx={{ mx: 1 }}
        onClick={() => setOpen(true)}
        size='small'
      >
        <Translate />
      </IconButton>}
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
                Set language versions
              </AlertTitle>
              <ReactMarkdown
                children={about}
                linkTarget='_blank'
                className='about'
              />
            </Alert>
            {['lang0', 'lang1', 'lang2'].map(item =>
              <Grid container key={item}>
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{ my: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => {
                      select[item] &&
                        navigate('/admin/' + wid + '/' + select[item]);
                      setEdit(item);
                    }}
                  >
                    <Avatar sx={{ bgcolor: edit === item && 'primary.main' }}>
                      {edit === item && <Edit />}
                      {edit !== item && <Translate />}
                    </Avatar>
                    <Typography sx={{ ml: 1 }}>
                      {item === 'lang0' && 'Website Language'}
                      {item === 'lang1' && 'First Translation'}
                      {item === 'lang2' && 'Second Translation'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Select
                    sx={{ my: 1 }}
                    value={select[item]}
                    onChange={(e) => setSelect({ ...select, [item]: e.target.value })}
                    size='small'
                    fullWidth
                  >
                    <MenuItem value={false}>Language Disabled</MenuItem>
                    {options.map(option =>
                      <MenuItem value={option[0]} key={option[0]}>
                        {option[1]}
                      </MenuItem>
                    )}
                  </Select>
                </Grid>
              </Grid>
            )}
          </Box>
          <Button
            onClick={() => {
              dispatch(updateWebsite({
                values: { langs: select }, wid,
              }));
              setOpen(false);
            }}
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
