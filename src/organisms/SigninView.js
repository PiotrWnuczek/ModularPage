import React from 'react';
import { signinUser } from 'redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Typography, TextField } from '@mui/material';
import { Formik } from 'formik';
import FrontLayout from 'organisms/FrontLayout';

const SigninView = () => {
  const auth = useSelector(state => state.firebase.auth);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (auth.uid ?
    <Navigate to='/board' /> :
    <FrontLayout>
      <Typography variant='h4' mb={2}>
        Sign In
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          dispatch(signinUser(values));
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ mb: 2 }}
              onChange={handleChange}
              value={values.email}
              name='email'
              placeholder='Email'
              label='Email'
              type='email'
              variant='outlined'
              size='small'
              fullWidth
              autoFocus
              required
            />
            <TextField
              sx={{ mb: 2 }}
              onChange={handleChange}
              value={values.password}
              name='password'
              placeholder='Password'
              label='Password'
              type='password'
              variant='outlined'
              size='small'
              fullWidth
              required
            />
            <Button
              sx={{ mb: 1 }}
              type='submit'
              variant='contained'
              size='small'
              fullWidth
            >
              Sign In
            </Button>
            <br />
            <Button
              onClick={() => navigate('/signup')}
              variant='outlined'
              size='small'
              fullWidth
            >
              Sign Up
            </Button>
            {error && <Typography>
              {error.replace('Firebase: ', '').replace(/\(.+\)\.?/, '')}
            </Typography>}
          </form>
        )}
      </Formik>
    </FrontLayout>
  )
};

export default SigninView;
