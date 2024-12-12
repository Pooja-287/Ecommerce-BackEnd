const express = require('express');
const morgan = require('morgan');  
const APIRouter = require('./Routes/APIRouter');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { dbAfter, dbBefore } = require('./Routes/debugger');
const app = express();
const PORT = 5000;

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());  // Enable CORS
app.use(morgan('tiny')); // Log requests
app.use(express.json());  // Parse JSON body
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use('/api', APIRouter);  // Use API routes
app.use('/', APIRouter);  // Default route for the application

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Pooja:Pooja287@cluster0.fxzlj.mongodb.net/Project';

// Before starting server, check DB connection
dbBefore("Connecting to DB");

mongoose.connect(MONGODB_URI)
  .then(() => {
    dbAfter('DB Connected Successfully');
    app.listen(PORT, function() {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to the database:', error);
  });
