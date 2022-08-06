import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Picture from 'stock/picture.png';

const GraphicSection = () => (
  <Grid container>
    <Grid
      sx={{
        px: 2, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
      }}
      item xs={12} sm={6}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            mb: 1, fontSize: { xs: 26, md: 36 },
            fontWeight: 600, letterSpacing: 2,
          }}
          variant='h1'
        >
          Uruchom stronę internetową dla twojego produktu w kilka minut
        </Typography>
        <Typography
          sx={{
            mt: 1, fontSize: { xs: 14, md: 18 },
            fontWeight: 400, letterSpacing: 1,
          }}
          variant='subtitle1'
        >
          Zbuduj stronę z kilku prostych modułów w przeciągu minut, dołącz formularz zapisu na listę mailingową lub przycisk płatności w kilku kliknięciach
        </Typography>
      </Box>
    </Grid>
    <Grid
      sx={{
        px: 2, display: 'flex', alignItems: 'center',
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

export default GraphicSection;
