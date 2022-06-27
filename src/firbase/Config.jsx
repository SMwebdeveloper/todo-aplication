import firebase from "firebase";
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDZYZAC7RCNu3oAcjpZ-y_5GJhse13EC7o",
  authDomain: "fir-todo-152f6.firebaseapp.com",
  projectId: "fir-todo-152f6",
  storageBucket: "fir-todo-152f6.appspot.com",
  messagingSenderId: "102833950396",
  appId: "1:102833950396:web:dc4ef810178672c89a0ab9"
};
//   init firebase
firebase.initializeApp(firebaseConfig)
// init service

const projectFireStore = firebase.firestore()

export {projectFireStore}