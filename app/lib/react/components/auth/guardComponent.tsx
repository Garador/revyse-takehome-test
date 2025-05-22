import { useAuth } from "./authProvider";
import React from "react";
import { SignInModal } from "./signInModal";
import { SignUpModal } from "./signUpModal";

export function WithAuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [signingIn, setSigningIn] = React.useState(false);
  const [signingUp, setSigningUp] = React.useState(false);

  if (!user) {
    return (
      <div>
        <div>{children}</div>
        <div className="flex justify-center items-center flex-col h-screen text-white text-lg backdrop-blur-md bg-black/50 absolute top-0 w-full">
          <p>You must be logged in to view this content.</p>
          <button
            onClick={() => setSigningIn(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mt-5 ml-2"
          >
            Sign In
          </button>
          <button
            onClick={() => setSigningUp(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mt-5 ml-2"
          >
            Sign Up
          </button>
          {signingIn && (
            <SignInModal
              onClose={() => setSigningIn(false)}
              onSignIn={() => {
                setSigningIn(false);
              }}
            />
          )}
          {signingUp && (
            <SignUpModal
              onClose={() => setSigningUp(false)}
              onSignUp={() => {
                setSigningUp(false);
              }}
            />
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
