import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import 'firebase/auth';
import { firebaseConfig } from '../config/firebaseAuthUI.config'

//if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
//}
console.log("firebase",firebase);
// export const auth =  initializeApp(firebaseConfig);
export {firebase};