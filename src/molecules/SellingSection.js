import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Card, Dialog } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
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

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{ color: 'fontcolor.main', bgcolor: 'inherit', borderRadius: 2 }}
        variant='outlined'
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <TextEditor
            type='title'
            admin={admin}
            section={section}
            wid={wid}
            idx={idx}
          >
            <Typography variant='title'>
              <Box sx={{ fontSize: '70%' }}>
                {section[title] || 'New Title'}
              </Box>
            </Typography>
          </TextEditor>
          <TextEditor
            type='text'
            admin={admin}
            section={section}
            wid={wid}
            idx={idx}
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
            section={section}
            wid={wid} idx={idx}
          >
            <Typography variant='text'>
              <Box sx={{ fontSize: '90%' }}>
                {section[price] || '0'}{' '}
                {section[currency] || 'USD'}
              </Box>
            </Typography>
            <Button
              variant='contained'
              color='accentcolor'
            >
              {section[button] || 'Buy Now'}
            </Button>
          </PaymentOptions>}
          {!admin && <Typography>
            {section[price] || '0'}{' '}
            {section[currency] || 'USD'}
          </Typography>}
          {!admin && <Button
            variant='contained'
            color='accentcolor'
            onClick={() => setOpen(true)}
          >
            {section[button] || 'Buy Now'}
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
                      description: section[product] || 'New Product',
                      amount: {
                        currency_code: section[currency] || 'USD',
                        value: Number(section[price]) || 0,
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
    {[1, 2, 3].map(idx => <ProductCard
      key={idx} idx={idx} admin={admin}
      section={section} wid={wid}
    />)}
  </Grid>
);

export default SellingSection;
