importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDf8yKIQEuiWhovIlZm7wBQhvAt88tktQs",
  authDomain: "pleagan-dev.firebaseapp.com",
  projectId: "pleagan-dev",
  storageBucket: "pleagan-dev.appspot.com",
  messagingSenderId: "968548444336",
  appId: "1:968548444336:web:6cb3d971dc8984a44d3375",
  measurementId: "G-4DHGLG82YP"
});
const messaging = firebase.messaging();
