import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Picture from 'stock/picture.png';

const HeroSection = ({ lang }) => (
  <Grid
    sx={{ py: 5, px: { xs: 5, md: 30 } }}
    container
  >
    <Grid
      sx={{
        p: 2, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
      }}
      item xs={12} sm={6}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            my: 1, fontSize: { xs: 26, md: 36 },
            fontWeight: 600, letterSpacing: 2,
          }}
          variant='h1'
        >
          {lang === 'en' && 'Launch a website for your product in minutes'}
          {lang === 'pl' && 'Uruchom stronę internetową dla twojego produktu w kilka minut'}
        </Typography>
        <Typography
          sx={{
            my: 2, fontSize: { xs: 14, md: 18 },
            fontWeight: 400, letterSpacing: 1,
          }}
          variant='subtitle1'
        >
          {lang === 'en' && 'Build a website from a few simple modules in minutes, attach a form to sign up for a mailing list or a payment button in a few clicks'}
          {lang === 'pl' && 'Zbuduj stronę z kilku prostych modułów w przeciągu minut, dołącz formularz zapisu na listę mailingową lub przycisk płatności w kilku kliknięciach'}
        </Typography>
      </Box>
    </Grid>
    <Grid
      sx={{
        p: 2, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
      }}
      item xs={12} sm={6}
    >
      <Box
        sx={{
          width: '100%', height: 'auto',
          maxWidth: 400,
        }}
        component='img'
        src={Picture}
      />
    </Grid>
  </Grid>
);

export default HeroSection;
