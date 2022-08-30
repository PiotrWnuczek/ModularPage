import React, { useState } from 'react';
import { createWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Card, CardHeader, Avatar } from '@mui/material';
import { TextField, CardActionArea } from '@mui/material';
import { Dns, Wysiwyg } from '@mui/icons-material';
import { Formik } from 'formik';
import { header, footer } from 'stock/sections';
import { content, graphic, iconbox, mailing, selling } from 'stock/sections';
import MainLayout from 'organisms/MainLayout';
import WarningWindow from 'atoms/WarningWindow';

const CreateView = () => {
  const error = useSelector(state => state.websites.error);
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  const websites = useSelector(state => state.firestore.ordered.websites);
  const domains = websites && websites.filter(website => website.domain === 'custom').length;
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  useFirestoreConnect([{ collection: 'websites', where: [['email', '==', auth.email]] }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [domain, setDomain] = useState('app');
  const [template, setTemplate] = useState('landing');
  const [warning, setWarning] = useState(false);
  const sections = template === 'landing' ? [
    graphic, iconbox, mailing, content,
  ] : template === 'product' ? [
    graphic, iconbox, selling, content,
  ] : [];

  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Typography variant='h6'>
          Select Domain Variant
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
              subheader='Free - modularpage.com/YourWebsiteName'
            />
          </CardActionArea>
        </Card>
        <Card
          sx={{ my: 1, bgcolor: 'secondary.light', borderRadius: 2 }}
          variant='outlined'
        >
          <CardActionArea onClick={() => {
            profile.premium.toDate() < new Date() ? setWarning('plan') : setDomain('custom');
          }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: domain === 'custom' && 'primary.main' }}>
                  <Dns />
                </Avatar>
              }
              title='Custom Domain'
              subheader='Premium - YourDomain.com - set your DNS to: ns1.small.pl, ns2.small.pl'
            />
          </CardActionArea>
        </Card>
        <Typography variant='h6'>
          Select Page Temaplate
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
              subheader='Page template with mailing form'
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
              subheader='Page template with payment buttons'
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
        <Typography variant='h6'>
          Create New Website
        </Typography>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(values) => {
            domain === 'app' && websites.length < profile.limit.all &&
              dispatch(createWebsite({
                values: { ...values, domain, template, sections, header, footer },
                navigate,
              }));
            domain === 'custom' && websites.length < profile.limit.all &&
              domains.length < profile.limits.custom &&
              dispatch(createWebsite({
                values: { ...values, domain, template, sections, header, footer },
                navigate,
              }));
            websites.length >= profile.limit.all && setWarning('all');
            domains.length >= profile.limits.custom && setWarning('custom');
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
              <TextField
                sx={{ my: 1 }}
                onChange={handleChange}
                value={domain === 'app' ? values.name.replace(/\./g, '') : values.name}
                placeholder={domain === 'app' ? 'Website Name' : 'Domain Name'}
                label={domain === 'app' ? 'Website Name' : 'Domain Name'}
                name='name'
                type='text'
                size='small'
                variant='outlined'
                fullWidth
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
          size='small'
        >
          Create Website
        </Button>
      </Box>
      <WarningWindow
        warning={warning ? true : false}
        setWarning={setWarning}
        title='Upgrade Plan'
        text={
          warning === 'plan' ?
            'To add custom domain upgrade your plan to premium.' :
            'Your ' + warning + ' domains limit has expired, upgrade your plan to premium.'
        }
        button={<Button
          onClick={() => navigate('/account')}
          variant='contained'
          size='small'
        >
          Upgrade Plan
        </Button>}
      />
    </MainLayout >
  )
};

export default CreateView;
