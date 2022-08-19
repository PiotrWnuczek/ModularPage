const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
admin.initializeApp();

exports.sender = functions.https.onCall((data, context) => {
  const ref = admin.firestore().collection('users').doc(context.auth.uid);
  return ref.get().then(resp => {
    axios.post('https://api.sender.net/v2/subscribers',
      { 'email': data.email }, {
      headers: {
        'Authorization': 'Bearer ' + resp.data().sender,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then(() => {
      axios.post('https://api.sender.net/v2/subscribers/groups/' + data.group,
        { 'subscribers': [data.email] }, {
        headers: {
          'Authorization': 'Bearer ' + resp.data().sender,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
    })
  }).then(() => 'sender')
});
