import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Box, Button, Dialog } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PaymentOptions from 'atoms/PaymentOptions';

const SellingSection = ({ admin, website, section }) => {
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firestore.data[auth.uid]);
  useFirestoreConnect([{ storeAs: auth.uid, collection: 'users', doc: auth.uid }]);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      {admin && <PaymentOptions section={section} wid={website.name}>
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
          <PayPalScriptProvider options={{ 'client-id': profile && profile.paypal }}>
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
