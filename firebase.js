// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeWIKNpHf2KV-Ls_6nAh82zXIp2o3l13M",
  authDomain: "new-ticket-ca2bb.firebaseapp.com",
  projectId: "new-ticket-ca2bb",
  storageBucket: "new-ticket-ca2bb.appspot.com",
  messagingSenderId: "735992373250",
  appId: "1:735992373250:web:13ccedd5a27034eeb6c71b",
  measurementId: "G-K4W45H2E5D",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
let auth;
if (!auth) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Check if analytics is supported and initialize
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized.");
  }
});

export { auth };
export default app;