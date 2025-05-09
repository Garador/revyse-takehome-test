import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Auth.slice";
import { useFirebase } from "../firebase/FirebaseProvider";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface AuthContextType {
  user: object | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const user = useSelector((state: any) => state?.auth?.user);
  const { app } = useFirebase();
  const auth = getAuth(app);
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      window.alert(e.message || e.code || "An error occurred");
    }
  };

  const logout = async () => {
    await auth.signOut();
    dispatch(setUser(null));
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      window.alert(e.message || e.code || "An error occurred");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({ email: firebaseUser.email, uid: firebaseUser.uid }));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
