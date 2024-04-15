import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, initializeAuth, signInWithEmailAndPassword, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyAPDYXHTFJzMkvzLAYGrPy368BthLpovtM",
    authDomain: "smartbin-d94f7.firebaseapp.com",
    databaseURL: "https://smartbin-d94f7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "smartbin-d94f7",
    storageBucket: "smartbin-d94f7.appspot.com",
    messagingSenderId: "518082529527",
    appId: "1:518082529527:web:fd3cef87782f5126a16bf2"
  };

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("email", username);
            localStorage.setItem("pass", password);
            window.location.href = "home.html";
        })
        .catch((error) => {
            document.getElementById("error-message").textContent = error.message;
        });
});
