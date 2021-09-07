import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database";

let config = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXX-app-db.firebaseapp.com",
  databaseURL: "https://XXXXXXXXXXX-app-db-default-rtdb.firebaseio.com/",
  projectId: "XXXXXXXXXXX-app-db",
  storageBucket: "XXXXXXXXXXX-app-db.appspot.com",
  messagingSenderId: "XXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

const app = firebase.initializeApp(config)

export const auth = app.auth()
export default firebase.database();
