import React from 'react';
import { createWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import MainLayout from 'organisms/MainLayout';

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
              <TextField
                sx={{ mb: 2 }}
                onChange={handleChange}
                value={values.name}
                placeholder='Name'
                label='Name'
                name='name'
                type='text'
                size='small'
                variant='outlined'
                fullWidth
                autoFocus
                required
              />
              <TextField
                sx={{ mb: 2 }}
                onChange={handleChange}
                value={values.description}
                placeholder='Description'
                label='Description'
                name='description'
                type='text'
                size='small'
                variant='outlined'
                fullWidth
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
