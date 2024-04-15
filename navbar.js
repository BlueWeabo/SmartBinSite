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

const mapTab = document.getElementById("mapTab");
const editorTab = document.getElementById("editorTab");
const treeTab = document.getElementById("treeTab");
const logoutButton = document.getElementById("logoutButt");


mapTab.addEventListener("click", () => {
    window.location.href = "home.html";
});

editorTab.addEventListener("click", () => {
    window.location.href = "inoEditor.html";
});

treeTab.addEventListener("click", () => {
    window.location.href = "tree.html";
});

logoutButton.addEventListener("click", () => {
    window.location.href = "index.html";
    localStorage.setItem("email", "");
    localStorage.setItem("pass", "");
});

signInWithEmailAndPassword(auth, localStorage.getItem("email"), localStorage.getItem("pass")).then(credentials=> {
    
}).catch(error=>{
    localStorage.setItem("email", "");
    localStorage.setItem("pass", "");
    window.location.href="index.html";
})
