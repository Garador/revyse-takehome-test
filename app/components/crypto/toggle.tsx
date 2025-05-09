import React, { useEffect, useState } from "react";

interface ToggleProps {
  onToggle: (enabled: boolean) => void;
  isDarkMode?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ onToggle, isDarkMode }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
        setEnabled(true);
      } else {
        document.documentElement.classList.remove("dark");
        setEnabled(false);
      }
    }
  }, []);

  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-green-500" : "bg-gray-300"
      }`}
      onClick={() => {
        setEnabled(!enabled);
        onToggle(!enabled);
      }}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default Toggle;
