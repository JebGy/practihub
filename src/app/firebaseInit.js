// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

export async function createUser(uname, pass) {
  const uid = uuidv4();
  setDoc(doc(getFirestore(app), "Users", uname), {
    uid: uid,
    role: "user",
    uname: uname,
    pass: pass,
  });
}

//create a loginfunction:
export async function loginUser(uname, pass, router) {
  //logInUser
  const docRef = doc(getFirestore(app), "Users", uname);
  await getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      console.log(docSnap.data().pass === pass);
      if (docSnap.data().pass === pass) {
        sessionStorage.setItem("ph_um", JSON.stringify(docSnap.data()));
        router.push("/practihubapp", { scroll: false });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
}

//delete user
export async function deleteUser(uname) {
  const docRef = doc(getFirestore(app), "Users", uname);
  await deleteDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  });
}

export async function getAllUsers() {
  const collectionRef = collection(getFirestore(app), "Users");
  const snapshot = await getDocs(collectionRef);
  const users = [];
  snapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
}

//update role value
export async function updateRole(uname, role) {
  const docRef = doc(getFirestore(app), "Users", uname);
  await updateDoc(docRef, {
    role: role,
  });
}
