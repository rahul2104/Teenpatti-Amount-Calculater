import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
// import 'firebase/auth';
import { firebaseConfig } from '../config/firebaseAuthUI.config'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

firebase.initializeApp(firebaseConfig);

function manageSession(){
    let auth = getAuth();
    return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((authenticate)=>{
        // console.log("authenticate",authenticate);
        if (authenticate&&authenticate!==null) {
            resolve(authenticate);
        } else {
            resolve(false);
        }
    })
    })
}

function sessionSignOut(){
    const auth = getAuth();
    try {
        return auth.signOut();
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}


export {
    firebase,
    sessionSignOut,
    manageSession,
};