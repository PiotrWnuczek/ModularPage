import React from 'react';
import { createWebsite } from 'store/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import MainLayout from 'pages/MainLayout';
import TextInput from 'atoms/TextInput';

const CreateView = () => {
  const error = useSelector(state => state.websites.error);
  const dispatch = useDispatch();
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
            dispatch(createWebsite({ values, navigate }));
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
              {error && <p>{error}</p>}
            </form>
          )}
        </Formik>
      </Box>
    </MainLayout>
  )
};

export default CreateView;
