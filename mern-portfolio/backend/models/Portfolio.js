const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  about: {
    type: String,
    required: true
  },
  experience: [{
    position: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    description: [{
      type: String
    }]
  }],
  projects: [{
    title: {
      type: String,
      required: true
    },
    tech: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    github: {
      type: String,
      required: true
    },
    live: {
      type: String,
      required: true
    }
  }],
  socialLinks: {
    linkedin: {
      type: String,
      default: ''
    },
    github: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
