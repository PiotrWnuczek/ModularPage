import React from 'react';
import { connect } from 'react-redux';
import { createPage } from 'store/pagesActions';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Box, Button } from '@mui/material';
import MainLayout from 'pages/MainLayout';
import TextInput from 'atoms/TextInput';

const CreateView = ({ createPage, auth }) => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Formik
          initialValues={{
            name: '',
            description: '',
          }}
          onSubmit={(values) => {
            createPage(values);
            navigate('/admin/' + auth.uid);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextInput
                onChange={handleChange}
                value={values.name}
                label='Name'
                name='name'
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
                multiline
                minRows={4}
                required
              />
              <Button
                sx={{ mb: 1 }}
                type='submit'
                variant='contained'
                fullWidth
              >
                Create Page
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

const mapDispatchToPorps = (dispatch) => ({
  createPage: (data) => dispatch(createPage(data)),
});

export default connect(mapStateToProps, mapDispatchToPorps)
  (CreateView);
