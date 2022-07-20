import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Formik } from 'formik';

const FormSection = () => {
  const [info, setInfo] = useState(false);

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
        onSubmit={(values) => {
          fetch('https://api.mailerlite.com/api/v2/groups/group_name/subscribers', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'X-MailerLite-ApiDocs': 'true',
              'Content-Type': 'application/json',
              'X-MailerLite-ApiKey': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZWE5ZTkwODcwNzIxNmMzYjRkNDEwYjM3ZjM4ZjgwNTBlOGFhOGE5NGRmNDkwMmUwZTc4ZjhlMDQyZGNmYjgzNDVhZDY4OTlhZWI5YjY2ZmMiLCJpYXQiOjE2NTgzMjUzNzAuNzczMzgsIm5iZiI6MTY1ODMyNTM3MC43NzMzODUsImV4cCI6NDgxMzk5ODk3MC43NjQ1NjksInN1YiI6IjEyODI1OSIsInNjb3BlcyI6W119.w1xVAsgyETTjv0lu1auy0m4oJcp5S8El99Am4uhP7a5Gt9eNUPbW2zE3N3b6i-Fa03iJtDA_XqeG1sjFE-XWcPhSLldkONx2NYJMIWfo3-Ij-qm32-CKefQty5KF_4bfi61NWY8uuTcIcume77v7WDYLfZ8I23TNaROAsXF_zoLISr1hkBO3__uDFOyNvFUA9ra-SVFyQObHt7V6-11s96aH1DV5RBEz68O_Ky2U94HlEL5DWPxj2sUIeKxeKP2ltmqBvLLyf78XmsI0Gh-cbDCHPJsodot-nsInSAbRMYjJt2e5D5kA1HqRNyzFrsA8gPjyzLXkdr_JOZgSHnMSs_bs-PASu7PDx97iSAsvzwjLxkuFgnyb_E-z4heos-0vm99a6AhnmNfxtJwg0H0E0m_LGLL1Zrq46eUHHn8VxKNBrcdZv8oUOKz97orC3blIrgBm_ct7l9RPuxlwc2sM3WLDMig4gtxauaS8OxF00kJohr3C90M_RUNQlCNfht7SLbwIi_xhzCb9mDO3S2v5edrZTMQYL4hhj5NAGD45i5KCLwJToD0xUhfnbZfPuBi0Gz5ens-RUYn8fmklyYJpbGWJqvaQeEpRs8NvXNeccUYNKtITXBcI8h_DlfJnz7X9eQP5TyM0FO-RS6yomKDdMcM0GwRa8VXNNaAcS2Up0tw'
            },
            body: JSON.stringify({ email: values.email, group_name: 'Modular Page' })
          })
            .then(setInfo(true))
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
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
      </Formik>
      <Typography
        sx={{ mt: 3, fontSize: { xs: 10, md: 12 } }}
        variant='body2'
      >
        {info ? 'Dziękuję, więcej informacji znajdziesz w mailu, sprawdź swoją skrzynkę mailową.' : 'Klikając przycisk „zapisz się” wyrażasz zgodę na otrzymywanie na podany adres e-mail newslettera zawierającego informacje o aplikacji ModularPage. Możesz zrezygnować z newslettera w każdym czasie klikając w link „wypisz się z listy” w wiadomości marketingowej. Szczegółowe informacje o przetwarzaniu twoich danych osobowych znajdziesz w Polityce Prywatności.'}
      </Typography>
    </Box>
  )
};

export default FormSection;
