// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyANxTx4REs5uOd6uqtkyBeOGz0HjQSdCPI",
  authDomain: "slack-clone-45584.firebaseapp.com",
  databaseURL: "https://slack-clone-45584.firebaseio.com",
  projectId: "slack-clone-45584",
  storageBucket: "slack-clone-45584.appspot.com",
  messagingSenderId: "973795700236",
  appId: "1:973795700236:web:88e6375c6353b8dba70829",
  measurementId: "G-EJS9QYNTNL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db; 
