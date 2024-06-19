import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZIkjtnFSVZvEt0DqycHXxOp570KTdqS4",
  authDomain: "todolist-88028.firebaseapp.com",
  projectId: "todolist-88028",
  storageBucket: "todolist-88028.appspot.com",
  messagingSenderId: "974140905921",
  appId: "1:974140905921:web:acf9082c56208cdd027740",
  measurementId: "G-ZM4FNC6F46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;


