'use strict'

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcqYqFxGiiBox1cVjCvSE3AJfTn-7bNzo",
    authDomain: "cloudlabs-a5f41.firebaseapp.com",
    projectId: "cloudlabs-a5f41",
    storageBucket: "cloudlabs-a5f41.appspot.com",
    messagingSenderId: "248085643092",
    appId: "1:248085643092:web:05dc18ab2a754d826a92c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

window.addEventListener("load", function () {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    updateUI(document.cookie);
    console.log("hello world load");

    //Sign up a new user to firebase 
    this.document.getElementById("sign-up").addEventListener('click', function () {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                user.getIdToken().then((token) => {
                    document.cookie = "token" + token + ";path=/SameSite=Strict"
                    window.location = "/";
                });
            })
            .catch((error) => {
                alert(error.code + error.message);

            })

    });
})