import React, { useState } from 'react';
import { signupUser } from 'redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import FrontLayout from 'organisms/OriginLayout';

const SignupView = () => {
  const [info, setInfo] = useState(false);
  const auth = useSelector(state => state.firebase.auth);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (auth.uid ?
    <Navigate to={'/board'} /> :
    <FrontLayout>
      <Typography variant='h4' m={2}>
        Sign Up
      </Typography>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirm: '',
        }}
        onSubmit={(values) => {
          if (values.password === values.confirm) {
            dispatch(signupUser({
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              password: values.password,
            }));
          } else { setInfo(true) }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 2 }}
                  onChange={handleChange}
                  value={values.name}
                  placeholder='First Name'
                  label='First Name'
                  name='firstname'
                  type='text'
                  variant='outlined'
                  fullWidth
                  autoFocus
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 2 }}
                  onChange={handleChange}
                  value={values.name}
                  placeholder='Last Name'
                  label='Last Name'
                  name='lastname'
                  type='text'
                  variant='outlined'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
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
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 2 }}
                  onChange={handleChange}
                  value={values.confirm}
                  placeholder='Password'
                  label='Password'
                  name='confirm'
                  type='password'
                  variant='outlined'
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Button
              sx={{ mb: 1 }}
              type='submit'
              variant='contained'
              fullWidth
            >
              Sign Up
            </Button>
            <br />
            <Button
              onClick={() => navigate('/signin')}
              fullWidth
            >
              Sign In
            </Button>
            {error && <p>
              {error.replace('Firebase: ', '').replace(/\(.+\)\.?/, '')}
            </p>}
            {info && <p>
              Passowrds are not identical
            </p>}
          </form>
        )}
      </Formik>
    </FrontLayout>
  )
};

export default SignupView;
