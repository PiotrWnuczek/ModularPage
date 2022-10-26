const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const nodemailer = require('nodemailer');
admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: 'mail0.small.pl',
  port: 465,
  secure: true,
  auth: {
    user: 'contact@modularpage.com',
    pass: 'modularMP(00)',
  }
});

exports.sender = functions.https.onCall(async (data, c) => {
  const ref = admin.firestore().collection('users').doc(data.uid);
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

exports.mailerlite = functions.https.onCall(async (data, c) => {
  const ref = admin.firestore().collection('users').doc(data.uid);
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

exports.captcha = functions.https.onCall(async (data, c) => {
  const verification = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    { secret: '6LfiuKMiAAAAAG77eSQeilAQvrJkdK4nkuvBbs69', response: data.token },
  );
  return verification;
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

exports.premium = functions.firestore
  .document('users/{uid}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    if (before.premium !== after.premium) {
      const ref = admin.firestore().collection('websites');
      const query = await ref.where('uid', '==', context.params.uid).get();
      query.forEach(doc => {
        doc.data().public && doc.ref.update({ public: after.premium })
      });
    };
    return 'premium';
  });

exports.newuser = functions.firestore
  .document('users/{uid}')
  .onCreate(async (snap, c) => {
    const headers = {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWM5ZWIzYzQxMDc0YmM4ZDM0ZWViMzA0NTRkZWFhYzEwOGE3MmFiZjczMWZjZDVhMWM0MzE1NmRlZmRkMTkwZGM1MTQxNmM3MzU5YzY0NzMiLCJpYXQiOjE2NTkyNTk3NzMuNjk1ODk2LCJuYmYiOjE2NTkyNTk3NzMuNjk1OTIzLCJleHAiOjQ4MTI4NjMzNzMuNjkzNDE1LCJzdWIiOiI3NDYwNTIiLCJzY29wZXMiOltdfQ.o_Fgwd9l0POsBeid4YHyjfylqkO7om-gysr4YsJ9UeTTvE7J_JEH1Zj9NUa93yGVYrMkulPt9hze97rfTYLH0Q',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    await axios.post(
      'https://api.sender.net/v2/subscribers',
      { 'email': snap.data().email }, { headers }
    );
    await axios.post(
      'https://api.sender.net/v2/subscribers/groups/b28Dyj',
      { 'subscribers': [snap.data().email] }, { headers },
    );
    return 'newuser';
  });

exports.domaincreate = functions.firestore
  .document('websites/{id}')
  .onCreate(async (snap, context) => {
    const adminmail = {
      from: 'Modular Page',
      to: 'contact@piotrwnuczek.pl',
      subject: '[Modular Page Admin] Domain Create',
      html: 'Domain: ' + context.params.id + ' Email: ' + snap.data().email,
    };
    const usermail = {
      from: 'Modular Page',
      to: snap.data().email,
      subject: '[Modular Page] Domain Create',
      html: '<h3>Modular Page Domain Create</h3>' +
        '<p>Set DNS: dns1.small.pl, dns2.small.pl, for the Domain: ' +
        context.params.id + '</p>' +
        '<p>DNS change propagation may take from several minutes to several dozen hours.</p>' +
        '<p>If you have any questions, please contact me.</p>',
    };
    if (snap.data().domain === 'custom') {
      await transporter.sendMail(adminmail);
      await transporter.sendMail(usermail);
    }
    return 'domaincreate';
  });

exports.domainremove = functions.firestore
  .document('websites/{id}')
  .onDelete(async (snap, context) => {
    const adminmail = {
      from: 'Modular Page',
      to: 'contact@piotrwnuczek.pl',
      subject: '[Modular Page Admin] Domain Remove',
      html: 'Domain: ' + context.params.id + ' Email: ' + snap.data().email,
    };
    if (snap.data().domain === 'custom') {
      await transporter.sendMail(adminmail);
    }
    return 'domainremove';
  });
