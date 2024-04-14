// Import required modules
const express = require('express');
const path = require('path');
const routes = require('./routes');



// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // Set the port for the server

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
