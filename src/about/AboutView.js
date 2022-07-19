import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Formik } from 'formik';
import TextInput from 'atoms/TextInput';

const AboutView = () => (
  <Box sx={{ textAlign: 'center' }}>
    <Box sx={{ p: 5, mx: 30 }}>
      <Typography variant='h3'>
        Uruchom stronę internetową dla twojego produktu w kilka minut
      </Typography>
      <Typography variant='h6'>
        Zbuduj stronę z kilku prostych modułów w przeciągu minut, dołącz formularz zapisu na listę mailingową lub przycisk płatności w kilku kliknięciach
      </Typography>
      <Typography variant='h6'>
        Wybierz minimalizm i szybkość zamiast przeklikiwać się przez setki opcji rozbudowanych kreatorów
      </Typography>
    </Box>
    <Box sx={{ p: 5, mx: 50 }}>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextInput
              onChange={handleChange}
              value={values.email}
              label='Email'
              name='email'
              type='email'
              size='small'
              autoFocus
              required
            />
            <Button
              sx={{ mb: 1 }}
              type='submit'
              variant='contained'
              fullWidth
            >
              Sign In
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  </Box>
);

export default AboutView;
