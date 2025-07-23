const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB database connection established successfully");
}).catch(err => console.log(err));

// --- API Routes will go here ---

const notesRouter = require('./routes/NoteRoutes');
app.use('/api/notes', notesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});