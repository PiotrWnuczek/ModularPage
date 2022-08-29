import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Grid, Box, Button, Typography } from '@mui/material';
import { Card, Dialog, TextField } from '@mui/material';
import { Formik } from 'formik';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextEditor from 'atoms/TextEditor';
import PaymentOptions from 'atoms/PaymentOptions';

const ProductCard = ({ admin, section, wid, idx }) => {
  const [open, setOpen] = useState(false);
  const title = idx ? 'title' + idx : 'title';
  const text = idx ? 'text' + idx : 'text';
  const button = idx ? 'button' + idx : 'button';
  const product = idx ? 'product' + idx : 'product';
  const currency = idx ? 'currency' + idx : 'currency';
  const price = idx ? 'price' + idx : 'price';
  const sl = section.layout;
  const firebase = useFirebase();
  const stripeFunction = () => {
    const stripe = firebase.functions().httpsCallable('stripe');
    stripe().then((result) => window.location.replace(result.data));
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
              <Box sx={{ fontSize: '90%' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
              onClick={() => (section.selling || 1) && setOpen(true)}
              variant='contained'
              color='accentcolor'
            >
              {section[button] || 'Buy Now'}
            </Button>
          </Box>}
          <Dialog
            sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
          >
            {(section.selling === 'paypal' || 1) && <Box sx={{ p: 2, textAlign: 'center' }}>
              <PayPalScriptProvider options={{ 'client-id': section.paypal }}>
                <PayPalButtons
                  createOrder={(d, actions) => actions.order.create({
                    purchase_units: [{
                      description: section[product] || 'New Product',
                      amount: {
                        currency_code: section[currency] || 'USD',
                        value: Number(section[price]) || 0,
                      },
                    }],
                    application_context: {
                      shipping_preference: 'NO_SHIPPING',
                    },
                  })}
                  onApprove={(d, actions) => actions.order.capture().then((details) => {
                    const payer = details.payer;
                    console.log(payer);
                  })}
                />
              </PayPalScriptProvider>
            </Box>}
            {section.selling === 'stripe' && <Box sx={{ p: 2, textAlign: 'center' }}>
              <Formik
                initialValues={{ email: '' }}
                onSubmit={(values) => console.log(values)}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      sx={{ my: 1 }}
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
                onClick={() => stripeFunction()}
                variant='contained'
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
  const sl = section.layout;

  return (
    <Grid container spacing={2}>
      {Array.from({ length: sl ? Number(sl.quantity) : 2 }, (_, i) => ++i).map(idx =>
        <ProductCard
          key={idx} idx={idx} admin={admin}
          section={section} wid={wid}
        />
      )}
    </Grid>
  )
};

export default SellingSection;
