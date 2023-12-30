import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmESY2JGFY7-iPpG53LMm5Xco9Jtgb_6I",
  authDomain: "doctor-appointment-2335f.firebaseapp.com",
  projectId: "doctor-appointment-2335f",
  storageBucket: "doctor-appointment-2335f.appspot.com",
  messagingSenderId: "438082607606",
  appId: "1:438082607606:web:a51e6bd164cbf4b0f38fd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app