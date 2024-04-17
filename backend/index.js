// Import required modules
const express = require('express');
const path = require('path');
const routes = require('./routes');
const session = require('express-session')


// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // Set the port for the server

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//setting express session
app.use(session({
  secret: 'aqswdefrgthyjuikhygtfrdeswdefrgthy',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;