function startFirebase(){
  var config = {
    apiKey: "AIzaSyDg9Cgm80ODTFAcVJbQ5rJ-WyseNG8GYFY",
    authDomain: "type-test-javascript.firebaseapp.com",
    databaseURL: "https://type-test-javascript.firebaseio.com",
    projectId: "type-test-javascript",
    storageBucket: "type-test-javascript.appspot.com",
    messagingSenderId: "671784234364"
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      isLoggedIn("< Logout >");
      localStorage.setItem("UserID", user.uid);
      localStorage.setItem("Username", user.displayName);
    } else {
      isLoggedIn("< Login >");
      localStorage.setItem("UserID", "none");
      localStorage.setItem("Username", "none");
    }
  });
}

function logout() {
  firebase.auth().signOut();
}

function isLoggedIn(state) {
  if(window.location.pathname == "/index.html") {
    document.getElementById("logButton").innerText = state;
  }
}
startFirebase();
