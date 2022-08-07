import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Notes } from '@mui/icons-material';

const IconBox = () => (
  <Grid
    sx={{ display: 'flex', justifyContent: 'center' }}
    item xs={12} md={4}
  >
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Notes sx={{ mr: 1 }} />
        <Typography variant='h5'>
          Iconbox
        </Typography>
      </Box>
      <Typography variant='subtitle1'>
        Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet
      </Typography>
    </Box>
  </Grid>
);

const IconboxSection = () => (
  <Grid container spacing={2}>
    <IconBox />
    <IconBox />
    <IconBox />
  </Grid>
);

export default IconboxSection;
