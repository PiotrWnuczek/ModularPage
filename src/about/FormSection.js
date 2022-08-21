import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Formik } from 'formik';

const FormSection = ({ lang }) => {
  const [info, setInfo] = useState(false);
  const group = lang === 'en' ? 'e57WNY' : 'e5773A';
  const submit = (values) => {
    const headers = {
      'Authorization': 'Bearer ' + process.env.REACT_APP_SENDER,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    fetch('https://api.sender.net/v2/subscribers', {
      method: 'POST', headers,
      body: JSON.stringify({ 'email': values.email }),
    }).then(() => {
      fetch('https://api.sender.net/v2/subscribers/groups/' + group, {
        method: 'POST', headers,
        body: JSON.stringify({ 'subscribers': [values.email] })
      })
    }).then(setInfo(true))
  };

  return (
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
        {lang === 'en' && 'Subscribe to the waiting list'}
        {lang === 'pl' && 'Zapisz się na listę oczekujących'}
      </Typography>
      <Typography
        sx={{
          my: 2, fontSize: { xs: 12, md: 16 },
          fontWeight: 400, letterSpacing: 1,
        }}
        variant='subtitle2'
      >
        {lang === 'en' && 'Choose minimalism and speed instead of clicking through hundreds of options of extensive wizards'}
        {lang === 'pl' && 'Wybierz minimalizm i szybkość zamiast przeklikiwać się przez setki opcji rozbudowanych kreatorów'}
      </Typography>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, { resetForm }) => {
          submit(values); resetForm();
        }}
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
                  {lang === 'en' && 'Sign up'}
                  {lang === 'pl' && 'Zapisz się'}
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
        {lang === 'en' && (info ?
          'Thank you, more information can be found in the e-mail, check your e-mail address.' :
          'By clicking the "sign up" button, you agree to receive a newsletter containing information about the Modular Page application to the e-mail address provided. You can unsubscribe from the newsletter at any time by clicking the "unsubscribe" link in the marketing message. Detailed information on the processing of your personal data can be found in the Privacy Policy.')}
        {lang === 'pl' && (info ?
          'Dziękuję, więcej informacji znajdziesz w mailu, sprawdź swoją skrzynkę mailową.' :
          'Klikając przycisk „zapisz się” wyrażasz zgodę na otrzymywanie na podany adres e-mail newslettera zawierającego informacje o aplikacji Modular Page. Możesz zrezygnować z newslettera w każdym czasie klikając w link „wypisz się z listy” w wiadomości marketingowej. Szczegółowe informacje o przetwarzaniu twoich danych osobowych znajdziesz w Polityce Prywatności.')}
      </Typography>
    </Box>
  )
};

export default FormSection;
