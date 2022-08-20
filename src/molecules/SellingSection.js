import React, { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PaymentOptions from 'atoms/PaymentOptions';

const SellingSection = ({ admin, section, wid }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      {admin && <PaymentOptions section={section} wid={wid}>
        <Button variant='outlined'>
          {section.button || 'But Now'}
        </Button>
      </PaymentOptions>}
      {!admin && <Button
        variant='outlined'
        onClick={() => setOpen(true)}
      >
        {section.button || 'But Now'}
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
  )
};

export default SellingSection;
