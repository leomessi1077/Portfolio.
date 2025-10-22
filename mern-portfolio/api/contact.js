const mongoose = require('mongoose');
const twilio = require('twilio');

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

// Visitor Schema
const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  ipAddress: String,
  userAgent: String
}, { timestamps: true });

const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);

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
    // Try to connect to MongoDB, but don't fail if it doesn't work
    let dbConnected = false;
    try {
      await connectDB();
      dbConnected = true;
    } catch (dbError) {
      console.warn('MongoDB not connected, continuing without database:', dbError.message);
    }

    if (req.method === 'GET') {
      if (!dbConnected) {
        return res.status(503).json({ message: 'Database not connected' });
      }
      const visitors = await Visitor.find().sort({ createdAt: -1 });
      return res.status(200).json(visitors);
    }

    if (req.method === 'POST') {
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
      if (dbConnected) {
        try {
          const visitor = new Visitor({
            name,
            email,
            mobile,
            message: message || '',
            ipAddress: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
            userAgent: req.headers['user-agent']
          });
          await visitor.save();
          console.log('✅ Contact saved to MongoDB');
        } catch (saveError) {
          console.error('Error saving to MongoDB:', saveError.message);
        }
      } else {
        console.log('📝 Contact received (MongoDB not connected):', { name, email, mobile });
      }

      // WhatsApp notification via Twilio (if credentials are provided)
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        try {
          const client = twilio(
            process.env.TWILIO_ACCOUNT_SID, 
            process.env.TWILIO_AUTH_TOKEN
          );
          
          const whatsappMessage = `🚀 *New Portfolio Lead!*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Mobile:* ${mobile}
💬 *Message:* ${message || 'No message provided'}

⏰ *Time:* ${new Date().toLocaleString()}
🌐 *Source:* Portfolio Contact Form

Reply to this message to start a conversation!`;

          await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886',
            to: process.env.TWILIO_WHATSAPP_TO || 'whatsapp:+917571875252',
            body: whatsappMessage
          });

          console.log('WhatsApp message sent successfully');
        } catch (whatsappError) {
          console.error('WhatsApp notification failed:', whatsappError.message);
          // Don't fail the main request if WhatsApp fails
        }
      }

      return res.status(201).json({ 
        message: 'Thank you for your interest! I will get back to you soon.',
        success: true 
      });
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Something went wrong. Please try again later.',
      success: false 
    });
  }
};

