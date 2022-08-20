import React, { useState } from 'react';
import { updateProfile } from 'redux/usersSlice';
import { updateSection } from 'redux/websitesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';

const PaymentOptions = ({ children, section, wid }) => {
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box onClick={() => setOpen(true)}>
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
            Settings
          </Typography>
          <Typography variant='subtitle1'>
            Set paymenys
          </Typography>
          <Formik
            initialValues={{
              paypal: (profile && profile.paypal) || 'New PayPal Key',
              button: section.button || 'Buy Now',
              product: section.product || 'New Product',
              currency: section.currency || 'USD',
              price: section.price || '0',
            }}
            onSubmit={(values) => {
              profile && (values.paypal !== profile.paypal) &&
                dispatch(updateProfile({
                  values: { paypal: values.paypal }, id: auth.uid,
                }));
              (values.button !== section.button || values.product !== section.product ||
                values.currency !== section.currency || values.price !== section.price) &&
                dispatch(updateSection({
                  values: {
                    button: values.button,
                    product: values.product,
                    currency: values.currency,
                    price: values.price,
                  },
                  sid: section.id, wid,
                }));
              setOpen(false);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values.paypal}
                  placeholder='PayPal Key'
                  label='PayPal Key'
                  name='paypal'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                  autoFocus
                />
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values.button}
                  placeholder='Button Text'
                  label='Button Text'
                  name='button'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values.product}
                  placeholder='Product Name'
                  label='Product Name'
                  name='product'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values.currency}
                  placeholder='Currency Code'
                  label='Currency Code'
                  name='currency'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values.price}
                  placeholder='Price Value'
                  label='Price Value'
                  name='price'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                />
              </form>
            )}
          </Formik>
          <Button
            sx={{ mt: 1 }}
            type='submit'
            form='confirm'
            variant='outlined'
            size='small'
          >
            Set
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
};

export default PaymentOptions;
