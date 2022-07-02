import React from 'react';
import { Container, Card, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledWrapper = styled('div')({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const FrontLayout = ({ children }) => (
  <StyledWrapper>
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
      <Typography mt={2}>
        Copyright © ReactFirebase
      </Typography>
    </Container>
  </StyledWrapper>
);

export default FrontLayout;
