const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
admin.initializeApp();

exports.sender = functions.https.onCall(async (data, context) => {
  const ref = admin.firestore().collection('users').doc(context.auth.uid);
  const sender = await ref.get().then(res => res.data().sender);
  const headers = {
    'Authorization': 'Bearer ' + sender,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  await axios.post(
    'https://api.sender.net/v2/subscribers',
    { 'email': data.email }, { headers }
  );
  await axios.post(
    'https://api.sender.net/v2/subscribers/groups/' + data.group,
    { 'subscribers': [data.email] }, { headers },
  );
  return 'sender';
});

exports.mailerlite = functions.https.onCall(async (data, context) => {
  const ref = admin.firestore().collection('users').doc(context.auth.uid);
  const mailerlite = await ref.get().then(res => res.data().mailerlite);
  const headers = {
    'X-MailerLite-ApiKey': mailerlite,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  await axios.post(
    'https://api.mailerlite.com/api/v2/groups/group_name/subscribers',
    { 'email': data.email, 'group_name': data.group }, { headers }
  );
  return 'mailerlite';
});

exports.stripe = functions.https.onCall(async (data, context) => {
  const ref = admin.firestore().collection('users').doc(context.auth.uid);
  const key = await ref.get().then(res => res.data().stripe);
  const stripe = key && require('stripe')(key);
  const session = await stripe.checkout.sessions.create({
    customer_email: data.email,
    line_items: [
      {
        price: data.product,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: data.url + '?success=true',
    cancel_url: data.url + '?cancel=true',
  });
  return session.url;
});
