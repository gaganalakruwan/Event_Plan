import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// Optionally: add more Firebase services like Firestore, Storage, etc.

const firebaseConfig = {
  apiKey: "AIzaSyDn4Gi8jiywpcHuk0dWnd49cUa_qZao0NE",
  authDomain: "eventplannew.firebaseapp.com",
  projectId: "eventplannew",
  storageBucket: "eventplannew.appspot.com",
  messagingSenderId: "520134677200",
  appId: "1:520134677200:android:5f0fd02ce416db0b5cc4d5"
};

// Initialize Firebase if it hasn't been initialized already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { auth };
