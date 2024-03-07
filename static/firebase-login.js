'use strict';

// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
const auth = getAuth(app);

window.addEventListener("load", function () {
    updateUI(document.cookie);
    console.log("hello world load");

    // Sign up a new user
    document.getElementById("sign-up").addEventListener('click', function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                user.getIdToken().then((token) => {
                    document.cookie = "token=" + token + ";path=/SameSite=Strict";
                    window.location = "/";
                });
            })
            .catch((error) => {
                alert(error.code + error.message);
            });
    });

    // Login a user
    document.getElementById("login").addEventListener('click', function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("logged In");

                user.getIdToken().then((token) => {
                    document.cookie = "token=" + token + ";path=/SameSite=Strict";
                    window.location = "/";
                });
            })
            .catch((error) => {
                alert(error.code + error.message);
            });
    });

    document.getElementById("sign-out").addEventListener('click', function () {
        signOut(auth)
            .then(() => {
                // Remove the ID token for the user and redirect to '/'
                document.cookie = "token=;path=/;SameSite=Strict";
                window.location = "/";
            })
            .catch(error => {
                console.error('Sign-out error:', error);
            });
    });

});


function updateUI(cookie) {
    var token = parseCookieToken(cookie);

    if (token.length > 0) {
        document.getElementById("login-box").hidden = true;
        document.getElementById("sign-out").hidden = false;
    } else {
        document.getElementById("login-box").hidden = false;
        document.getElementById("sign-out").hidden = true;
    }
}

function parseCookieToken(cookie) {
    var split = cookie.split(';');

    for (let i = 0; i < split.length; i++) {
        var temp = split[i].trim().split('=');
        if (temp[0] == "token")
            return temp[1];
    }
    return "";
}
