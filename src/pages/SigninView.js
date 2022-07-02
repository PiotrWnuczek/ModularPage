import React from 'react';
import { connect } from 'react-redux';
import { signinUser } from 'store/usersActions';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Typography } from '@mui/material';
import FrontLayout from 'pages/FrontLayout';
import TextInput from 'atoms/TextInput';

const SigninView = ({ signinUser, error, auth }) => {
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
          signinUser(values);
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

const mapStateToProps = (state) => ({
  error: state.users.error,
  auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signinUser: (creds) => dispatch(signinUser(creds)),
});

export default connect(mapStateToProps, mapDispatchToProps)
  (SigninView);
