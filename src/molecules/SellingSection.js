import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Card, Dialog } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PaymentOptions from 'atoms/PaymentOptions';

const ProductCard = ({ admin, section, wid }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{ bgcolor: 'inherit', borderRadius: 2 }}
        variant='outlined'
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant='h5'>
            {section.title || 'New Title'}
          </Typography>
          <Typography variant='subtitle1'>
            {section.text || 'New Text'}
          </Typography>
          {admin && <PaymentOptions section={section} wid={wid}>
            <Typography>
              {section.price || '0'}{' '}
              {section.currency || 'USD'}
            </Typography>
            <Button variant='outlined'>
              {section.button || 'Buy Now'}
            </Button>
          </PaymentOptions>}
          {!admin && <Typography>
            {section.price || '0'}{' '}
            {section.currency || 'USD'}
          </Typography>}
          {!admin && <Button
            variant='outlined'
            onClick={() => setOpen(true)}
          >
            {section.button || 'Buy Now'}
          </Button>}
          <Dialog
            sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
          >
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <PayPalScriptProvider options={{ 'client-id': section.paypal }}>
                <PayPalButtons
                  createOrder={(d, actions) => actions.order.create({
                    purchase_units: [{
                      description: section.product || 'New Product',
                      amount: {
                        currency_code: section.currency || 'USD',
                        value: Number(section.price) || 0,
                      },
                    }],
                  })}
                  onApprove={(d, actions) => actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;
                    console.log(name);
                  })}
                />
              </PayPalScriptProvider>
            </Box>
          </Dialog>
        </Box>
      </Card>
    </Grid>
  )
};

const SellingSection = ({ admin, section, wid }) => (
  <Grid container spacing={2}>
    <ProductCard admin={admin} section={section} wid={wid} />
    <ProductCard admin={admin} section={section} wid={wid} />
    <ProductCard admin={admin} section={section} wid={wid} />
  </Grid>
);

export default SellingSection;
