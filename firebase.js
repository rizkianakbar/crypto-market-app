import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD70ZPVqnTGbF6ti4jjHXrqAd-4FBuHovU",
  authDomain: "whatsapp-clone-fb6b6.firebaseapp.com",
  projectId: "whatsapp-clone-fb6b6",
  storageBucket: "whatsapp-clone-fb6b6.appspot.com",
  messagingSenderId: "355928647473",
  appId: "1:355928647473:web:16295b55109bdc82d47210"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };