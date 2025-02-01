// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDimbJXAbGL6xRy4i_P9eAW8ywDpj4UVx8",
  authDomain: "dils-trades-push.firebaseapp.com",
  projectId: "dils-trades-push",
  storageBucket: "dils-trades-push.firebasestorage.app",
  messagingSenderId: "917539798900",
  appId: "1:917539798900:web:06731e426b2587cf54b621",
  measurementId: "G-H8WWNSD18J"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

});