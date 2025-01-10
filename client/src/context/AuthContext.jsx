// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app, { auth } from "../firebase/firebase.config.js"; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if(user){
        const {email, displayName, photoURL} =user;
        const userData = { 
          email, username: displayName, photo: photoURL
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const registerUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signInWithGoogle = async() => {
    return await signInWithPopup(auth, googleProvider)
  }

  //Logout 

  const logout = () =>{

    return signOut(auth)
  }


  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,  
    error,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
