require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const appointmentRoutes = require('./routes/appointment'); 
const feedbackRoutes = require('./routes/feedback'); 
const cors = require('cors');

const app = express();

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Define allowed headers
};

// Apply CORS middleware with the defined options
app.use(cors(corsOptions));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/newtimepass").then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Connection error', err);
  });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/feed', feedbackRoutes);
// app.use('/api/doctors', docRoutes);

// Start the server
const PORT = process.env.PORT || 6005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

