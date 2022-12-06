const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

// ===================================================
// Routers
// ===================================================
// const apiRouter = require('./routes/api');

// ===================================================
// Controllers
// ===================================================
// const userController = require('./controllers/userController');


// ===================================================
// Request Body Parsing
// ===================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===================================================
// Serve Static Files
// ===================================================
app.use(express.static(path.resolve(__dirname, '../client')));

// ===================================================
// Route Handlers
// ===================================================
// app.use('/api', apiRouter);

// ===================================================
// Catch-All 404 Handling
// ===================================================
app.use((req, res) => res.status(404).send('Page Not Found!'));

// ===================================================
// Global Error Handler
// ===================================================

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// ===================================================
// Server Start
// ===================================================
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;