import React from 'react';
import { signinUser } from 'redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { TextField } from '@mui/material';
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
      <Typography variant='h4' m={2}>
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
              placeholder='Email'
              label='Email'
              name='email'
              type='email'
              variant='outlined'
              fullWidth
              autoFocus
              required
            />
            <TextField
              sx={{ mb: 2 }}
              onChange={handleChange}
              value={values.password}
              placeholder='Password'
              label='Password'
              name='password'
              type='password'
              variant='outlined'
              fullWidth
              required
            />
            <Button
              sx={{ mb: 1 }}
              type='submit'
              variant='contained'
              fullWidth
            >
              Sign In
            </Button>
            <br />
            <Button
              onClick={() => navigate('/signup')}
              fullWidth
            >
              Sign Up
            </Button>
            {error && <p>
              {error.replace('Firebase: ', '').replace(/\(.+\)\.?/, '')}
            </p>}
          </form>
        )}
      </Formik>
    </FrontLayout>
  )
};

export default SigninView;
