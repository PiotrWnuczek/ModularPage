import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Button } from '@mui/material';
import { Card, Typography, Link } from '@mui/material';

const FrontLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      height: '100vh', display: 'flex', textAlign: 'center',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Container maxWidth='sm'>
        <Card
          sx={{
            bgcolor: 'inherit', borderRadius: 2, m: 2,
            px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 }
          }}
          variant='outlined'
        >
          {children}
        </Card>
        <Box sx={{
          py: 1, display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Typography>
            Copyright © modularpage.com created by
          </Typography>
          <Link
            sx={{ ml: 0.5 }}
            href='https://piotrwnuczek.pl'
            target='_blank'
            underline='hover'
          >
            Piotr Wnuczek
          </Link>
        </Box>
        <Button
          onClick={() => navigate('/')}
          size='small'
        >
          About App
        </Button>
      </Container>
    </Box>
  )
};

export default FrontLayout;
