import React, { useState } from 'react';
import { updateSection } from 'redux/websitesSlice';
import { useDispatch } from 'react-redux';
import { Box, Dialog, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';

const PaymentOptions = ({ children, section, wid, idx }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const paypal = idx ? 'paypal' + idx : 'paypal';
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
            Settings
          </Typography>
          <Typography variant='subtitle1'>
            Set paymenys
          </Typography>
          <Formik
            initialValues={{
              [paypal]: section[paypal] || 'PayPal Id',
              [button]: section[button] || 'Buy Now',
              [product]: section[product] || 'New Product',
              [currency]: section[currency] || 'USD',
              [price]: section[price] || '0',
            }}
            onSubmit={(values) => {
              (values[paypal] !== section[paypal] || values[button] !== section[button] ||
                values[product] !== section[product] || values[currency] !== section[currency] ||
                values[price] !== section[price]) &&
                dispatch(updateSection({
                  values: {
                    [paypal]: values[paypal],
                    [button]: values[button],
                    [product]: values[product],
                    [currency]: values[currency],
                    [price]: values[price],
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
                  value={values[paypal]}
                  name={paypal}
                  placeholder='PayPal Id'
                  label='PayPal Id'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                  autoFocus
                />
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values[button]}
                  name={button}
                  placeholder='Button Text'
                  label='Button Text'
                  type='text'
                  size='small'
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  sx={{ my: 1 }}
                  onChange={handleChange}
                  value={values[product]}
                  name={product}
                  placeholder='Product Name'
                  label='Product Name'
                  type='text'
                  size='small'
                  variant='outlined'
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
                  size='small'
                  variant='outlined'
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
