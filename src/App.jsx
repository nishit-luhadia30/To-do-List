import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import Header from './Components/Header';
import NotesList from './Components/NotesList';
import RecycleBin from './Components/RecycleBin';
import NoteModal from './Components/NoteModal';


// Set a base URL for all our API requests
const API_URL = 'http://localhost:5001/api/notes';

function App() {
  const [notes, setNotes] = useState([
    
  ]);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  const [isRecycleBinOpen, setRecycleBinOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  // --- FETCH DATA FROM BACKEND ON INITIAL LOAD ---
  useEffect(() => {
    // Fetch active notes
    axios.get(`${API_URL}/`)
      .then(response => {
        // Mongo stores id as _id, let's map it to 'id' for frontend consistency
        const formattedNotes = response.data.map(note => ({...note, id: note._id}));
        setNotes(formattedNotes);
      })
      .catch(error => console.log(error));
      
    // Fetch deleted notes
    axios.get(`${API_URL}/deleted`)
      .then(response => {
        const formattedNotes = response.data.map(note => ({...note, id: note._id}));
        setDeletedNotes(formattedNotes);
      })
      .catch(error => console.log(error));
      
  }, []); // Empty array ensures this runs only once on mount

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  
  // --- API-DRIVEN FUNCTIONS ---
  const addNote = async (title, text) => {
    try {
      const response = await axios.post(`${API_URL}/add`, { title, text });
      const newNote = {...response.data, id: response.data._id};
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const editNote = async (updatedNote) => {
    try {
      const response = await axios.post(`${API_URL}/update/${updatedNote.id}`, { 
        title: updatedNote.title, 
        text: updatedNote.text 
      });
      const newFormattedNote = {...response.data, id: response.data._id};
      const newNotes = notes.map(note =>
        note.id === newFormattedNote.id ? newFormattedNote : note
      );
      setNotes(newNotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  
  const deleteNote = async (id) => {
    try {
      await axios.post(`${API_URL}/delete/${id}`);
      const noteToMove = notes.find(note => note.id === id);
      setNotes(notes.filter(note => note.id !== id));
      setDeletedNotes([...deletedNotes, noteToMove]);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  
  const restoreNote = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/restore/${id}`);
      const restoredNote = {...deletedNotes.find(note => note.id === id), isDeleted: false};
      setDeletedNotes(deletedNotes.filter(note => note.id !== id));
      setNotes([...notes, restoredNote]);
    } catch (error) {
        console.error("Error restoring note:", error);
    }
  };

  const handleSaveNote = ({ title, text }) => {
    if (currentNote) {
      editNote({ ...currentNote, title, text });
    } else {
      addNote(title, text);
    }
  };

  // Other handlers remain mostly the same
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const handleOpenModal = (note = null) => { setCurrentNote(note); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setCurrentNote(null); };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchText.toLowerCase()) || 
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header
        onToggleTheme={toggleTheme}
        theme={theme}
        onToggleRecycleBin={() => setRecycleBinOpen(!isRecycleBinOpen)}
        isRecycleBinOpen={isRecycleBinOpen}
        searchText={searchText}
        onSearchChange={setSearchText}
      />
      <main className="p-4 md:p-8">
        {isRecycleBinOpen ? (
          <RecycleBin deletedNotes={deletedNotes} onRestore={restoreNote} />
        ) : (
          <NotesList
            notes={filteredNotes}
            onDeleteNote={deleteNote}
            onEditNote={handleOpenModal}
          />
        )}
      </main>
      
      {!isRecycleBinOpen && (
        <button
          onClick={() => handleOpenModal()}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg hover:opacity-90 transition-opacity"
        >
          +
        </button>
      )}
      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNote}
        noteToEdit={currentNote}
      />
    </div>
  );
}

export default App;