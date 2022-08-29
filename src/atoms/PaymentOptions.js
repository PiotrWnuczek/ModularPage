import React, { useState } from 'react';
import { updateProfile } from 'redux/usersSlice';
import { updateSection } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { Formik } from 'formik';

const PaymentOptions = ({ children, section, wid, idx }) => {
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selling, setSelling] = useState(section['selling' + idx] || 'paypal');
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
            <Typography>
              Set payment options.
            </Typography>
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
                  (section.paypal || 'Api Key') : ((profile && profile.stripe) || 'Api Key'),
                [button]: section[button] || 'Buy Now',
                [product]: section[product] || 'New Product',
                [currency]: section[currency] || 'USD',
                [price]: section[price] || '0',
              }}
              onSubmit={(values) => {
                selling === 'paypal' && values.key !== section.paypal &&
                  dispatch(updateSection({
                    values: { paypal: values.key },
                    sid: section.id, wid,
                  }));
                selling === 'stripe' && profile && (values.key !== profile[selling]) &&
                  dispatch(updateProfile({
                    values: { [selling]: values.key },
                    id: auth.uid,
                  }));
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
                    },
                    sid: section.id, wid,
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
                    placeholder='Api Key'
                    label='Api Key'
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
