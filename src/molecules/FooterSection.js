import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const FooterSection = () => (
  <Box sx={{ p: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
);

export default FooterSection;
