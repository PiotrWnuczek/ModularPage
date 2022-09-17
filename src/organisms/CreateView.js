import React, { useState } from 'react';
import { createWebsite } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Dialog, Button } from '@mui/material';
import { Avatar, TextField, Typography } from '@mui/material';
import { Card, CardActionArea, CardMedia } from '@mui/material';
import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material';
import { CheckBoxOutlined, Edit } from '@mui/icons-material';
import { Formik } from 'formik';
import { header, footer } from 'stock/templates';
import templates from 'stock/templates';
import Landing from 'stock/landing.png';
import Product from 'stock/product.png';
import MainLayout from 'organisms/MainLayout';

const CreateView = () => {
  const [domain, setDomain] = useState('app');
  const [template, setTemplate] = useState('landing');
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const error = useSelector(state => state.websites.error);
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  const websites = useSelector(state => state.firestore.ordered.websites);
  const domains = websites && websites.filter(website => website.domain === 'custom');
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  useFirestoreConnect([{ collection: 'websites', where: [['email', '==', auth.email]] }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sections = templates[template];
  const blocked = ['en', 'pl', 'app', 'signin', 'signup', 'board', 'create', 'account'];

  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
              variant='outlined'
            >
              <CardActionArea onClick={() => setTemplate('landing')}>
                <CardMedia
                  component='img'
                  image={Landing}
                />
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: template === 'landing' && 'primary.main' }}>
                    {template === 'landing' && <CheckBoxOutlined />}
                    {template !== 'landing' && <CheckBoxOutlineBlankOutlined />}
                  </Avatar>
                  <Box sx={{ ml: 1 }}>
                    <Typography>
                      Landing Page
                    </Typography>
                    <Typography variant='body2'>
                      Website with mailing form
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
              variant='outlined'
            >
              <CardActionArea onClick={() => setTemplate('product')}>
                <CardMedia
                  component='img'
                  image={Product}
                />
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: template === 'product' && 'primary.main' }}>
                    {template === 'product' && <CheckBoxOutlined />}
                    {template !== 'product' && <CheckBoxOutlineBlankOutlined />}
                  </Avatar>
                  <Box sx={{ ml: 1 }}>
                    <Typography>
                      Product Page
                    </Typography>
                    <Typography variant='body2'>
                      Website with payment buttons
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
              variant='outlined'
            >
              <CardActionArea onClick={() => setDomain('app')}>
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: domain === 'app' && 'primary.main' }}>
                    {domain === 'app' && <CheckBoxOutlined />}
                    {domain !== 'app' && <CheckBoxOutlineBlankOutlined />}
                  </Avatar>
                  <Box sx={{ ml: 1 }}>
                    <Typography>
                      App Domain
                    </Typography>
                    <Typography variant='body2'>
                      modularpage.com/YourName (free option)
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
              variant='outlined'
            >
              <CardActionArea onClick={() => {
                profile.premium.toDate() < new Date() ? setInfo('plan') : setDomain('custom');
              }}>
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: domain === 'custom' && 'primary.main' }}>
                    {domain === 'custom' && <CheckBoxOutlined />}
                    {domain !== 'custom' && <CheckBoxOutlineBlankOutlined />}
                  </Avatar>
                  <Box sx={{ ml: 1 }}>
                    <Typography>
                      Custom Domain
                    </Typography>
                    <Typography variant='body2'>
                      YourDomain.com (you will receive mail with DNS)
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(values) => {
            domain === 'app' && websites.length < profile.limit.all &&
              !blocked.includes(values.name) &&
              dispatch(createWebsite({
                values: { ...values, domain, template, sections, header, footer },
                navigate,
              }));
            domain === 'custom' && websites.length < profile.limit.all &&
              domains.length < profile.limit.custom &&
              values.name.includes('.') &&
              dispatch(createWebsite({
                values: { ...values, domain, template, sections, header, footer },
                navigate,
              }));
            websites.length >= profile.limit.all && setInfo('all');
            domains.length >= profile.limit.custom && setInfo('custom');
            domain === 'app' && blocked.includes(values.name) && setWarning(true);
            domain === 'custom' && !values.name.includes('.') && setWarning(true);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
              <TextField
                sx={{ my: 2 }}
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
        {(error || warning) && <Typography>
          Website already exists or the name is not available.
        </Typography>}
        <Button
          startIcon={<Edit />}
          type='submit'
          form='confirm'
          variant='contained'
          size='small'
        >
          Create Website
        </Button>
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={info ? true : false}
        onClose={() => setInfo(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Upgrade Plan
          </Typography>
          <Typography sx={{ py: 1 }}>
            {info === 'plan' ?
              'To add custom domain upgrade your plan to premium.' :
              'Your ' + info + ' domains limit has expired, upgrade your plan to premium.'}
          </Typography>
          <Button
            onClick={() => navigate('/account')}
            variant='contained'
            size='small'
          >
            Upgrade Plan
          </Button>
          <Button
            sx={{ ml: 1 }}
            onClick={() => setInfo(false)}
            variant='outlined'
            size='small'
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </MainLayout >
  )
};

export default CreateView;
