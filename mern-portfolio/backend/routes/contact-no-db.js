const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// POST /api/contact - Save visitor contact details (without MongoDB)
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

    // Log to console instead of database
    console.log('\n📬 New Contact Form Submission:');
    console.log('═══════════════════════════════════════');
    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📱 Mobile: ${mobile}`);
    console.log(`💬 Message: ${message || 'No message'}`);
    console.log(`⏰ Time: ${new Date().toLocaleString()}`);
    console.log('═══════════════════════════════════════\n');

    // WhatsApp via Twilio (configured with environment variables)
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      
      if (accountSid && authToken) {
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
        
        const twilioMessage = await client.messages.create({
          from: whatsappFrom,
          to: whatsappTo,
          body: whatsappMessage
        });

        console.log('✅ WhatsApp message sent successfully:', twilioMessage.sid);
      } else {
        console.log('⚠️  Twilio credentials not configured - skipping WhatsApp notification');
      }
    } catch (whatsappError) {
      console.error('❌ WhatsApp notification failed:', whatsappError.message);
      // Don't fail the main request if WhatsApp fails
    }

    res.status(201).json({ 
      message: 'Thank you for your interest! I will get back to you soon.',
      success: true 
    });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ 
      message: 'Something went wrong. Please try again later.',
      success: false 
    });
  }
});

module.exports = router;

