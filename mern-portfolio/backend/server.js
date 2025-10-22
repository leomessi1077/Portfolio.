const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection (optional - server will run without it)
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch((error) => {
  console.warn('⚠️  MongoDB connection failed - server will run without database');
  console.warn('   Contact form will work but data won\'t be saved');
  console.warn('   Error:', error.message);
});

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const portfolioRoutes = require('./routes/portfolio');
const contactRoutes = require('./routes/contact');

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Use portfolio routes
app.use('/api/portfolio', portfolioRoutes);

// Use contact routes
app.use('/api/contact', contactRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all handler for React app (only for non-API routes)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI ? 'Configured' : 'Not configured'}`);
});
