import React from 'react';
import { connect } from 'react-redux';
import { createWebsite } from 'store/websitesActions';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import MainLayout from 'pages/MainLayout';
import TextInput from 'atoms/TextInput';

const CreateView = ({ createWebsite, info, auth }) => {
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
            createWebsite(values);
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
                Create Website
              </Button>
              {info && <p>{info}</p>}
            </form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
};

const mapStateToProps = (state) => ({
  info: state.websites.info,
  auth: state.firebase.auth,
});

const mapDispatchToPorps = (dispatch) => ({
  createWebsite: (data) => dispatch(createWebsite(data)),
});

export default connect(mapStateToProps, mapDispatchToPorps)
  (CreateView);
