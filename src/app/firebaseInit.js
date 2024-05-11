// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCymO2MA0np550rGEtLnZtauP3sn96YkmU",
  authDomain: "practihub-2428c.firebaseapp.com",
  projectId: "practihub-2428c",
  storageBucket: "practihub-2428c.appspot.com",
  messagingSenderId: "312406835627",
  appId: "1:312406835627:web:878c5937e9abbc27f012ee",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export function listFilesFromStudent(storageRef1) {
  try {
    const storageRef = ref(storage, storageRef1);
    const url = getDownloadURL(storageRef);
    const baseUrl = url.then((url) => url);
    return baseUrl;
  } catch (error) {
    console.log(error);
  }
}

export function uploadFileFromStudent(file, route) {
  const storageRef = ref(storage, route);
  uploadBytes(storageRef, file).then((snap) => {
    console.log(snap);
  });
}
