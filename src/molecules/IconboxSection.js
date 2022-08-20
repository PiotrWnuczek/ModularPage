import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Notes } from '@mui/icons-material';

const IconBox = ({ section }) => (
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
          {section.title || 'New Title'}
        </Typography>
      </Box>
      <Typography variant='subtitle1'>
        {section.text || 'New Text'}
      </Typography>
    </Box>
  </Grid>
);

const IconboxSection = ({ section }) => (
  <Grid container spacing={2}>
    <IconBox section={section} />
    <IconBox section={section} />
    <IconBox section={section} />
  </Grid>
);

export default IconboxSection;
