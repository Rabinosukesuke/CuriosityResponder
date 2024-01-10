import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
} from "@env"


const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

const platformOs = Platform.OS;
console.log("platformOs: ", platformOs);

let persistence = undefined;

if (platformOs === "android" || platformOs === "ios") {
    persistence = getReactNativePersistence(AsyncStorage);
    console.log("mobile platform");
}
else if (platformOs === "web") {
    console.log("web platform");
}
else {
    console.log("unknown platform");
}

export const auth = initializeAuth(app, {
    persistence: persistence
});
