import React from 'react';
import Note from './Note';

// Pass the onEditNote prop through
const NotesList = ({ notes, onDeleteNote, onEditNote }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          text={note.text}
          onDeleteNote={onDeleteNote}
          onEditNote={onEditNote} // Pass it down to the Note component
        />
      ))}
    </div>
  );
};

export default NotesList;