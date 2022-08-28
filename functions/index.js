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
  //const ref = admin.firestore().collection('users').doc(context.auth.uid);
  //const key = await ref.get().then(res => res.data().stripe);
  //const stripe = key && require('stripe')(key);
  const stripe = require('stripe')(
    'sk_test_51LbgiRIaujekku3OlnMP9lG8PHIphcFJaUHMHA4ked9P9tyNpQc5wlbk8MyhWX3oel5s9AQsqSbsXYhLbIWeZmaA00iQlxVwkm'
  );
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        //price: data.product,
        price: 'price_1Lbhp5Iaujekku3OkHvlSPwI',
        quantity: 1,
      },
    ],
    mode: 'payment',
    //success_url: data.success,
    //cancel_url: data.cancel,
    success_url: 'http://localhost:3000/board',
    cancel_url: 'http://localhost:3000/board',
  });
  return session.url;
});
