// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCMPXIClVn-liX020ftYLNo0Dd6okJRIeg",
  authDomain: "dilstradescom.firebaseapp.com",
  projectId: "dilstradescom",
  storageBucket: "dilstradescom.firebasestorage.app",
  messagingSenderId: "812023950321",
  appId: "1:812023950321:web:c2ffaf663272a7f6b03250",
  measurementId: "G-P6588HNXD4"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

});