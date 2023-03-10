import React, { useEffect } from "react";
import { firebaseCloudMessaging } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/messaging";
import Page from "./Page";

function PushNotificationLayout({ children }) {

  const router = useRouter();
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log("token", token);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {

    const messaging = firebase.messaging();
    messaging.onMessage( (message) => {
        console.log("Received:",message);
        toast(
          <div onClick={() => handleClickPushNotification(message?.data?.url)}>
            <h5>{message?.notification?.title}</h5>
            <h6>{message?.notification?.body}</h6>
          </div>,
          {
            closeOnClick: false,
          }
        );
      });

  },[]);

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  return (
    <>
      <ToastContainer />
      {children}
      <Page/>
    </>
  );
}

export default PushNotificationLayout;