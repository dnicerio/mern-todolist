// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const todoRoutes = require('./routes/todoRoutes');

// Express
const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB Atlas
const dbURI = 'mongodb+srv://dnicerio:HOTCAKE123@blog-project.9ey8o.mongodb.net/mern-todolist?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT, console.log(`Connected to MongoDB. Server is listening to port:${PORT}`)))
  .catch((err) => console.log(err));

// Morgan and Express middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Todos REST API Routes
app.use('/api/todos', todoRoutes);
