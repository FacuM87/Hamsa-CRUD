import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth" 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_API_KEY,
  authDomain: process.env.REACT_APP_DB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_DB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DB_MESSAGING_ID,
  appId: process.env.REACT_APP_DB_APP_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);