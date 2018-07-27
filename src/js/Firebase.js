var app_firebase = {};

(function(){
  var config = {
    apiKey: "AIzaSyDg9Cgm80ODTFAcVJbQ5rJ-WyseNG8GYFY",
    authDomain: "type-test-javascript.firebaseapp.com",
    databaseURL: "https://type-test-javascript.firebaseio.com",
    projectId: "type-test-javascript",
    storageBucket: "type-test-javascript.appspot.com",
    messagingSenderId: "671784234364"
  };
  firebase.initializeApp(config);

  app_firebase = firebase;
})()
