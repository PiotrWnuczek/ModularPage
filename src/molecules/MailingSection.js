import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Box, Grid, Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';
import FormOptions from 'atoms/FormOptions';

const MailingSection = ({ admin, section, wid }) => {
  const firebase = useFirebase();
  const senderFunction = (email) => {
    const sender = firebase.functions().httpsCallable('sender');
    sender({ email, group: section.group }).then((result) => console.log(result));
  };
  const mailerliteFunction = (email) => {
    const mailerlite = firebase.functions().httpsCallable('mailerlite');
    mailerlite({ email, group: section.group }).then((result) => console.log(result));
  };
  const sl = section.layout;

  return (
    <Box sx={{ textAlign: (sl && sl.align) || 'center', width: '100%' }}>
      <TextEditor
        admin={admin} section={section}
        wid={wid} type='title'
      >
        <Typography
          sx={{ mb: 1 }}
          variant='title'
        >
          {section.title || 'New Title'}
        </Typography>
      </TextEditor>
      <TextEditor
        admin={admin} section={section}
        wid={wid} type='text'
      >
        <Typography
          sx={{ mt: 1 }}
          variant='text'
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {section.text || 'New Text'}
          </ReactMarkdown>
        </Typography>
      </TextEditor>
      {admin && <FormOptions section={section} wid={wid}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={9}>
            <TextField
              sx={{ bgolor: 'backgroundcolor.main', borderRadius: 1 }}
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
              color='accentcolor'
              fullWidth
            >
              {section.button || 'Subscribe'}
            </Button>
          </Grid>
        </Grid>
      </FormOptions>}
      {!admin && <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, { resetForm }) => {
          section.mailing === 'sender' && senderFunction(values.email);
          section.mailing === 'mailerlite' && mailerliteFunction(values.email);
          resetForm();
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={9}>
                <TextField
                  sx={{ bgolor: 'backgroundcolor.main', borderRadius: 1 }}
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
                  color='accentcolor'
                  fullWidth
                >
                  {section.button || 'Subscribe'}
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
