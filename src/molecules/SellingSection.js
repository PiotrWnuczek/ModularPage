import React from 'react';
import { Box } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const SellingSection = () => (
  <Box sx={{ textAlign: 'center' }}>
    <PayPalScriptProvider options={{
      'client-id': 'AQWWuLYWFILTdH_OqT_sXZ-fFzwMf7MBA0_psb1H5w3kbpHW3mh0vgLLaugwTQ9Tkq3rI8by3uhqFn8O'
    }}>
      <PayPalButtons
        createOrder={(d, actions) => actions.order.create({
          purchase_units: [{
            description: 'Product',
            amount: { currency_code: 'USD', value: 1 },
          }],
        })}
        onApprove={(d, actions) => actions.order.capture().then((details) => {
          const name = details.payer.name.given_name;
          console.log(name);
        })}
      />
    </PayPalScriptProvider>
  </Box>
);

export default SellingSection;
