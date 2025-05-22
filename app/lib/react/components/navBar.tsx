import React, { useEffect } from "react";
import Toggle from "./toggle";
import { SignInModal } from "./auth/signInModal";
import { useAuth } from "./auth/authProvider";

const NavBar: React.FC = () => {
  const [signingIn, setSigningIn] = React.useState(false);
  const { user, logout } = useAuth();

  const handleSignIn = () => {
    setSigningIn(true);
  };

  const handleSignOut = async () => {
    await logout();
  };

  const toggleThemeMode = (enabled: boolean) => {
    if (!enabled) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="./crypto" className="text-lg font-bold">
                CryptoApp
              </a>
            </div>
            <div className="hidden md:flex space-x-4">
              <a
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer flex items-center justify-center"
                onClick={user ? handleSignOut : handleSignIn}
              >
                {user ? "Sign Out" : "Sign In"}
              </a>
              <a className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer flex items-center justify-center">
                Dark Mode &nbsp;
                <Toggle onToggle={toggleThemeMode} isDarkMode={true} />
              </a>
            </div>
          </div>
        </div>
      </nav>
      {signingIn && (
        <SignInModal
          onClose={() => setSigningIn(false)}
          onSignIn={() => {
            setSigningIn(false);
          }}
        />
      )}
    </div>
  );
};

export default NavBar;
