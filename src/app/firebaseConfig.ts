/** @format */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyArKcx_rYvpqRVfIUnljePyZVx-kF_n3sE',
    authDomain: 'konstantinbylbas-fb.firebaseapp.com',
    projectId: 'konstantinbylbas-fb',
    storageBucket: 'konstantinbylbas-fb.appspot.com',
    messagingSenderId: '986214931180',
    appId: '1:986214931180:web:7e7dbf5086846796c2a3c9',
    measurementId: 'G-ELV1ZZ93CG',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
