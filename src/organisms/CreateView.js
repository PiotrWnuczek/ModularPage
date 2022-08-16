import React, { useState } from 'react';
import { createWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
import { Card, CardHeader, CardActionArea } from '@mui/material';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import MainLayout from 'organisms/MainLayout';

const CreateView = () => {
  const error = useSelector(state => state.websites.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [template, setTemplate] = useState('landing');

  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Typography>
          General
        </Typography>
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
            <form onSubmit={handleSubmit} id='create' autoComplete='off'>
              <TextField
                sx={{ my: 1 }}
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
                sx={{ my: 1 }}
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
                minRows={2}
                required
              />
            </form>
          )}
        </Formik>
        <Typography>
          Template
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: 'inherit',
                borderColor: template === 'landing' && 'primary.main',
                borderWidth: template === 'landing' && 2,
              }}
              variant='outlined'
            >
              <CardActionArea onClick={() => setTemplate('landing')}>
                <CardHeader
                  avatar={<Avatar>L</Avatar>}
                  title='Landing Page'
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: 'inherit',
                borderColor: template === 'product' && 'primary.main',
                borderWidth: template === 'product' && 2,
              }}
              variant='outlined'
            >
              <CardActionArea onClick={() => setTemplate('product')}>
                <CardHeader
                  avatar={<Avatar>P</Avatar>}
                  title='Product Page'
                />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        {error && <Typography>{error}</Typography>}
        <Button
          sx={{ my: 2 }}
          type='submit'
          form='create'
          variant='contained'
          fullWidth
        >
          Create Website
        </Button>
      </Box>
    </MainLayout>
  )
};

export default CreateView;
