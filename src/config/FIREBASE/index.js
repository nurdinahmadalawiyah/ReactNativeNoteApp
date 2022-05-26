import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyCklyEaejHy_aguJ63J_13rFEtRAGHULjM",
    authDomain: "crud-react-native-note-app.firebaseapp.com",
    databaseURL: "https://crud-react-native-note-app-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "crud-react-native-note-app",
    storageBucket: "crud-react-native-note-app.appspot.com",
    messagingSenderId: "736225370790",
    appId: "1:736225370790:web:6e082aa96e54ae8a97ca67"
})

const FIREBASE = firebase;

export default FIREBASE;