const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// GET /api/portfolio - Get portfolio data
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/portfolio - Create or update portfolio data
router.post('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    if (portfolio) {
      // Update existing portfolio
      portfolio = await Portfolio.findOneAndUpdate({}, req.body, { new: true });
    } else {
      // Create new portfolio
      portfolio = new Portfolio(req.body);
      await portfolio.save();
    }
    
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/portfolio - Update portfolio data
router.put('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
