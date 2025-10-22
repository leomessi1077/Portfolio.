/**
 * Test Twilio WhatsApp Integration
 * Run this script to verify your Twilio setup works
 * 
 * Usage: node test-twilio.js
 */

const twilio = require('twilio');
require('dotenv').config();

// Your Twilio credentials - loaded from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  console.error('❌ ERROR: Twilio credentials not found!');
  console.log('Please set the following environment variables:');
  console.log('  TWILIO_ACCOUNT_SID=your_account_sid');
  console.log('  TWILIO_AUTH_TOKEN=your_auth_token');
  console.log('  TWILIO_WHATSAPP_FROM=whatsapp:+14155238886');
  console.log('  TWILIO_WHATSAPP_TO=whatsapp:+your_number');
  process.exit(1);
}

const client = twilio(accountSid, authToken);

// WhatsApp numbers - loaded from environment variables
const from = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
const to = process.env.TWILIO_WHATSAPP_TO;

// Test message
const testMessage = `🧪 *Test Message from Portfolio*

This is a test to verify your Twilio WhatsApp integration is working!

✅ If you received this, your setup is correct!

⏰ Sent at: ${new Date().toLocaleString()}

---
Next steps:
1. Deploy to Vercel
2. Add environment variables
3. Test with contact form`;

console.log('🚀 Sending test WhatsApp message...');
console.log(`📱 From: ${from}`);
console.log(`📱 To: ${to}`);
console.log('---');

client.messages
  .create({
    from: from,
    to: to,
    body: testMessage
  })
  .then(message => {
    console.log('✅ SUCCESS! Message sent!');
    console.log(`📬 Message SID: ${message.sid}`);
    console.log(`📊 Status: ${message.status}`);
    console.log('---');
    console.log('🎉 Check your WhatsApp at +917571875252');
    console.log('');
    console.log('Next: Add these to Vercel environment variables:');
    console.log('  TWILIO_ACCOUNT_SID=' + accountSid);
    console.log('  TWILIO_AUTH_TOKEN=' + authToken);
    console.log('  TWILIO_WHATSAPP_FROM=' + from);
    console.log('  TWILIO_WHATSAPP_TO=' + to);
  })
  .catch(error => {
    console.error('❌ ERROR sending message:');
    console.error(error.message);
    console.log('');
    console.log('Common issues:');
    console.log('1. Did you join the Twilio Sandbox?');
    console.log('   → Send "join [code]" to +14155238886 on WhatsApp');
    console.log('2. Are your credentials correct?');
    console.log('3. Is your phone number correct? (+917571875252)');
    console.log('');
    console.log('For more help, see: TWILIO_SETUP.md');
  });

