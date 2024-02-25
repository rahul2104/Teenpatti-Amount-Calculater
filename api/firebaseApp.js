import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
// import 'firebase/auth';
import { firebaseConfig } from '../config/firebaseAuthUI.config'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase,ref, set,child, get,onValue,push  } from "firebase/database";

firebase.initializeApp(firebaseConfig);

const database = getDatabase();



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

function createRoom(params){
    return new Promise((resolve, reject) => {
        const roomsListRef = ref(database, 'rooms');
        const newRoomsRef = push(roomsListRef);
        set(newRoomsRef, {
            roomName:params.roomName,
            ownerId:params.ownerId,
            ownerName:params.ownerName,
            member:[{userId:params.ownerId,name:params.ownerName}],
            game:[]
        });
        resolve(newRoomsRef);
    })
}

// function getAllJoinRoom(params){
//     const dbRef = ref(getDatabase());
//     return new Promise((resolve, reject) => {
//     get(child(dbRef, `rooms`)).then((snapshot) => {
//         if (snapshot.exists()) {
//             console.log("###",snapshot.val());
//             resolve(snapshot.val());
//         } else {
//             console.log("No data available");
//             resolve([]);
//         }
//     }).catch((error) => {
//         console.error(error);
//     });
//     });
// }

function getAllJoinRoom(params){
    const dbRef = ref(database, 'rooms');
    return new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
            let list=[];
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                childData.key=childKey;
                list.push(childData)
            });
            resolve(list);
        }, {
            onlyOnce: true
        });
    });
}

function updateRooms(){
    return new Promise((resolve, reject) => {
    set(ref(database, 'rooms/'), {
        roomName:params.roomName,
        ownerId:params.ownerId,
        ownerName:params.ownerName,
        member:[{userId:params.ownerId,name:params.ownerName}]
    });
    });
}



export {
    firebase,
    sessionSignOut,
    manageSession,
    createUserWithEmailPassword,
    signInWithEmailPassword,
    createRoom,
    getAllJoinRoom,
    updateRooms
};