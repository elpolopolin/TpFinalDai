import { initializeApp  } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { API_KEY} from '@env'

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "dai-test-firebase.firebaseapp.com",
    projectId: "dai-test-firebase",
    storageBucket: "dai-test-firebase.appspot.com",
    messagingSenderId: "92193422387",
    appId: "1:92193422387:web:20b35e8dab950022b43746",
    measurementId: "G-JDYHJW8MM6"
  };
 
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);