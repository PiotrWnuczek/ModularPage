import React, { useState } from 'react';
import { signupUser } from 'redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import FrontLayout from 'organisms/FrontLayout';

const SignupView = () => {
  const [info, setInfo] = useState(false);
  const auth = useSelector(state => state.firebase.auth);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (auth.uid ?
    <Navigate to='/board' /> :
    <FrontLayout>
      <Typography variant='h4' mb={2}>
        Sign Up
      </Typography>
      <Formik
        initialValues={{
          email: '', password: '',
          confirm: '', code: '',
        }}
        onSubmit={(values) => {
          values.password === values.confirm &&
            values.code === process.env.REACT_APP_CODE &&
            dispatch(signupUser({
              email: values.email,
              password: values.password,
            }));
          values.password !== values.confirm && setInfo('password');
          values.code !== process.env.REACT_APP_CODE && setInfo('code');
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ my: 1 }}
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
              sx={{ my: 1 }}
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
              sx={{ my: 1 }}
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
            <TextField
              sx={{ my: 1 }}
              onChange={handleChange}
              value={values.code}
              name='code'
              placeholder='Code'
              label='Code'
              type='text'
              variant='outlined'
              size='small'
              fullWidth
              required
            />
            <Button
              sx={{ my: 1 }}
              type='submit'
              variant='contained'
              size='small'
              fullWidth
            >
              Sign Up
            </Button>
            <Button
              sx={{ mb: 1 }}
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
              {info === 'password' && 'Passowrds are not identical.'}
              {info === 'code' && 'Code is invalid.'}
            </Typography>}
          </form>
        )}
      </Formik>
    </FrontLayout>
  )
};

export default SignupView;
