import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Formik } from 'formik';

const FormSection = () => (
  <Box sx={{
    py: 7, px: { xs: 5, md: 30 },
    textAlign: 'center', background: blue[100],
  }}>
    <Typography
      sx={{
        my: 1, fontSize: { xs: 22, md: 32 },
        fontWeight: 600, letterSpacing: 2,
      }}
      variant='h2'
    >
      Zapisz się na listę oczekujących
    </Typography>
    <Typography
      sx={{
        my: 2, fontSize: { xs: 12, md: 16 },
        fontWeight: 400, letterSpacing: 1,
      }}
      variant='subtitle2'
    >
      Wybierz minimalizm i szybkość zamiast przeklikiwać się
      przez setki opcji rozbudowanych kreatorów
    </Typography>
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid sx={{ px: { xs: 5, md: 10 } }} container spacing={1}>
            <Grid item xs={12} sm={9}>
              <TextField
                sx={{ backgroundColor: 'secondary.light', borderRadius: 1 }}
                onChange={handleChange}
                value={values.email}
                placeholder='Email'
                name='email'
                type='email'
                variant='outlined'
                size='small'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                sx={{ py: 0.85 }}
                type='submit'
                variant='contained'
                fullWidth
              >
                Zapisz się
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
    <Typography
      sx={{ mt: 3, fontSize: { xs: 10, md: 12 } }}
      variant='body2'
    >
      Klikając przycisk „zapisz się” wyrażasz zgodę na otrzymywanie na podany adres e-mail newslettera zawierającego informacje o aplikacji ModularPage. Możesz zrezygnować z newslettera w każdym czasie klikając w link „wypisz się z listy” w wiadomości marketingowej. Szczegółowe informacje o przetwarzaniu twoich danych osobowych znajdziesz w Polityce Prywatności.
    </Typography>
  </Box>
);

export default FormSection;
