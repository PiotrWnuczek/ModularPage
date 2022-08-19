import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Box, Grid, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { Formik } from 'formik';
import FormOptions from 'atoms/FormOptions';

const MailingSection = ({ admin, website, section }) => {
  const firebase = useFirebase();
  const senderFunction = (email) => {
    const sender = firebase.functions().httpsCallable('sender');
    sender({ email, group: section.group }).then((result) => console.log(result));
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
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
      {admin && <FormOptions section={section} wid={website.name}>
        <Grid sx={{ px: { xs: 5, md: 10 } }} container spacing={1}>
          <Grid item xs={12} sm={9}>
            <TextField
              sx={{ backgroundColor: 'secondary.light', borderRadius: 1 }}
              placeholder='Email'
              name='email'
              autoComplete='off'
              variant='outlined'
              size='small'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              sx={{ py: 0.85 }}
              variant='contained'
              fullWidth
            >
              Zapisz się
            </Button>
          </Grid>
        </Grid>
      </FormOptions>}
      {!admin && <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, { resetForm }) => {
          senderFunction(values.email);
          resetForm();
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
                  Zapisz się
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>}
    </Box>
  )
};

export default MailingSection;
