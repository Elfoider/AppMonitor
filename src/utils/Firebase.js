// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyDGUaJew04fQBawsYpjuD3EG00-YrpiuSc',
    authDomain: 'testingapps-2048c.firebaseapp.com',
    databaseURL: 'https://testingapps-2048c-default-rtdb.firebaseio.com',
    projectId: 'testingapps-2048c',
    storageBucket: 'testingapps-2048c.appspot.com',
    messagingSenderId: '743761029704',
    appId: '1:743761029704:web:20b9944d5e2b406d9e467d',
    measurementId: 'G-EJ4KBL20Q9'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
