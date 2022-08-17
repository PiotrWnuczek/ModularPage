const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors')({ origin: true });
admin.initializeApp();

exports.test = functions.https.onCall((data, context) => {
  const db = admin.firestore();
  return db.collection('users').doc(data.uid).get().then(resp => (
    axios.get('https://api.sender.net/v2/groups', {
      headers: {
        'Authorization': 'Bearer ' + resp.data().api,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then(res => res.data.data).catch(err => err)
  ));
});

exports.dbTest = functions.https.onRequest((request, response) => {
  const db = admin.firestore();
  db.collection('users').doc('uid').get().then(res => {
    cors(request, response, () => {
      axios.get('https://api.sender.net/v2/groups', {
        headers: {
          'Authorization': 'Bearer ' + res.data().key,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }).then(res => {
        response.send(res.data);
      }).catch(err => {
        response.sendStatus(err);
      })
    })
  })
});

exports.apiTest = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    axios.get('https://api.sender.net/v2/groups', {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWM5ZWIzYzQxMDc0YmM4ZDM0ZWViMzA0NTRkZWFhYzEwOGE3MmFiZjczMWZjZDVhMWM0MzE1NmRlZmRkMTkwZGM1MTQxNmM3MzU5YzY0NzMiLCJpYXQiOjE2NTkyNTk3NzMuNjk1ODk2LCJuYmYiOjE2NTkyNTk3NzMuNjk1OTIzLCJleHAiOjQ4MTI4NjMzNzMuNjkzNDE1LCJzdWIiOiI3NDYwNTIiLCJzY29wZXMiOltdfQ.o_Fgwd9l0POsBeid4YHyjfylqkO7om-gysr4YsJ9UeTTvE7J_JEH1Zj9NUa93yGVYrMkulPt9hze97rfTYLH0Q',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => {
      response.send(res.data);
    }).catch(err => {
      response.sendStatus(err);
    })
  })
});
