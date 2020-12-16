import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

const config_prod = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const config_dev = {
  apiKey: process.env.REACT_APP_DEV_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_DEV_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_DEV_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_DEV_FIREBASE_MEASUREMENT_ID,
};

const config =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? config_dev
    : config_prod;
firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const store = firebase.firestore();
