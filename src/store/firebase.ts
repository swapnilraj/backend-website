import React from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import { IPublishState } from "./publish";

import { useObject } from "react-firebase-hooks/database";

interface Entities {
  messages: Array<IPublishState>;
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
  appId: process.env.REACT_APP_APP_ID
};
// Initialize Firebase
export const initializeFirebase = () => firebase.initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext<firebase.app.App>(
  initializeFirebase()
);

const useDatabase = () => {
  const fb = React.useContext(FirebaseContext);
  if (!fb) throw Error(`Firebase hasn't been initialized`);
  return fb.database();
};

export const useAuth = () => {
  const fb = React.useContext(FirebaseContext);
  if (!fb) throw Error(`Firebase hasn't been initialized`);
  return fb.auth();
};
export const useDBRef = (ref: keyof Entities) => {
  const db = useDatabase();
  return useObject(db.ref(ref));
};
