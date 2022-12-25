import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAGfPP1n6x32nPUuzvKtFisfYQjf2vCYlI",
    authDomain: "nextjs-test-messaging.firebaseapp.com",
    projectId: "nextjs-test-messaging",
    storageBucket: "nextjs-test-messaging.appspot.com",
    messagingSenderId: "412613513342",
    appId: "1:412613513342:web:63e3a4a12f64c2c516c82f",
    measurementId: "G-6S89XD589X"
  });
}

const firebaseCloudMessaging = {
  init: async () => {
    const messaging = firebase.messaging();
    try {

      const tokenInLocalForage = await localforage.getItem("fff_qqqq");

      // Return the token if it is alredy in our local storage
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
      }

      // Request the push notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === "granted") {
        // Get new token from Firebase
        const fcm_token = await messaging.getToken({
          vapidKey: "BDaNbkFz-AZFlOkozo5LZuqXXh9c4gSOcGcmBPVREUMMyGB_5seQ_QPD5nYtYt8mxRXJQ7ffZuBfQJoslo8MrHc",
        });
        console.log("Token:",fcm_token);
        // Set token in our local storage
        if (fcm_token) {
          localforage.setItem("fff_qqqq", fcm_token);
          return fcm_token;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
export { firebaseCloudMessaging };

export const onMessageListener = () => {
  return new Promise((resolve) => {    
    
  });
  
}
 
