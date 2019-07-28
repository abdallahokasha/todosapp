import firebase from 'firebase'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6d5fX1hy6hdC7wMhBL0lFKhOumLjRO0Q",
    authDomain: "todos-8cf89.firebaseapp.com",
    databaseURL: "https://todos-8cf89.firebaseio.com",
    projectId: "todos-8cf89",
    storageBucket: "todos-8cf89.appspot.com",
    messagingSenderId: "131297738838"
  };
  
var fire = firebase.initializeApp(config);

export default fire;