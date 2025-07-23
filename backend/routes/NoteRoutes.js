const router = require('express').Router();
let Note = require('../models/NoteModel');

// GET ALL ACTIVE NOTES
router.route('/').get((req, res) => {
  Note.find({ isDeleted: false })
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET DELETED NOTES (RECYCLE BIN)
router.route('/deleted').get((req, res) => {
    Note.find({ isDeleted: true })
      .then(notes => res.json(notes))
      .catch(err => res.status(400).json('Error: ' + err));
});

// ADD NEW NOTE
router.route('/add').post((req, res) => {
  const { title, text } = req.body;
  const newNote = new Note({ title, text });

  newNote.save()
    .then((note) => res.json(note)) // Return the new note
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE NOTE
router.route('/update/:id').post((req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        note.title = req.body.title;
        note.text = req.body.text;
        note.save()
          .then((updatedNote) => res.json(updatedNote)) // Return the updated note
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// MOVE NOTE TO RECYCLE BIN (SOFT DELETE)
router.route('/delete/:id').post((req, res) => {
    Note.findByIdAndUpdate(req.params.id, { isDeleted: true })
      .then(() => res.json('Note moved to recycle bin.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

// RESTORE NOTE FROM RECYCLE BIN
router.route('/restore/:id').post((req, res) => {
    Note.findByIdAndUpdate(req.params.id, { isDeleted: false })
      .then((restoredNote) => res.json(restoredNote))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;