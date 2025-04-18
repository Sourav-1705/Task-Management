import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBm3-6_pv-YYfhlH_vsuhhIT86nDBY7iKY",
  authDomain: "ampl-task-manager.firebaseapp.com",
  databaseURL: "https://ampl-task-manager-default-rtdb.firebaseio.com",
  projectId: "ampl-task-manager",
  storageBucket: "ampl-task-manager.appspot.com",
  messagingSenderId: "386712165446",
  appId: "1:386712165446:web:85e734538594491f33be47",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);