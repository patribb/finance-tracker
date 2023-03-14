import { initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCCkXbGt_b7QIJrYT9ZiLkVOmLLjN_hTJ8',
  authDomain: 'finance-tracker-eba5e.firebaseapp.com',
  projectId: 'finance-tracker-eba5e',
  storageBucket: 'finance-tracker-eba5e.appspot.com',
  messagingSenderId: '536544365152',
  appId: '1:536544365152:web:1d48379f508fd9bfa2d105'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {app, db,auth}