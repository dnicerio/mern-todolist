// Imports
// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const todoRoutes = require('./routes/todoRoutes');

// Express
const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB Atlas
const dbURI = process.env.DATABASE_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((result) => app.listen(PORT, console.log(`Connected to MongoDB. Server is listening to port:${PORT}`)))
  .catch((err) => console.log(err));

// Morgan and Express middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Todos REST API Routes
app.use('/api/todos', todoRoutes);

// Heroku Production Client Config
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
