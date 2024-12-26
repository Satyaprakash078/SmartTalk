// server.js

const express = require('express');
const path = require('path'); 
const cors = require('cors'); // If you need to handle CORS
const dotenv = require('dotenv'); // For loading environment variables
const openaiRouter = require('./openai'); // The file where your OpenAI route is

dotenv.config(); // Load environment variables from .env

const app = express();
const corsOptions = {
    origin: 'https://smart-talk-one.vercel.app', // Replace with your frontend URL in production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
// Middleware to parse JSON request bodies
app.use(express.json());

// CORS setup (optional, if frontend and backend are on different ports)


// Use the OpenAI route
app.use('/api/openai', openaiRouter); // Endpoint where the OpenAI API interaction is handled

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



// Start the server
const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
