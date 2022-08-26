import React, { useState } from 'react';
import { signupUser } from 'redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import FrontLayout from 'organisms/FrontLayout';

const SignupView = () => {
  const auth = useSelector(state => state.firebase.auth);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState(false);

  return (auth.uid ?
    <Navigate to='/board' /> :
    <FrontLayout>
      <Typography variant='h4' mb={2}>
        Sign Up
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirm: '',
        }}
        onSubmit={(values) => {
          if (values.password === values.confirm) {
            dispatch(signupUser({
              email: values.email,
              password: values.password,
            }));
          } else { setInfo(true) }
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
            <TextField
              sx={{ mb: 2 }}
              onChange={handleChange}
              value={values.confirm}
              name='confirm'
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
              Sign Up
            </Button>
            <br />
            <Button
              onClick={() => navigate('/signin')}
              variant='outlined'
              size='small'
              fullWidth
            >
              Sign In
            </Button>
            {error && <Typography>
              {error.replace('Firebase: ', '').replace(/\(.+\)\.?/, '')}
            </Typography>}
            {info && <Typography>
              Passowrds are not identical
            </Typography>}
          </form>
        )}
      </Formik>
    </FrontLayout>
  )
};

export default SignupView;
