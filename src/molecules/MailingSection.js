import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Box, Grid, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';
import FormOptions from 'atoms/FormOptions';

const MailingSection = ({ admin, website, section }) => {
  const firebase = useFirebase();
  const senderFunction = (email) => {
    const sender = firebase.functions().httpsCallable('sender');
    sender({ email, group: section.group }).then((result) => console.log(result));
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <TextEditor
        type='title'
        admin={admin}
        section={section}
        wid={website.name}
      >
        <Typography
          sx={{
            mb: 1, fontSize: { xs: 26, md: 36 },
            fontWeight: 600, letterSpacing: 2,
          }}
          variant='h1'
        >
          {section.title || 'New Title'}
        </Typography>
      </TextEditor>
      <TextEditor
        type='text'
        admin={admin}
        section={section}
        wid={website.name}
      >
        <Box sx={{
          mt: 1, fontSize: { xs: 14, md: 18 },
          fontWeight: 400, letterSpacing: 1,
        }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {section.text || 'New Text'}
          </ReactMarkdown>
        </Box>
      </TextEditor>
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
              {section.button}
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
                  {section.button}
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
