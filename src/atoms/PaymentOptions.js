import React, { useState } from 'react';
import { updateProfile } from 'redux/usersSlice';
import { updateSection } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, TextField, Select } from '@mui/material';
import { MenuItem, Alert, AlertTitle } from '@mui/material';
import { Formik } from 'formik';
import ReactMarkdown from 'react-markdown';

const aboutpaypal = `
* You select [paypal.com](https://paypal.com/),
you can also select [stripe.com](https://stripe.com/)
* Sign in to [Paypal Developer](https://developer.paypal.com/),
then go to [Applications](https://developer.paypal.com/developer/applications)
* Create sandbox applications for testing, or live applications for payment
* Select the created application, copy Client ID and paste below
* Add Button Text, Product Name, Price and you are done
`;
const aboutstripe = `
* You select [stripe.com](https://stripe.com/),
you can also select [paypal.com](https://paypal.com/)
* Sign in to [Stripe Dashboard](https://dashboard.stripe.com/dashboard),
then go to [Products](https://dashboard.stripe.com/products)
* Open [API Keys](https://dashboard.stripe.com/apikeys),
copy Secret Key and paste below
* You can turn on test mode in the upper right corner
* Create new product, then copy Price ID and paste below
* Add Button Text, Price and you are done
`;

const PaymentOptions = ({ children, section, wid, lang, idx }) => {
  const [open, setOpen] = useState(false);
  const [selling, setSelling] = useState(section['selling' + idx] || 'paypal');
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();
  const button = idx ? 'button' + idx : 'button';
  const product = idx ? 'product' + idx : 'product';
  const currency = idx ? 'currency' + idx : 'currency';
  const price = idx ? 'price' + idx : 'price';

  return (
    <Box>
      <Box
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        {children}
      </Box>
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Typography variant='h5'>
            Payment Settings
          </Typography>
          <Box sx={{ py: 1 }}>
            <Alert
              sx={{ mb: 1, py: 0, px: 1 }}
              severity='info'
            >
              <AlertTitle>
                Set payment options
              </AlertTitle>
              <ReactMarkdown
                children={selling === 'paypal' ? aboutpaypal : aboutstripe}
                linkTarget='_blank'
                className='about'
              />
            </Alert>
            <Select
              sx={{ my: 1 }}
              value={selling}
              onChange={(e) => setSelling(e.target.value)}
              size='small'
              fullWidth
              autoFocus
            >
              <MenuItem value='paypal'>
                PayPal
              </MenuItem>
              <MenuItem value='stripe'>
                Stripe
              </MenuItem>
            </Select>
            <Formik
              initialValues={{
                key: selling === 'paypal' ?
                  (section.paypal || 'Client Id') : ((profile && profile.stripe) || 'Secret Key'),
                [button]: section[button] || 'Buy Now',
                [product]: section[product] || 'New Product',
                [currency]: section[currency] || 'USD',
                [price]: section[price] || '0',
              }}
              onSubmit={(values) => {
                (values[button] !== section[button] || values[product] !== section[product] ||
                  values[currency] !== section[currency] || values[price] !== section[price] ||
                  section['selling' + idx] !== selling) &&
                  dispatch(updateSection({
                    values: {
                      [button]: values[button],
                      [product]: values[product],
                      [currency]: values[currency],
                      [price]: values[price],
                      ['selling' + idx]: selling,
                      paypal: selling === 'paypal' && values.key !== section.paypal ?
                        values.key : null,
                    },
                    sid: section.id, wid, lang,
                  }));
                selling === 'stripe' && profile && (values.key !== profile[selling]) &&
                  dispatch(updateProfile({
                    values: { [selling]: values.key },
                    id: auth.uid,
                  }));
                setOpen(false);
              }}
              enableReinitialize
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values.key}
                    name='key'
                    placeholder={selling === 'paypal' ? 'Client Id' : 'Secret Key'}
                    label={selling === 'paypal' ? 'Client Id' : 'Secret Key'}
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values[button]}
                    name={button}
                    placeholder='Button Text'
                    label='Button Text'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values[product]}
                    name={product}
                    placeholder={selling === 'paypal' ? 'Product Name' : 'Price Id'}
                    label={selling === 'paypal' ? 'Product Name' : 'Price Id'}
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values[currency]}
                    name={currency}
                    placeholder='Currency Code'
                    label='Currency Code'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                  <TextField
                    sx={{ my: 1 }}
                    onChange={handleChange}
                    value={values[price]}
                    name={price}
                    placeholder='Price Value'
                    label='Price Value'
                    type='text'
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </form>
              )}
            </Formik>
          </Box>
          <Button
            type='submit'
            form='confirm'
            variant='contained'
            size='small'
          >
            Confirm Settings
          </Button>
          <Button
            sx={{ ml: 1 }}
            onClick={() => setOpen(false)}
            variant='outlined'
            size='small'
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default PaymentOptions;
