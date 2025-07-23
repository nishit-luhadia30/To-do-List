import React from 'react';
import { FaStickyNote, FaTrash, FaSun, FaMoon, FaUndo } from 'react-icons/fa';

// --- Receive the new search props ---
const Header = ({ onToggleTheme, theme, onToggleRecycleBin, isRecycleBinOpen, searchText, onSearchChange }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 bg-slate-100 dark:bg-[#202124]">
      <div className="flex items-center gap-3">
        <div className="bg-yellow-400 p-2 rounded-lg">
          <FaStickyNote className="text-white text-2xl" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Notes</h1>
      </div>
      <div className="flex-grow max-w-lg mx-8">
        <input
          type="text"
          placeholder="Search your notes..."
          // --- Bind value and onChange handler ---
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex items-center gap-4">
        {/* ... your other buttons remain the same ... */}
        <button
          onClick={onToggleRecycleBin}
          className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          title={isRecycleBinOpen ? "Back to Notes" : "Recycle Bin"}
        >
          {isRecycleBinOpen ? <FaUndo size={20} /> : <FaTrash size={20} />}
        </button>
        <button
          onClick={onToggleTheme}
          className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;