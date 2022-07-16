import React from 'react';
import { signinUser } from 'store/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Formik } from 'formik';
import FrontLayout from 'pages/FrontLayout';
import TextInput from 'atoms/TextInput';

const SigninView = () => {
  const auth = useSelector(state => state.firebase.auth);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (auth.uid ?
    <Navigate to={'/admin'} /> :
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
            <TextInput
              onChange={handleChange}
              value={values.email}
              label='Email'
              name='email'
              type='email'
              autoFocus
              required
            />
            <TextInput
              onChange={handleChange}
              value={values.password}
              label='Password'
              name='password'
              type='password'
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
            {error && <p>{error}</p>}
          </form>
        )}
      </Formik>
    </FrontLayout>
  )
};

export default SigninView;
