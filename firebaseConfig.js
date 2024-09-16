import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "coastbird-4f69b.firebaseapp.com",
    projectId: "coastbird-4f69b",
    storageBucket: "coastbird-4f69b.appspot.com",
    messagingSenderId: "280785638565",
    appId: "1:280785638565:web:51c7f5f4807748fc1d694c",
    measurementId: "G-DWKGF04978"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
