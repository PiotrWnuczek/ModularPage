import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const AboutView = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant='h5'>
        Website Creator About
      </Typography>
      <Button
        sx={{ mt: 1, mr: 1 }}
        onClick={() => navigate('/signin')}
        variant='contained'
      >
        SignIn
      </Button>
      <Button
        sx={{ mt: 1 }}
        onClick={() => navigate('/signup')}
        variant='outlined'
      >
        SignUp
      </Button>
    </Box>
  )
};

export default AboutView;
