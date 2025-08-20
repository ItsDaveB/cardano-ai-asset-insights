"use client";

import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";
import { Globe } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full shadow-md bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-md font-bold text-gray-900 dark:text-white">
          Cardano Native Asset AI Analysis
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="https://global.cardano-visualisation.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Globe className="h-5 w-5" />
            <span>Cardano Globe</span>
          </Link>

          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};
