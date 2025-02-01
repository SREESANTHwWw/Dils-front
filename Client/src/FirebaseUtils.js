import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDimbJXAbGL6xRy4i_P9eAW8ywDpj4UVx8",
  authDomain: "dils-trades-push.firebaseapp.com",
  projectId: "dils-trades-push",
  storageBucket: "dils-trades-push.firebasestorage.app",
  messagingSenderId: "917539798900",
  appId: "1:917539798900:web:06731e426b2587cf54b621",
  measurementId: "G-H8WWNSD18J"
};

const vapidKey = "BP4OeLDgUXWrszUYEdR-_4GSgXvPI-JuF13kFNWoy4N5bR10cZlD8qKKNgsa0lf9DGhKI8vWZpcHQVTJdE7QxBs"

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get token
export const requestFcmToken = () => {
 return Notification.requestPermission()
 .then((permission) => {
    if (permission === 'granted') {
      return getToken(messaging,{vapidKey})
    } else {
      console.log('Unable to get permission to notify.');
    }
  }).catch((error) => {
    console.log('Error getting permission:', error);
  });
};


export const onMessageListener =()=>{
 return new Promise((resolve)=>{
    onMessage(messaging,(payload)=>{
      resolve(payload)
    })
  })
}