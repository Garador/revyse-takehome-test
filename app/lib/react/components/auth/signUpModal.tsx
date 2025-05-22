import React, { useState } from "react";
import { useAuth } from "./authProvider";

interface PopUpProps {
  onClose: () => void;
  onSignUp: () => void;
}

export const SignUpModal: React.FC<PopUpProps> = ({ onClose, onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    await signUp(email, password);
    onSignUp();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-black bg-opacity-90 bg-gray-600 dark:bg-gray-600 rounded-lg">
        <div className="p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="text-gray-400 hover:text-gray-500 underline transition duration-200"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
