import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const NoteModal = ({ isOpen, onClose, onSave, noteToEdit }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  // When the modal opens for editing, populate the form with the note's data.
  // When it opens for adding, the form will be cleared.
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setText(noteToEdit.text);
    } else {
      setTitle('');
      setText('');
    }
  }, [noteToEdit, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (title.trim() && text.trim()) { // Only save if there's some content
      onSave({ title, text });
      onClose(); // Close the modal after saving
    } else {
        alert("Please enter a title or text for the note.");
    }
  };
  
  const handleOverlayClick = (e) => {
    // Close the modal only if the overlay itself (not its children) is clicked
    if (e.target.id === 'modal-overlay') {
        onClose();
    }
  }

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 dark:bg-black/85 bg-opacity-100 flex justify-center items-center z-50 transition-opacity"
    >
      <div className="bg-white dark:bg-[#2d2e30] rounded-lg shadow-xl w-full max-w-md p-6 m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {noteToEdit ? 'Edit Note' : 'Add New Note'}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Take a note..."
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          ></textarea>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;