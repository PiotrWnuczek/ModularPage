import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { AppBar, Toolbar, Divider, Link } from '@mui/material';

const BasicLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar color='secondary' elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', mx: { xs: 5, md: 30 } }}>
          <Typography
            sx={{
              cursor: 'pointer', fontSize: { xs: 14, md: 18 },
              fontWeight: 600, letterSpacing: 1,
            }}
            onClick={() => navigate('/')}
            variant='subtitle1'
          >
            Modular Page
          </Typography>
          <Button
            component={Link}
            href='mailto:modularpagecom@gmail.com'
            variant='contained'
          >
            Kontakt
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
