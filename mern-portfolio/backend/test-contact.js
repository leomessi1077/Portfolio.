const axios = require('axios');

async function testContactAPI() {
  try {
    console.log('Testing Contact API endpoint...\n');
    
    // Test contact form submission
    console.log('1. Testing contact form submission...');
    const contactData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+1234567890',
      message: 'Hello! I would like to discuss a project with you.'
    };
    
    const contactResponse = await axios.post('http://localhost:5000/api/contact', contactData);
    console.log('Contact Response:', contactResponse.data);
    console.log('✅ Contact form submission working\n');
    
    // Test getting all visitors
    console.log('2. Testing get all visitors...');
    const visitorsResponse = await axios.get('http://localhost:5000/api/contact');
    console.log('Visitors Count:', visitorsResponse.data.length);
    console.log('✅ Get visitors endpoint working\n');
    
    console.log('🎉 All Contact API endpoints are working correctly!');
    
  } catch (error) {
    console.error('❌ Contact API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Wait a moment for server to start, then test
setTimeout(testContactAPI, 2000);

