import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AppBar, Toolbar, Divider, Link } from '@mui/material';

const HeaderSection = () => (
  <Box>
    <AppBar color='secondary' elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', mx: { xs: 5, md: 30 } }}>
        <Typography
          sx={{
            cursor: 'pointer', fontSize: { xs: 14, md: 18 },
            fontWeight: 600, letterSpacing: 1,
          }}
          variant='subtitle1'
        >
          Modular Page
        </Typography>
        <Button
          component={Link}
          href='mailto:contact@piotrwnuczek.pl'
          variant='contained'
        >
          Contact
        </Button>
      </Toolbar>
      <Divider />
    </AppBar>
    <Toolbar />
  </Box>
);

export default HeaderSection;
