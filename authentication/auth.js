// Firebase Authentication
const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var config = {
    apiKey: "AIzaSyApwCN3N5pLJgQpTvlT4SGAIyUgN5DcuBk",
    authDomain: "greenride-21c1c.firebaseapp.com",
    databaseURL: "https://greenride-21c1c.firebaseio.com",
    projectId: "greenride-21c1c",
    storageBucket: "greenride-21c1c.appspot.com",
    messagingSenderId: "343803324174"
  };
  firebase.initializeApp(config);

module.exports = {
  isAuthenticated: function (req, res, next) {
    var user = firebase.auth().currentUser;
    if (user !== null) {
      req.user = user;
      next();
    } else {
      res.redirect('/login');
    }
  },
}
