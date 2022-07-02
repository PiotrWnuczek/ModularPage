import React from 'react';
import { useApp } from 'assets/useApp';
import { connect } from 'react-redux';
import { createWebsite } from 'store/websitesActions';
import { Formik } from 'formik';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { format } from 'date-fns';
import MainLayout from 'pages/MainLayout';
import TextInput from 'atoms/TextInput';

const CreateView = ({ createWebsite }) => {
  const [sidebar, setSidebar] = useApp();

  return (
    <MainLayout navbar={
      <Box sx={{ display: 'flex', alignItems: 'center', m: { xs: 1.2, sm: 2.2 } }}>
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' }, mr: 2 }}
          onClick={() => setSidebar(!sidebar)}
        >
          <Menu />
        </IconButton>
        <Typography variant='h6'>
          Today is the {format(new Date(), 'do MMMM Y')}
        </Typography>
      </Box>
    }>
      <Box sx={{ p: 5 }}>
        <Formik
          initialValues={{
            title: '',
            description: '',
          }}
          onSubmit={(values) => {
            createWebsite(values);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextInput
                onChange={handleChange}
                value={values.title}
                label='Title'
                name='title'
                type='text'
                size='small'
                autoFocus
                required
              />
              <TextInput
                onChange={handleChange}
                value={values.description}
                label='Description'
                name='description'
                type='text'
                size='small'
                required
              />
              <Button
                sx={{ mb: 1 }}
                type='submit'
                variant='outlined'
                fullWidth
              >
                Create
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
};

const mapDispatchToProps = (dispatch) => ({
  createWebsite: (data) => dispatch(createWebsite(data)),
});

export default connect(null, mapDispatchToProps)
  (CreateView);
