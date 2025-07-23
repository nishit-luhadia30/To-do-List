import React from 'react';
import { FaUndo } from 'react-icons/fa';

const RecycleBin = ({ deletedNotes, onRestore }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Recycle Bin</h2>
      {deletedNotes.length > 0 ? (
        <div className="space-y-4">
          {deletedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-[#2d2e30] rounded-lg p-4 flex items-center justify-between shadow-sm"
            >
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100">{note.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{note.text}</p>
              </div>
              <button
                onClick={() => onRestore(note.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaUndo />
                <span>Restore</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">The recycle bin is empty.</p>
      )}
    </div>
  );
};

export default RecycleBin;