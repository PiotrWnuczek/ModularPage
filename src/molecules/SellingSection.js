import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Grid, Box, Button, Typography } from '@mui/material';
import { Card, Dialog, TextField } from '@mui/material';
import { Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';
import PaymentOptions from 'atoms/PaymentOptions';

const ProductCard = ({ admin, section, wid, idx, setSuccess }) => {
  const [payment, setPayment] = useState(false);
  const selling = idx ? 'selling' + idx : 'selling';
  const title = idx ? 'title' + idx : 'title';
  const text = idx ? 'text' + idx : 'text';
  const button = idx ? 'button' + idx : 'button';
  const product = idx ? 'product' + idx : 'product';
  const currency = idx ? 'currency' + idx : 'currency';
  const price = idx ? 'price' + idx : 'price';
  const sl = section.layout;
  const firebase = useFirebase();
  const stripeFunction = (values) => {
    const stripe = firebase.functions().httpsCallable('stripe');
    stripe({
      ...values, url: window.location.href,
      product: section[product],
    }).then((result) => window.location.replace(result.data));
  };

  return (
    <Grid item xs={12} md={sl ? 12 / sl.quantity : 6}>
      <Card
        sx={{ color: 'fontcolor.main', bgcolor: 'inherit', borderRadius: 2 }}
        variant='outlined'
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <TextEditor
            admin={admin} section={section}
            wid={wid} idx={idx} type='title'
          >
            <Typography variant='title'>
              <Box sx={{ fontSize: '70%' }}>
                {section[title] || 'New Title'}
              </Box>
            </Typography>
          </TextEditor>
          <TextEditor
            admin={admin} section={section}
            wid={wid} idx={idx} type='text'
          >
            <Typography variant='text'>
              <Box sx={{ fontSize: '90%', textAlign: (sl && sl.align) || 'center' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget='_blank'>
                  {section[text] || 'New Text'}
                </ReactMarkdown>
              </Box>
            </Typography>
          </TextEditor>
          {admin && <PaymentOptions
            section={section} wid={wid} idx={idx}
          >
            <Typography variant='text'>
              <Box sx={{ fontSize: '90%' }}>
                {section[price] || '0'}{' '}
                {section[currency] || 'USD'}
              </Box>
            </Typography>
            <Button
              sx={{ mt: 1 }}
              variant='contained'
              color='accentcolor'
            >
              {section[button] || 'Buy Now'}
            </Button>
          </PaymentOptions>}
          {!admin && <Box>
            <Typography variant='text'>
              <Box sx={{ fontSize: '90%' }}>
                {section[price] || '0'}{' '}
                {section[currency] || 'USD'}
              </Box>
            </Typography>
            <Button
              sx={{ mt: 1 }}
              onClick={() => section[selling] && setPayment(true)}
              variant='contained'
              color='accentcolor'
            >
              {section[button] || 'Buy Now'}
            </Button>
          </Box>}
          <Dialog
            sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
            open={payment}
            onClose={() => setPayment(false)}
            fullWidth
          >
            {section[selling] === 'paypal' && <Box sx={{ p: 2, textAlign: 'center' }}>
              <PayPalScriptProvider options={{ 'client-id': section.paypal }}>
                <PayPalButtons
                  style={{ color: 'blue' }}
                  createOrder={(d, actions) => actions.order.create({
                    purchase_units: [{
                      description: section[product] || 'New Product',
                      amount: {
                        currency_code: section[currency] || 'USD',
                        value: Number(section[price]) || 0,
                      },
                    }],
                    application_context: { shipping_preference: 'NO_SHIPPING' },
                  })}
                  onApprove={(d, actions) => actions.order.capture().then(() => {
                    setPayment(false); setSuccess(true);
                  })}
                />
              </PayPalScriptProvider>
            </Box>}
            {section[selling] === 'stripe' && <Box sx={{ p: 2, textAlign: 'center' }}>
              <Formik
                initialValues={{ email: '' }}
                onSubmit={(values) => stripeFunction(values)}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit} id='confirm'>
                    <TextField
                      sx={{ mb: 2 }}
                      onChange={handleChange}
                      value={values.email}
                      name='email'
                      placeholder='Email'
                      label='Email'
                      type='email'
                      variant='outlined'
                      size='small'
                      fullWidth
                      autoFocus
                      required
                    />
                  </form>
                )}
              </Formik>
              <Button
                type='submit'
                form='confirm'
                variant='contained'
                fullWidth
              >
                Pay Now by Stripe
              </Button>
            </Box>}
          </Dialog>
        </Box>
      </Card>
    </Grid>
  )
};

const SellingSection = ({ admin, section, wid }) => {
  const [success, setSuccess] = useState(false);
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    params.has('success') && setSuccess(true);
    setParams(false);
  }, [params, setParams]);
  const sl = section.layout;

  return (
    <Grid container spacing={2}>
      {Array.from({ length: sl ? Number(sl.quantity) : 2 }, (_, i) => ++i).map(idx =>
        <ProductCard
          key={idx} idx={idx} wid={wid} admin={admin}
          section={section} setSuccess={setSuccess}
        />
      )}
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        open={success}
        onClose={() => setSuccess(false)}
        fullWidth
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant='h5'>
            Payment Success
          </Typography>
          <Button
            sx={{ mt: 2 }}
            onClick={() => (setSuccess(false))}
            variant='contained'
            size='small'
          >
            Return to Page
          </Button>
        </Box>
      </Dialog>
    </Grid>
  )
};

export default SellingSection;
