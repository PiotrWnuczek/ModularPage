import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { AppBar, Toolbar, Divider, Link, SvgIcon } from '@mui/material';
import { ReactComponent as English } from 'stock/english.svg';
import { ReactComponent as Polish } from 'stock/polish.svg';

const BasicLayout = ({ children, lang }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar color='secondary' elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', mx: { xs: 5, md: 30 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                cursor: 'pointer', fontSize: { xs: 14, md: 18 },
                fontWeight: 600, letterSpacing: 1,
              }}
              onClick={() => navigate('/' + lang)}
              variant='subtitle1'
            >
              Modular Page
            </Typography>
            {lang === 'pl' && <IconButton
              sx={{ mx: 2 }}
              onClick={() => navigate('/en')}
            >
              <SvgIcon children={<English />} />
            </IconButton>}
            {lang === 'en' && <IconButton
              sx={{ mx: 2 }}
              onClick={() => navigate('/pl')}
            >
              <SvgIcon children={<Polish />} />
            </IconButton>}
          </Box>
          <Button
            component={Link}
            href='mailto:contact@piotrwnuczek.pl'
            variant='contained'
          >
            {lang === 'en' && 'Contact'}
            {lang === 'pl' && 'Kontakt'}
          </Button>
        </Toolbar>
        <Divider />
      </AppBar>
      <Toolbar />
      {children}
    </Box>
  )
};

export default BasicLayout;
