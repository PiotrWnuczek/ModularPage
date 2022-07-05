import React from 'react';
import { Container, Box } from '@mui/material';
import { Card, Typography } from '@mui/material';

const FrontLayout = ({ children }) => (
  <Box sx={{
    height: '100vh', display: 'flex', textAlign: 'center',
    alignItems: 'center', justifyContent: 'center',
  }}>
    <Container maxWidth='sm'>
      <Card
        sx={{
          bgcolor: 'inherit', m: 2,
          px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 }
        }}
        variant='outlined'
      >
        {children}
      </Card>
      <Typography sx={{ mt: 2 }}>
        Copyright © ModularPage
      </Typography>
    </Container>
  </Box>
);

export default FrontLayout;
