import React, { createContext, useContext, ReactNode } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { FIREBASE_CONFIG } from '~/config/firebase';


const FirebaseContext = createContext<{ app: FirebaseApp }>({
    app: initializeApp(FIREBASE_CONFIG)
});

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
    const app = initializeApp(FIREBASE_CONFIG);

    return (
        <FirebaseContext.Provider value={{ app }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};