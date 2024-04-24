// Import required modules
const express = require('express');
const path = require('path');
const routes = require('./routes');
const session = require('express-session')
const cors = require('cors');



// Initialize Express app
const app = express();
const port = process.env.PORT || 4000; // Set the port for the server

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());

//setting express session
app.use(session({
  secret: 'aqswdefrgthyjuikhygtfrdeswdefrgthy',
  resave: false,
  saveUninitialized: true,
  
}));

app.use('/', routes);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = {app,server};