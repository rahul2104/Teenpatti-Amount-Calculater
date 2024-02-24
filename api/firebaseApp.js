import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
// import 'firebase/auth';
import { firebaseConfig } from '../config/firebaseAuthUI.config'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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


function createUserWithEmailPassword(email, password){
    let auth = getAuth();
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    })
}

function signInWithEmailPassword(email, password){
    let auth = getAuth();
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    })
}


export {
    firebase,
    sessionSignOut,
    manageSession,
    createUserWithEmailPassword,
    signInWithEmailPassword
};