const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const cors = require('cors')({ origin: true });
var axios = require('axios');

exports.test = functions.https.onRequest((request, response) => {
  db.collection('users').doc('c4bXg1bET9ZzIhW8zzuCbtYeti02').get().then(res => {
    response.send(res.email);
  })
  //response.send('test');
});

exports.api = functions.https.onRequest((request, response) => {
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
