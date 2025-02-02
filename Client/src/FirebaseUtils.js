import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCMPXIClVn-liX020ftYLNo0Dd6okJRIeg",
  authDomain: "dilstradescom.firebaseapp.com",
  projectId: "dilstradescom",
  storageBucket: "dilstradescom.firebasestorage.app",
  messagingSenderId: "812023950321",
  appId: "1:812023950321:web:c2ffaf663272a7f6b03250",
  measurementId: "G-P6588HNXD4"
};

const vapidKey = "BDWT8hJpBzztCeK0aIxPh167UAaJkpg9nn2ILIgIf8UwRBY__Z0Ie36fXSfAKgAlOEn0JIwupwYZ5n8OOag-FZs"

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