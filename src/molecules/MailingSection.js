import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Box, Grid, Typography } from '@mui/material';
import { Dialog, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';
import FormOptions from 'atoms/FormOptions';

const MailingSection = ({ admin, section, wid, uid }) => {
  const [success, setSuccess] = useState(false);
  const firebase = useFirebase();
  const senderFunction = (email) => {
    const sender = firebase.functions().httpsCallable('sender');
    sender({ uid, email, group: section.group });
  };
  const mailerliteFunction = (email) => {
    const mailerlite = firebase.functions().httpsCallable('mailerlite');
    mailerlite({ uid, email, group: section.group });
  };
  const sl = section.layout;

  return (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
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
          sx={{ mt: 1, textAlign: (sl && sl.textalign) || 'center' }}
          variant='text'
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget='_blank'>
            {section.text || 'New Text'}
          </ReactMarkdown>
        </Typography>
      </TextEditor>
      {admin && <FormOptions section={section} wid={wid}>
        <Grid sx={{ px: { lg: 7 } }} container spacing={1}>
          <Grid item xs={12} sm={9}>
            <TextField
              sx={{
                borderRadius: 1, bgolor: 'backgroundcolor.main',
                input: { color: 'fontcolor.main' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'fontcolor.main' },
                  '&:hover fieldset': { borderColor: 'fontcolor.main' },
                  '&.Mui-focused fieldset': { borderColor: 'fontcolor.main' },
                },
              }}
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
          resetForm(); setSuccess(true);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid sx={{ px: { lg: 7 } }} container spacing={1}>
              <Grid item xs={12} sm={9}>
                <TextField
                  sx={{
                    borderRadius: 1, bgolor: 'backgroundcolor.main',
                    input: { color: 'fontcolor.main' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'fontcolor.main' },
                      '&:hover fieldset': { borderColor: 'fontcolor.main' },
                      '&.Mui-focused fieldset': { borderColor: 'fontcolor.main' },
                    },
                  }}
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
      {sl && sl.quantity === '2' && <Typography variant='caption'>
        Subscribing you accept rules and privacy.
      </Typography>}
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={success}
        onClose={() => setSuccess(false)}
        fullWidth
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant='h5'>
            Subscription Success
          </Typography>
          <Button
            sx={{ mt: 2 }}
            onClick={() => (setSuccess(false))}
            variant='contained'
            size='small'
          >
            Return to Page
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default MailingSection;
