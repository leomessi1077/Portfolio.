const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  name: String,
  title: String,
  about: String,
  skills: [String],
  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    github: String,
    live: String
  }],
  contact: {
    email: String,
    phone: String,
    linkedin: String,
    github: String
  }
}, { timestamps: true });

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      const portfolio = await Portfolio.findOne();
      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      return res.status(200).json(portfolio);
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      let portfolio = await Portfolio.findOne();
      
      if (portfolio) {
        portfolio = await Portfolio.findOneAndUpdate({}, req.body, { new: true });
      } else {
        portfolio = new Portfolio(req.body);
        await portfolio.save();
      }
      
      return res.status(200).json(portfolio);
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Portfolio API error:', error);
    res.status(500).json({ message: error.message });
  }
};

