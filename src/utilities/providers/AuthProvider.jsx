import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { app } from "../../config/firebase.init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const auth = getAuth(app);

  const signUp = async (email, password) => {
    try {
      setLoader(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setEmail(email);
      return userCredential;
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setLoader(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setEmail(email);
      return userCredential;
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setEmail("");
      setUser(null);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  const updateUser = async (displayName, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photo,
      });
      setUser(auth.currentUser);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      setLoader(true);
      const result = await signInWithPopup(auth, googleProvider);
      setEmail(result.user.email);
      return result;
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setEmail(user.email);
        axios
          .post("http://localhost:5000/api/set-token", {
            email: user.email,
            name: user.displayName,
          })
          .then((data) => {
            if (data.data.token) {
              localStorage.setItem("token", data.data.token);
              setLoader(false);
            }
          });
      } else {
        localStorage.removeItem("token");
        setLoader(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const contextValue = {
    user,
    loader,
    setLoader,
    signUp,
    login,
    logout,
    updateUser,
    error,
    setError,
    googleLogin,
    email,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
