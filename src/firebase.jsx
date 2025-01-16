import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDfyAV3mJYG0BXtUaXT8dLa939lNfQpKLM",
  authDomain: "netflix-clone-cba86.firebaseapp.com",
  projectId: "netflix-clone-cba86",
  storageBucket: "netflix-clone-cba86.firebasestorage.app",
  messagingSenderId: "997760053554",
  appId: "1:997760053554:web:82d196173b3e66a44e272b",
  measurementId: "G-MHND2F1C7M",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return { error: false, data: response };
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    return { error: true, data: error };
  }
};


const logout = async () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };

