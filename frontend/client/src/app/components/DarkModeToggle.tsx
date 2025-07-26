import React from "react";
// import { Sun, Moon } from "lucide-react";
// import { useDarkMode } from "../hooks/useDarkMode";

const DarkModeToggle: React.FC = () => {
  // const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <button
    // onClick={toggleDarkMode}
    // className="flex ml-auto items-center gap-2 px-4 py-2 rounded-2xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} */}
      {/* <span className="font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span> */}
    </button>
  );
};

export default DarkModeToggle;
