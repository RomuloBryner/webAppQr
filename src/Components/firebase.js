import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQqdkZhvrTvI3d_5rz7roHgZ99XJGmNfE",
    authDomain: "qrscanrd.firebaseapp.com",
    databaseURL: "https://qrscanrd-default-rtdb.firebaseio.com",
    projectId: "qrscanrd",
    storageBucket: "qrscanrd.appspot.com",
    messagingSenderId: "173728715584",
    appId: "1:173728715584:web:4212f6806900b87c7b60a5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta el módulo de Firestore
export const firestore = getFirestore(app);