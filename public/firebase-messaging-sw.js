importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAGfPP1n6x32nPUuzvKtFisfYQjf2vCYlI",
    authDomain: "nextjs-test-messaging.firebaseapp.com",
    projectId: "nextjs-test-messaging",
    storageBucket: "nextjs-test-messaging.appspot.com",
    messagingSenderId: "412613513342",
    appId: "1:412613513342:web:63e3a4a12f64c2c516c82f",
});

const messaging = firebase.messaging();


