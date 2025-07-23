import React from 'react';
import { FaExpandAlt, FaEdit, FaTrash } from 'react-icons/fa';

// Receive the onEditNote prop
const Note = ({ id, title, text, onDeleteNote, onEditNote }) => {
  return (
    <div className="bg-white dark:bg-[#2d2e30] rounded-lg p-5 flex flex-col justify-between min-h-[180px] shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{text}</p>
      </div>
      <div className="flex items-center justify-start gap-2 mt-4">
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-400 text-white hover:opacity-80 transition-opacity">
          <FaExpandAlt size={14} />
        </button>
        {/* Update the Edit button's onClick handler */}
        <button 
          onClick={() => onEditNote({ id, title, text })}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white hover:opacity-80 transition-opacity">
          <FaEdit size={14} />
        </button>
        <button 
            onClick={() => onDeleteNote(id)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 text-white hover:opacity-80 transition-opacity">
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
};

export default Note;