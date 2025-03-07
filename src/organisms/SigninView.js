import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { signinUser } from 'redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Typography, TextField } from '@mui/material';
import { Formik } from 'formik';
import FrontLayout from 'organisms/FrontLayout';

const SigninView = () => {
  const [reset, setReset] = useState(false);
  const [info, setInfo] = useState(false);
  const auth = useSelector(state => state.firebase.auth);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const send = async (email) => {
    await sendPasswordResetEmail(getAuth(), email);
    setInfo('reset');
  };

  return (auth.uid ?
    <Navigate to='/board' /> :
    <FrontLayout>
      <Typography variant='h4' mb={2}>
        Sign In
      </Typography>
      <Formik
        initialValues={{
          email: '', password: '',
        }}
        onSubmit={(values) => {
          !reset && dispatch(signinUser(values));
          reset && send(values.email);
          reset && setReset(false);
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
              autoFocus
              required
            />
            {!reset && <TextField
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
            />}
            <Button
              sx={{ my: 1 }}
              type='submit'
              variant='contained'
              size='small'
              fullWidth
            >
              {!reset ? 'Sign In' : 'Reset Password'}
            </Button>
            <Button
              sx={{ mb: 1 }}
              onClick={() => navigate('/signup')}
              variant='outlined'
              size='small'
              fullWidth
            >
              Sign Up
            </Button>
            <Button
              onClick={() => setReset(!reset)}
              variant='outlined'
              size='small'
              fullWidth
            >
              {!reset ? 'Reset Password' : 'Sign In'}
            </Button>
            {error && <Typography>
              {error.replace('Firebase: ', '').replace(/\(.+\)\.?/, '')}
            </Typography>}
            {info && <Typography>
              {info === 'reset' && 'Password reset email sent.'}
            </Typography>}
          </form>
        )}
      </Formik>
    </FrontLayout>
  )
};

export default SigninView;
