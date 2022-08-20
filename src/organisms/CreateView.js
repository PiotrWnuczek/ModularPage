import React, { useState } from 'react';
import { createWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Card, CardHeader, Avatar } from '@mui/material';
import { TextField, CardActionArea } from '@mui/material';
import { Dns, Wysiwyg } from '@mui/icons-material';
import { Formik } from 'formik';
import MainLayout from 'organisms/MainLayout';

const CreateView = () => {
  const error = useSelector(state => state.websites.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [domain, setDomain] = useState('app');
  const [template, setTemplate] = useState('landing');

  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant='body1'>
          Select domain variant
        </Typography>
        <Card
          sx={{ my: 1, bgcolor: 'secondary.light', borderRadius: 2 }}
          variant='outlined'
        >
          <CardActionArea onClick={() => setDomain('app')}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: domain === 'app' && 'primary.main' }}>
                  <Dns />
                </Avatar>
              }
              title='App Domain'
              subheader='Free Option (e.g. modularpage.com/YourWebsiteName)'
            />
          </CardActionArea>
        </Card>
        <Card
          sx={{ my: 1, bgcolor: 'secondary.light', borderRadius: 2 }}
          variant='outlined'
        >
          <CardActionArea onClick={() => setDomain('custom')}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: domain === 'custom' && 'primary.main' }}>
                  <Dns />
                </Avatar>
              }
              title='Custom Domain'
              subheader='Premium Option (e.g. YourDomainName.com)'
            />
          </CardActionArea>
        </Card>
        <Typography variant='body1'>
          Select page temaplate
        </Typography>
        <Card
          sx={{ my: 1, bgcolor: 'secondary.light', borderRadius: 2 }}
          variant='outlined'
        >
          <CardActionArea onClick={() => setTemplate('landing')}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: template === 'landing' && 'primary.main' }}>
                  <Wysiwyg />
                </Avatar>
              }
              title='Landing Page'
              subheader='Page with mailing form'
            />
          </CardActionArea>
        </Card>
        <Card
          sx={{ my: 1, bgcolor: 'secondary.light', borderRadius: 2 }}
          variant='outlined'
        >
          <CardActionArea onClick={() => setTemplate('product')}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: template === 'product' && 'primary.main' }}>
                  <Wysiwyg />
                </Avatar>
              }
              title='Product Page'
              subheader='Page with payments buttons'
            />
          </CardActionArea>
        </Card>
        <Card
          sx={{ my: 1, bgcolor: 'secondary.light', borderRadius: 2 }}
          variant='outlined'
        >
          <CardActionArea onClick={() => setTemplate('blank')}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: template === 'blank' && 'primary.main' }}>
                  <Wysiwyg />
                </Avatar>
              }
              title='Blank Page'
              subheader='Clear page template'
            />
          </CardActionArea>
        </Card>
        <Typography variant='body1'>
          Add name and description
        </Typography>
        <Formik
          initialValues={{
            name: '',
            description: '',
          }}
          onSubmit={(values) => {
            dispatch(createWebsite({
              values: { ...values, domain, template },
              navigate,
            }));
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
              <TextField
                sx={{ my: 1 }}
                onChange={handleChange}
                value={values.name}
                placeholder={domain === 'app' ? 'Website Name' : 'Domain Name'}
                label={domain === 'app' ? 'Website Name' : 'Domain Name'}
                name='name'
                type='text'
                size='small'
                variant='outlined'
                fullWidth
                required
              />
              <TextField
                sx={{ my: 1 }}
                onChange={handleChange}
                value={values.description}
                placeholder='Project Description'
                label='Project Description'
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
        {error && <Typography>{error}</Typography>}
        <Button
          sx={{ my: 1 }}
          type='submit'
          form='confirm'
          variant='contained'
        >
          Create Website
        </Button>
      </Box>
    </MainLayout>
  )
};

export default CreateView;
