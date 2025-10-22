const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const axios = require('axios');
const twilio = require('twilio');

// POST /api/contact - Save visitor contact details
router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    
    // Basic validation
    if (!name || !email || !mobile) {
      return res.status(400).json({ 
        message: 'Name, email, and mobile are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }

    // Save to MongoDB if connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const visitor = new Visitor({
        name,
        email,
        mobile,
        message: message || '',
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
      });
      await visitor.save();
      console.log('✅ Contact saved to MongoDB');
    } else {
      console.log('⚠️  MongoDB not connected - logging contact to console:');
      console.log({ name, email, mobile, message, time: new Date().toLocaleString() });
    }

    // Automatic WhatsApp notification
    const notifications = [];

    // WhatsApp via Twilio (configured with environment variables)
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      
      if (!accountSid || !authToken) {
        console.log('⚠️  Twilio credentials not configured - skipping WhatsApp notification');
        throw new Error('Twilio credentials not configured');
      }
      
      const client = twilio(accountSid, authToken);
      
      const whatsappMessage = `🚀 *New Portfolio Lead!*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Mobile:* ${mobile}
💬 *Message:* ${message || 'No message provided'}

⏰ *Time:* ${new Date().toLocaleString()}
🌐 *Source:* Portfolio Contact Form

Reply to this message to start a conversation!`;

      const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
      const whatsappTo = process.env.TWILIO_WHATSAPP_TO || 'whatsapp:+917571875252';
      
      const twilioResponse = await client.messages.create({
        from: whatsappFrom,
        to: whatsappTo,
        body: whatsappMessage
      });

      console.log('✅ WhatsApp message sent successfully:', twilioResponse.sid);
    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', whatsappError.message);
      // Don't fail the main request if WhatsApp fails
    }

    // Email notification (optional backup)
    if (process.env.NOTIFY_EMAIL === 'true' && process.env.EMAIL_WEBHOOK_URL) {
      notifications.push(
        axios.post(process.env.EMAIL_WEBHOOK_URL, {
          subject: 'New Portfolio Lead',
          to: process.env.EMAIL_TO,
          text: `New lead from contact form\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message || ''}`
        }).catch(() => null)
      );
    }

    if (notifications.length) {
      Promise.allSettled(notifications).catch(() => {});
    }

    res.status(201).json({ 
      message: 'Thank you for your interest! I will get back to you soon.',
      success: true 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Something went wrong. Please try again later.',
      success: false 
    });
  }
});

// GET /api/contact - Get all visitors (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
