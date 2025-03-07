import React, { useState } from 'react';
import { createWebsite, reset } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { Dialog, Button, Avatar } from '@mui/material';
import { Select, MenuItem, TextField } from '@mui/material';
import { Card, CardActionArea, CardMedia } from '@mui/material';
import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material';
import { CheckBoxOutlined, Edit } from '@mui/icons-material';
import { Formik } from 'formik';
import { header, footer } from 'stock/templates';
import templates from 'stock/templates';
import Landing from 'stock/landing.png';
import Product from 'stock/product.png';
import MainLayout from 'organisms/MainLayout';

const OptionBox = ({ get, set, option, title, text, image, children }) => (
  <Card
    sx={{ bgcolor: 'secondary.light', borderRadius: 2 }}
    variant='outlined'
  >
    <CardActionArea onClick={() => set(option)}>
      {image && <CardMedia
        component='img'
        image={image}
      />}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: get === option && 'primary.main' }}>
          {get === option && <CheckBoxOutlined />}
          {get !== option && <CheckBoxOutlineBlankOutlined />}
        </Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography>
            {title}
          </Typography>
          <Typography variant='body2'>
            {text}
          </Typography>
        </Box>
        {children}
      </Box>
    </CardActionArea>
  </Card>
);

const CreateView = () => {
  const [domain, setDomain] = useState('app');
  const [template, setTemplate] = useState('landing');
  const [existing, setExisting] = useState(false);
  const [info, setInfo] = useState(false);
  const error = useSelector(state => state.websites.error);
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  const websites = useSelector(state => state.firestore.ordered.websites);
  const domains = websites && websites.filter(website => website.domain === 'custom');
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  useFirestoreConnect([{ collection: 'websites', where: [['email', '==', auth.email]] }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sections = templates[template] || [];
  const blocked = ['app', 'signin', 'signup', 'board', 'create', 'account'];

  return (
    <MainLayout>
      <Grid sx={{ p: 2 }} container spacing={2}>
        <Grid item xs={12} md={6}>
          <OptionBox
            get={domain} set={setDomain}
            option='app' title='App Domain'
            text={process.env.REACT_APP_DOMAIN + '/YourName (free option)'}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <OptionBox
            get={domain} set={setDomain}
            option='custom' title='Custom Domain'
            text='YourDomain.com (you will receive mail with DNS)'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <OptionBox
            get={template} set={setTemplate}
            option='landing' title='Landing Page'
            text='Website with mailing form'
            image={Landing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <OptionBox
            get={template} set={setTemplate}
            option='product' title='Product Page'
            text='Website with payment buttons'
            image={Product}
          />
        </Grid>
        <Grid item xs={12}>
          <OptionBox
            get={template} set={setTemplate}
            option='Template' title='Existing Website'
            text='You can also use your existing website as template'
          >
            <Select
              sx={{ ml: 1 }}
              value={existing}
              onChange={(e) => setExisting(e.target.value)}
              size='small'
              fullWidth
            >
              <MenuItem value={false}>Blank Website</MenuItem>
              {websites && websites.map(website =>
                <MenuItem value={website.sections} key={website.name}>
                  {website.domain === 'custom' && website.name}
                  {website.domain === 'app' && process.env.REACT_APP_DOMAIN + '/' + website.name}
                </MenuItem>
              )}
            </Select>
          </OptionBox>
        </Grid>
        <Grid item xs={12}>
          <Card
            sx={{ bgcolor: 'secondary.light', borderRadius: 2, p: 2 }}
            variant='outlined'
          >
            <Formik
              initialValues={{ name: '' }}
              onSubmit={(values) => {
                domain === 'app' && websites.length < profile.limit.all &&
                  !blocked.includes(values.name) && values.name.length > 2 &&
                  dispatch(createWebsite({
                    values: {
                      ...values, domain, template, header, footer,
                      sections: existing ? existing : sections,
                    },
                    navigate,
                  }));
                domain === 'custom' && websites.length < profile.limit.all &&
                  domains.length < profile.limit.custom &&
                  values.name.includes('.') && values.name.length > 2 &&
                  dispatch(createWebsite({
                    values: {
                      ...values, domain, template, header, footer,
                      sections: existing ? existing : sections,
                    },
                    navigate,
                  }));
                websites.length >= profile.limit.all && setInfo('all');
                domains.length >= profile.limit.custom && setInfo('custom');
                domain === 'app' && blocked.includes(values.name) && setInfo('name');
                domain === 'custom' && !values.name.includes('.') && setInfo('name');
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                  <TextField
                    sx={{ mb: 2 }}
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
            <Button
              startIcon={<Edit />}
              type='submit'
              form='confirm'
              variant='contained'
              size='small'
            >
              Create Website
            </Button>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={Boolean(info || error)}
        onClose={() => { setInfo(false); error && dispatch(reset()); }}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            {['all', 'custom'].includes(info) ? 'Upgrade Plan' : 'Change Name'}
          </Typography>
          <Typography sx={{ py: 1 }}>
            {error && 'This website name already exists, choose another name.'}
            {info === 'name' && 'This website name is not available, choose another name.'}
            {info === 'all' && 'Your all domains limit has expired, upgrade your plan to premium.'}
            {info === 'custom' && 'Your custom domains limit has expired, upgrade your plan to premium.'}
          </Typography>
          {['all', 'custom'].includes(info) && <Button
            sx={{ mr: 1 }}
            onClick={() => navigate('/account')}
            variant='contained'
            size='small'
          >
            Upgrade Plan
          </Button>}
          <Button
            onClick={() => { setInfo(false); error && dispatch(reset()); }}
            variant='outlined'
            size='small'
          >
            {['all', 'custom'].includes(info) ? 'Cancel' : 'All Right'}
          </Button>
        </Box>
      </Dialog>
    </MainLayout >
  )
};

export default CreateView;
